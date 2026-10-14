/**
 * 站点全局配置 —— 只改这一个文件即可完成大部分定制
 */

export const SITE = {
  title: '追风',
  /** 浏览器标题后缀 & 页脚副标题 */
  tagline: 'Designer & Developer',
  description: '我做界面设计与前端开发，也做一些顺手能用的小工具。',
  /** 首屏大标题，每个元素渲染成一行 */
  heroLines: ['Hi. I\u2019m 追风.', 'Designer & Developer.'],
  /** 首屏副标题 */
  heroDesc: '我做界面设计和前端开发，也做一些顺手能用的小工具。',
  url: 'https://www.yswqjymdx.com',
  author: '追风',
  lang: 'zh-CN',
};

export const NAV = [
  { label: '作品', href: '/work' },
  { label: '工具', href: '/tools' },
  { label: '关于', href: '/about' },
];

export const SOCIAL = {
  github: 'https://github.com/GuiNMGuo',
  email: '415287957@qq.com',
};

/** 作品集 —— cover 留空则显示插画占位 */
export const WORKS = [
  {
    title: '多角度产品图生成',
    desc: '上传一张产品原图，自动生成白底多视图电商展示图，用于商品上架与详情页配图。',
    tags: ['图像处理', '电商'],
    cover: '',
    href: '',
    year: '2026',
  },
  {
    title: '视频水印去除',
    desc: '在画面上框选水印或硬字幕区域，本地一键去除。不依赖 AI 模型，不上传文件，秒级完成。',
    tags: ['视频', 'FFmpeg'],
    cover: '',
    href: '',
    year: '2026',
  },
  {
    title: '自动粗剪',
    desc: '给一段素材和口播文字稿，自动完成配音、拼接、裁切、字幕烧录和背景音乐混音。',
    tags: ['视频', '自动化'],
    cover: '',
    href: '',
    year: '2026',
  },
  {
    title: '看图复刻任务队列',
    desc: '把短参考视频拆成 9 帧分镜，批量替换产品与场景，重新生成同结构的视频。',
    tags: ['AI', '批量处理'],
    cover: '',
    href: '',
    year: '2026',
  },
  {
    title: '选品调研工具',
    desc: '抓取目标市场的电商平台公开数据，对比货源成本，输出选品分析报告。',
    tags: ['数据', '调研'],
    cover: '',
    href: '',
    year: '2026',
  },
  {
    title: '视频转深度图',
    desc: '把普通视频转为深度视频（白模），用于空间参考和二次创作。本地推理，免费满帧率。',
    tags: ['AI', '视频'],
    cover: '',
    href: '',
    year: '2026',
  },
];

/** 工具 —— 可在线直接使用的 */
export const TOOLS = [
  {
    slug: 'text-lab',
    name: '文本处理台',
    desc: '文本清洗、格式化、批量替换，纯浏览器本地运算，不联网也能用。',
    status: 'wip',
    href: '',
  },
  {
    slug: 'image-batch',
    name: '图片批处理',
    desc: '批量压缩、改尺寸、转格式，图片不离开你的电脑。',
    status: 'plan',
    href: '',
  },
  {
    slug: 'data-lookup',
    name: '数据速查',
    desc: '常用对照表、单位换算、计算器，即开即用。',
    status: 'plan',
    href: '',
  },
];

export const STATUS_LABEL = {
  ready: '可用',
  wip: '开发中',
  plan: '规划中',
};
