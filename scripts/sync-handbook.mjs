/**
 * 同步 Obsidian 知识库 → 工具页内置笔记目录
 *
 * 用法：node scripts/sync-handbook.mjs
 * 源：D:\zyt\知识库（可用第一个参数覆盖）
 * 目标：src/tools/handbook/notes/
 *
 * 只会同步 .md；隐藏目录（.obsidian / .workbuddy / .git / .claude）跳过。
 * 写入前统一脱敏（内网地址 / 端口 / Token / 账号密码 → 占位符），规则见
 * src/tools/handbook/sanitize.mjs —— 源头知识库保持明文，产物不含敏感信息。
 *
 * 排除的文件（与知识库 build-viewer.mjs 的 SKIP 规则保持一致）：
 *   CLAUDE.md            —— 给 AI 的指令，不是给读者看的内容
 *   表单打包导出SQL.md   —— update-package 技能的支撑文档，只在本库存档
 * 注意：首页.md 要同步 —— 手册页打开时默认落在它上面（见 handbook/index.vue 的 HOME）。
 */
import { readdirSync, readFileSync, writeFileSync, mkdirSync, rmSync, existsSync } from 'node:fs';
import { join, resolve, dirname, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { sanitizeMd, scanSensitive } from '../src/tools/handbook/sanitize.mjs';

const HERE = dirname(fileURLToPath(import.meta.url));
const TARGET = resolve(HERE, '..', 'src', 'tools', 'handbook', 'notes');
const SOURCE = process.argv[2] ? resolve(process.argv[2]) : 'D:\\zyt\\知识库';
const SKIP = new Set(['.obsidian', '.workbuddy', '.git', '.trash', '.claude', '.trae', 'node_modules', '_site']);
const SKIP_FILES = new Set(['CLAUDE.md', '表单打包导出SQL.md']);

if (!existsSync(SOURCE)) {
  console.error('找不到知识库：' + SOURCE);
  process.exit(1);
}

function walk(dir, acc = []) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      if (SKIP.has(entry.name)) continue;
      walk(join(dir, entry.name), acc);
    } else if (entry.isFile() && entry.name.toLowerCase().endsWith('.md') && !SKIP_FILES.has(entry.name)) {
      acc.push(join(dir, entry.name));
    }
  }
  return acc;
}

const files = walk(SOURCE);
rmSync(TARGET, { recursive: true, force: true });
mkdirSync(TARGET, { recursive: true });

let copied = 0;
let redacted = 0;
const redactLog = [];
for (const abs of files) {
  const rel = abs.slice(SOURCE.length + 1);
  const dest = join(TARGET, rel);
  mkdirSync(dirname(dest), { recursive: true });
  const raw = readFileSync(abs, 'utf8');
  const hits = scanSensitive(raw).reduce((n, h) => n + h.count, 0);
  if (hits) {
    redacted += hits;
    redactLog.push(`  · ${rel} —— ${scanSensitive(raw).map((h) => `${h.rule}×${h.count}`).join('，')}`);
  }
  writeFileSync(dest, sanitizeMd(raw), 'utf8');
  copied++;
}

console.log(`已同步 ${copied} 篇笔记：${SOURCE.split(sep).pop()} → src/tools/handbook/notes/`);
console.log(redacted ? `已脱敏 ${redacted} 处敏感信息（内网地址/端口/Token/凭据）：` : '未发现敏感信息。');
for (const line of redactLog) console.log(line);
for (const f of files.slice(0, 30)) console.log('  · ' + f.slice(SOURCE.length + 1));
if (files.length > 30) console.log(`  … 其余 ${files.length - 30} 篇`);
