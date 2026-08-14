export interface ExternalTool {
  id: string;
  name: string;
  url: string;
  desc?: string;
  icon?: string;
}

/**
 * 第三方工具（代码内置）。
 *
 * 站点部署在 GitHub Pages、没有后端数据库，运行时新增的链接无法跨设备/跨用户共享，
 * 因此不提供页面内手动添加功能。需要常驻的第三方工具时，直接在这个数组里增加一项：
 *   { id, name, url, desc?, icon? }
 * - icon 可用 emoji（如 '🔗'），缺省显示 🔗
 * - 侧边栏会与内置工具一起平铺展示，外链条目带 ↗ 标记、新窗口打开
 */
export const EXTERNAL_TOOLS: ExternalTool[] = [
  {
    id: 'toolbox-123apps',
    name: '工具箱',
    url: 'https://123apps.com/cn/',
    desc: '123apps 在线工具集合：音频、视频、图片、PDF、文档等格式转换与处理',
    icon: '🧰',
  },
];
