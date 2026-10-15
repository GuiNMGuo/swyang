/**
 * 站点全局配置
 *
 * 文字与作品数据已抽到 src/content/*.json，
 * 通过 /admin 在线后台就能直接改，无需动代码，也不需要本地环境。
 * 想手改也行，改那几个 JSON 文件即可。
 */

import siteData from '../content/site.json';
import worksData from '../content/works.json';
import toolsData from '../content/tools.json';
import chatData from '../content/chat.json';
import homeData from '../content/home.json';

export const SITE = {
  title: siteData.title,
  /** 浏览器标题后缀 & 页脚副标题 */
  tagline: siteData.tagline,
  description: siteData.description,
  /** 首屏大标题，每个元素渲染成一行 */
  heroLines: [siteData.heroLine1, siteData.heroLine2],
  /** 首屏副标题 */
  heroDesc: siteData.heroDesc,
  url: 'https://www.yswqjymdx.com',
  author: siteData.author,
  lang: 'zh-CN',
};

export const NAV = [
  { label: '作品', href: '/work' },
  { label: '工具', href: '/tools' },
  { label: '聊天室', href: '/chat' },
  { label: '关于', href: '/about' },
];

export const SOCIAL = {
  github: siteData.github,
  email: siteData.email,
};

/** 作品集 —— cover 留空则回退到内置 SVG 插画 */
export const WORKS = worksData.items.map((w) => ({
  title: w.title,
  desc: w.desc,
  tags: w.tags
    .split(',')
    .map((t) => t.trim())
    .filter(Boolean),
  cover: w.cover ?? '',
  href: w.href ?? '',
  year: w.year ?? '',
}));

/** 工具 —— 可在线直接使用的 */
export const TOOLS = toolsData.items.map((t, i) => ({
  slug: `tool-${i + 1}`,
  name: t.name,
  desc: t.desc,
  status: t.status as 'ready' | 'wip' | 'plan',
  icon: t.icon ?? '',
  href: t.href ?? '',
}));

export const STATUS_LABEL = {
  ready: '可用',
  wip: '开发中',
  plan: '规划中',
};

/**
 * 首页内容
 * 全部来自 src/content/home.json —— 后台「首页」标签页可以直接改，
 * 加删条目、改文案都不用碰代码。
 */
export interface HomeStat {
  num: string;
  unit: string;
  label: string;
}
export interface HomeItem {
  title: string;
  desc: string;
  tag?: string;
}
export interface HomeGroup {
  name: string;
  items: string[];
}
export interface HomeTimelineItem {
  year: string;
  title: string;
  desc: string;
}

type Section<T> = { kicker: string; title: string; desc?: string } & T;

export const HOME = {
  stats: (homeData.stats ?? []) as HomeStat[],
  now: homeData.now as Section<{ items: HomeItem[] }>,
  principles: homeData.principles as Section<{ items: HomeItem[] }>,
  skills: homeData.skills as Section<{ groups: HomeGroup[] }>,
  timeline: homeData.timeline as Section<{ items: HomeTimelineItem[] }>,
  cta: homeData.cta as { title: string; desc: string; note: string },
};

/**
 * 聊天室配置
 *
 * 安全模型（重要）：
 * 部署仓库是公开的，所以密码明文**绝不写入仓库**，也不下发到页面。
 * 每个房间存两样东西：
 *   salt  —— 建房间时随机生成
 *   check —— PBKDF2(密码, salt + '|check', 100000 次迭代)
 * 前端把用户输入的密码按同样算法算一遍，与 check 比对，对得上才放行。
 * 真正收发消息的频道名走另一路派生（salt + '|chan'），只在浏览器内存里算出来，
 * 不落盘、不下发。所以光看仓库里的东西推不出频道，也就进不了房间。
 * 想换密码：重新生成一组 salt/check 即可（后台「聊天室」页有按钮，或跑 scripts/mk_room.js）。
 */
export interface ChatRoom {
  id: string;
  name: string;
  desc?: string;
  /** 建房间时随机生成的一串，公开无妨 */
  salt: string;
  /** 密码校验哈希，只用于比对，不能反推出密码 */
  check: string;
}

/** 前端拿到的房间信息 */
export interface PublicRoom {
  id: string;
  name: string;
  desc: string;
  /** 派生用的盐 */
  salt: string;
  /** 校验哈希 */
  check: string;
}

const rawRooms = (chatData.rooms ?? []) as ChatRoom[];

export const CHAT = {
  title: chatData.title ?? '私密聊天室',
  subtitle: chatData.subtitle ?? '',
  broker: chatData.broker || 'wss://broker.emqx.io:8084/mqtt',
  maxFileMB: Number(chatData.maxFileMB) || 20,
  /**
   * 文件上传端点。指向 Cloudflare Worker（或同类代理），
   * 真正的存储密钥放在 Worker 的环境变量里 —— 仓库是公开的，密钥绝不能进前端。
   * 留空则关闭文件传输，界面会提示先配置。
   */
  uploadUrl: (chatData as any).uploadUrl || '',
  keepMessages: Number(chatData.keepMessages) || 200,
  rooms: rawRooms,
  get publicRooms(): PublicRoom[] {
    return rawRooms
      .filter((r) => r && r.id && r.salt && r.check)
      .map((r) => ({
        id: r.id,
        name: r.name,
        desc: r.desc ?? '',
        salt: r.salt,
        check: r.check,
      }));
  },
  get enabled(): boolean {
    return rawRooms.length > 0;
  },
};
