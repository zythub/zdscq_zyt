/**
 * 笔记脱敏：手册会随站点部署到公开的 GitHub Pages，
 * 因此同步/加载笔记时必须把内网地址、端口、Token、账号密码等换成占位符。
 *
 * 这里是唯一真相源：
 *  - 前端：src/tools/handbook/notes.ts 在解析前调用
 *  - 同步：scripts/sync-handbook.mjs 在写入前调用
 * 源头 Obsidian 库（D:\zyt\知识库）保留真实值，只有产物被脱敏。
 *
 * 纯 JS（无类型语法），以便 Node 脚本与 Vite 同时直接 import。
 */

/** 这些地址属于通用占位/回环，不算敏感，保持原样 */
const SAFE_IPS = new Set(['127.0.0.1', '0.0.0.0', '255.255.255.255', 'localhost']);

/**
 * @type {{name: string, re: RegExp, to: string | ((m: string, ...g: string[]) => string)}[]}
 * 顺序有意义：先处理「用户@主机」和 Token，再兜底处理裸 IP。
 */
const RULES = [
  {
    // rsync/ssh 里的 用户@主机：user@10.0.0.1 → <用户>@<内网地址>
    name: 'ssh-user-host',
    re: /\b[A-Za-z0-9_.-]+@\d{1,3}(?:\.\d{1,3}){3}\b/g,
    to: '<用户>@<内网地址>',
  },
  {
    // Authorization / Token 明文：Bearer 1c5b... → Bearer <你的Token>
    name: 'bearer-token',
    re: /(Bearer\s+)[A-Za-z0-9._-]{8,}/gi,
    to: '$1<你的Token>',
  },
  {
    // IPv4（可带端口）：10.0.0.1:8080 → <内网地址>
    name: 'ipv4',
    re: /\b\d{1,3}(?:\.\d{1,3}){3}(?::\d{2,5})?\b/g,
    to: (m) => (SAFE_IPS.has(m) ? m : '<内网地址>'),
  },
  {
    // 连接串里的端口：port=54321 → port=<端口>
    name: 'port',
    re: /\b(port)\s*([=:])\s*\d{2,5}/gi,
    to: (m) => m.replace(/\d{2,5}\s*$/, '<端口>'),
  },
  {
    // 命令行里的明文密码：-p 'xxx' → -p '<密码>'
    name: 'password',
    re: /(-p\s+)'[^']*'/g,
    to: "$1'<密码>'",
  },
  {
    // ssh 端口：ssh -p 1228 → ssh -p <端口>
    name: 'ssh-port',
    re: /(ssh\s+-p\s+)\d{2,5}\b/gi,
    to: '$1<端口>',
  },
  {
    // 并列写法的账号密码：root / p@ssw0rd123 → <账号> / <密码>
    // 账号侧限定为常见用户名，避免误伤 dev / prod 这类正常并列写法
    name: 'credential-pair',
    re: /\b(?:admin|administrator|root|omm|sa|user|test|guest)\b\s*\/\s*[A-Za-z0-9_!@#$%^&*]{6,}\b/gi,
    to: '<账号> / <密码>',
  },
];

/**
 * 对一段 Markdown 做脱敏。
 * @param {string} text 原文
 * @returns {string} 脱敏后的文本
 */
export function sanitizeMd(text) {
  if (!text) return text;
  let out = text;
  for (const rule of RULES) {
    out = out.replace(rule.re, (...args) => {
      if (typeof rule.to === 'function') return rule.to(...args);
      // 函数返回值不会再被解析 $1，这里手动展开捕获组
      return rule.to.replace(/\$(\d)/g, (_, i) => args[Number(i)] ?? '');
    });
  }
  return out;
}

/**
 * 统计脱敏命中数（同步脚本用于打印报告）。
 * @param {string} text 原文
 * @returns {{rule: string, count: number}[]}
 */
export function scanSensitive(text) {
  const hits = [];
  if (!text) return hits;
  for (const rule of RULES) {
    const m = text.match(new RegExp(rule.re.source, rule.re.flags));
    if (m && m.length) hits.push({ rule: rule.name, count: m.length });
  }
  return hits;
}

export { RULES };
