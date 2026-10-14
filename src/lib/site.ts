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
  { label: '留言', href: '/chat' },
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
 * 留言墙配置。
 * 三项都填好才会真正开启；否则页面显示中文接入指引。
 */
export const CHAT = {
  title: chatData.title ?? '留言墙',
  subtitle: chatData.subtitle ?? '',
  url: (chatData.supabaseUrl ?? '').replace(/\/+$/, ''),
  anonKey: chatData.supabaseAnonKey ?? '',
  bucket: chatData.bucket || 'chat-files',
  table: chatData.table || 'messages',
  maxFileMB: Number(chatData.maxFileMB) || 50,
  maxMessages: Number(chatData.maxMessages) || 100,
  get enabled(): boolean {
    return Boolean(
      chatData.enabled && this.url.startsWith('https://') && this.anonKey.length > 20,
    );
  },
};
