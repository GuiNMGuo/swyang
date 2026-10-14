/*
 * 旧站 Service Worker 清理器（自我销毁型）
 * ============================================
 *
 * 背景：2021 年旧站用的是 Jekyll + Chirpy 主题，它自带一个 PWA 离线缓存，
 * 注册在 /sw.js，策略是「缓存优先」——只要缓存里有就直接返回，永远不联网。
 * 站点在 2026 年换成 Astro 之后，这个旧 SW 还留在访客浏览器里，
 * 导致访客看到的一直是 2021 年的旧页面，强刷（Ctrl+Shift+R）也无效，
 * 因为 SW 在浏览器 HTTP 缓存之前就拦截了请求。
 *
 * 为什么这个文件能清掉它：
 * 浏览器每次页面导航都会去检查 /sw.js 有没有更新，**这个检查不经过 SW 的
 * fetch 处理器**（HTML 规范定义的行为）。所以即使旧 SW 在拦截页面请求，
 * 新版本的这个文件仍然会被下载、安装、激活。
 *
 * 激活后做的事：
 *   1. 删掉所有 Cache Storage（清掉 2021 年的旧页面缓存）
 *   2. 注销自己（以后不再有这个 SW）
 *   3. 让所有打开的页面重新加载（访客立刻看到新站）
 *
 * 这是一个一次性的清理文件，清理完成后站点不再注册任何 Service Worker。
 */

self.addEventListener('install', function () {
  // 不等旧的 SW 释放控制权，立刻进入激活阶段
  self.skipWaiting();
});

self.addEventListener('activate', function (event) {
  event.waitUntil(
    (function () {
      // 1. 清空所有缓存
      return caches
        .keys()
        .then(function (keys) {
          return Promise.all(
            keys.map(function (k) {
              return caches.delete(k);
            })
          );
        })
        .then(function () {
          // 2. 注销自己
          return self.registration.unregister();
        })
        .then(function () {
          // 3. 让所有受控页面重新加载，访客立刻看到新站
          return self.clients.matchAll({ type: 'window' });
        })
        .then(function (clients) {
          clients.forEach(function (client) {
            // 用 navigate 而不是 reload，确保拿到服务器最新的 HTML
            if (client.navigate) {
              client.navigate(client.url);
            } else {
              client.postMessage({ type: 'SW_CLEANED' });
            }
          });
        })
        .catch(function () {
          /* 静默失败：清理不是关键路径，不打扰访客 */
        });
    })()
  );
});

/*
 * 故意不实现 fetch 处理器。
 * 没有 fetch 监听 = 不拦截任何请求 = 所有资源都走正常的网络流程。
 */
