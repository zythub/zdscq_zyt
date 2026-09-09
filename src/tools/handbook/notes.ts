/**
 * 手册数据层：构建期把笔记原文打进包里（publicDir:false，不能运行时 fetch），
 * 在这里解析 frontmatter、按顶层目录分组，供工具页直接使用。
 *
 * 笔记来源：D:\zyt\知识库，由 `node scripts/sync-handbook.mjs` 同步到 ./notes/。
 */
import { parseFrontmatter, type NoteMeta } from './markdown';
// 脱敏必须在解析之前：frontmatter 里同样可能带地址/Token
import { sanitizeMd } from './sanitize.mjs';

export interface Note {
  /** 相对路径（不含扩展名），如 01-自定义开发/表单事件API参考 */
  id: string;
  title: string;
  file: string;
  group: string;
  /** 分区序号：顶层目录前缀数字；无编号为 99；根目录笔记为 00 */
  groupIndex: string;
  meta: NoteMeta;
  content: string;
}

export interface Group {
  index: string;
  name: string;
  notes: string[];
}

const raws = import.meta.glob('./notes/**/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

function groupOf(id: string): { index: string; name: string } {
  const parts = id.split('/');
  const top = parts.length > 1 ? parts[0] : '';
  if (!top) return { index: '00', name: '入口' };
  const m = /^(\d+)[-–—\s]*(.*)$/.exec(top);
  if (m) return { index: m[1].padStart(2, '0'), name: m[2] || top };
  return { index: '99', name: top };
}

function titleOf(body: string, id: string): string {
  const h = /^#\s+(.+)$/m.exec(body);
  if (h) return h[1].replace(/\s*\{[^}]*\}\s*$/, '').trim();
  return id.split('/').pop() ?? id;
}

export const notes: Note[] = Object.entries(raws)
  .map(([key, raw]) => {
    const id = key.replace(/^\.\/notes\//, '').replace(/\.md$/i, '');
    // 脱敏后再解析：frontmatter / 正文都不应带出内网地址与凭据
    const { meta, body } = parseFrontmatter(sanitizeMd(raw));
    const g = groupOf(id);
    return {
      id,
      title: titleOf(body, id),
      file: id + '.md',
      group: g.name,
      groupIndex: g.index,
      meta,
      content: body.trim(),
    };
  })
  .sort((a, b) =>
    a.groupIndex === b.groupIndex
      ? a.file.localeCompare(b.file, 'zh-Hans-CN')
      : a.groupIndex.localeCompare(b.groupIndex),
  );

export const groups: Group[] = (() => {
  const acc: Group[] = [];
  for (const n of notes) {
    let g = acc.find((x) => x.index === n.groupIndex);
    if (!g) {
      g = { index: n.groupIndex, name: n.group, notes: [] };
      acc.push(g);
    }
    g.notes.push(n.id);
  }
  return acc;
})();

export const noteById = new Map<string, Note>(notes.map((n) => [n.id, n]));

/** 解析 [[双链]] 目标：先整路径匹配，再退化为文件名匹配（Obsidian 的短链写法） */
export function resolveNoteId(target: string): string | null {
  const t = target.trim().replace(/\.md$/i, '');
  if (!t) return null;
  if (noteById.has(t)) return t;
  const base = t.split('/').pop();
  for (const id of noteById.keys()) {
    if (id.split('/').pop() === base) return id;
  }
  return null;
}
