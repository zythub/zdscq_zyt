/**
 * 极简 Markdown → HTML（无第三方依赖，构建期/运行期均可跑）
 *
 * 覆盖手册类笔记的常见语法：标题、段落、代码块(带语言)、表格、有序/无序列表(含缩进续行)、
 * 任务列表、引用、分割线、行内代码/粗体/斜体/删除线、链接、Obsidian 双链 [[笔记|别名]]。
 * 只渲染结构，样式交给样式表；所有文本先转义，避免笔记内容注入。
 */

export interface NoteMeta {
  type?: string;
  status?: string;
  tags?: string[];
  created?: string;
  updated?: string;
  [key: string]: string | string[] | undefined;
}

export interface RenderResult {
  html: string;
  /** 按出现顺序存放代码块原文，供「复制」按钮按下标取用 */
  codes: string[];
}

const JS_KW = [
  'const', 'let', 'var', 'function', 'return', 'if', 'else', 'for', 'while', 'do', 'switch',
  'case', 'break', 'continue', 'new', 'class', 'extends', 'import', 'export', 'from', 'default',
  'async', 'await', 'try', 'catch', 'finally', 'throw', 'typeof', 'instanceof', 'of', 'in',
  'this', 'null', 'undefined', 'true', 'false', 'module', 'exports', 'require',
];
const SQL_KW = [
  'select', 'from', 'where', 'insert', 'into', 'values', 'update', 'set', 'delete', 'join',
  'left', 'right', 'inner', 'outer', 'on', 'as', 'and', 'or', 'not', 'null', 'group', 'order',
  'by', 'limit', 'offset', 'having', 'distinct', 'count', 'sum', 'max', 'min', 'create',
  'table', 'alter', 'drop', 'index', 'union', 'case', 'when', 'then', 'end', 'like', 'in',
  'exists', 'with', 'returning',
];
const SH_KW = [
  'cd', 'ls', 'echo', 'cat', 'grep', 'find', 'cp', 'mv', 'rm', 'mkdir', 'sudo', 'npm', 'node',
  'git', 'curl', 'docker', 'psql', 'export', 'source', 'if', 'then', 'fi', 'for', 'do', 'done',
  'ssh', 'scp', 'tar', 'which',
];

export function escapeHtml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

/** 轻量语法着色：注释 / 字符串 / 关键字 / 数字 */
export function highlight(code: string, lang: string): string {
  const L = lang.toLowerCase();
  const isSql = L.includes('sql');
  const isSh = /^(bash|sh|shell|zsh|console)$/.test(L);
  const kw = isSql ? SQL_KW : isSh ? SH_KW : JS_KW;
  const comment = isSql ? '--[^\\n]*' : isSh ? '#[^\\n]*' : '\\/\\/[^\\n]*|\\/\\*[\\s\\S]*?\\*\\/';
  const re = new RegExp(
    `(${comment})|("(?:[^"\\\\]|\\\\.)*"|'(?:[^'\\\\]|\\\\.)*'|\`(?:[^\`\\\\]|\\\\.)*\`)` +
      `|\\b(${kw.join('|')})\\b|(\\b\\d+(?:\\.\\d+)?\\b)`,
    'gi',
  );
  return code.replace(re, (_full, c: string, s: string, k: string, n: string) =>
    c
      ? `<span class="tok-c">${c}</span>`
      : s
        ? `<span class="tok-s">${s}</span>`
        : k
          ? `<span class="tok-k">${k}</span>`
          : `<span class="tok-n">${n}</span>`,
  );
}

/** [[目标|别名]] / [[目标]] → 可跳转标签；无法解析则置灰 */
function renderWikilink(
  s: string,
  resolve: (target: string) => string | null,
): string {
  return s.replace(/\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g, (_m, target: string, label?: string) => {
    const id = resolve(target.trim());
    const text = label || target.split('/').pop() || target;
    return id
      ? `<span class="wikilink" data-link="${escapeHtml(id)}">${escapeHtml(text)}</span>`
      : `<span class="wikilink is-dead" title="未收录">${escapeHtml(text)}</span>`;
  });
}

/** 行内元素：行内代码 → 双链 → 链接 → 粗体/斜体/删除线 */
export function inlineMd(text: string, resolve: (target: string) => string | null): string {
  const holders: string[] = [];
  let s = escapeHtml(text);
  s = s.replace(/`([^`]+)`/g, (_m, c: string) => {
    holders.push(`<code>${c}</code>`);
    return `@@C${holders.length - 1}@@`;
  });
  s = renderWikilink(s, resolve);
  s = s.replace(
    /\[([^\]]+)\]\(([^)]+)\)/g,
    (_m, t: string, u: string) =>
      /^(https?:|mailto:)/i.test(u) || u.startsWith('#')
        ? `<a href="${u}" target="_blank" rel="noopener noreferrer">${t}</a>`
        : `<span class="wikilink is-dead">${t}</span>`,
  );
  s = s.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  s = s.replace(/(^|[^*])\*([^*\n]+)\*/g, '$1<em>$2</em>');
  s = s.replace(/~~([^~]+)~~/g, '<del>$1</del>');
  return s.replace(/@@C(\d+)@@/g, (m, i: string) => holders[Number(i)] ?? m);
}

const splitRow = (row: string): string[] =>
  row
    .replace(/^\s*\|/, '')
    .replace(/\|\s*$/, '')
    .split('|')
    .map((c) => c.trim());

function renderList(
  items: string[],
  ordered: boolean,
  resolve: (target: string) => string | null,
): string {
  const tag = ordered ? 'ol' : 'ul';
  let html = `<${tag}>`;
  let open = false;
  for (const raw of items) {
    const m = /^(\s*)([-*+]|\d+\.)\s+(.*)$/.exec(raw);
    if (m) {
      if (open) html += '</li>';
      const task = /^\[( |x|X)\]\s+/.exec(m[3]);
      html += '<li>';
      open = true;
      html += task
        ? `<input type="checkbox" disabled${task[1] !== ' ' ? ' checked' : ''} /> ` +
          inlineMd(m[3].replace(/^\[( |x|X)\]\s+/, ''), resolve)
        : inlineMd(m[3], resolve);
    } else if (open) {
      html += ' ' + inlineMd(raw.trim(), resolve);
    }
  }
  if (open) html += '</li>';
  return html + `</${tag}>`;
}

export function renderMarkdown(
  src: string,
  resolve: (target: string) => string | null,
): RenderResult {
  const lines = src.replace(/\r\n/g, '\n').split('\n');
  const out: string[] = [];
  const codes: string[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (!line.trim()) {
      i++;
      continue;
    }

    const fence = /^\s*```\s*([\w+-]*)\s*$/.exec(line);
    if (fence) {
      const lang = fence[1] || '';
      const buf: string[] = [];
      i++;
      while (i < lines.length && !/^\s*```\s*$/.test(lines[i])) {
        buf.push(lines[i]);
        i++;
      }
      i++;
      const raw = buf.join('\n');
      const idx = codes.length;
      codes.push(raw);
      out.push(
        '<div class="code-block">' +
          `<div class="code-bar"><span class="code-lang">${escapeHtml(lang || 'text')}</span>` +
          `<button type="button" class="copy-btn" data-code="${idx}">复制</button></div>` +
          `<pre><code>${highlight(escapeHtml(raw), lang)}</code></pre></div>`,
      );
      continue;
    }

    const heading = /^(#{1,6})\s+(.*)$/.exec(line);
    if (heading) {
      const lv = heading[1].length;
      out.push(`<h${lv}>${inlineMd(heading[2].replace(/#+\s*$/, ''), resolve)}</h${lv}>`);
      i++;
      continue;
    }

    if (/^\s*(---|\*\*\*|___)\s*$/.test(line)) {
      out.push('<hr />');
      i++;
      continue;
    }

    if (line.includes('|') && i + 1 < lines.length && /^\s*\|?[\s:|-]+\|[\s:|-]*$/.test(lines[i + 1])) {
      const head = splitRow(line);
      i += 2;
      const rows: string[][] = [];
      while (i < lines.length && lines[i].includes('|') && lines[i].trim()) {
        rows.push(splitRow(lines[i]));
        i++;
      }
      out.push(
        '<div class="table-wrap"><table><thead><tr>' +
          head.map((c) => `<th>${inlineMd(c, resolve)}</th>`).join('') +
          '</tr></thead><tbody>' +
          rows.map((r) => '<tr>' + r.map((c) => `<td>${inlineMd(c, resolve)}</td>`).join('') + '</tr>').join('') +
          '</tbody></table></div>',
      );
      continue;
    }

    if (/^\s*>\s?/.test(line)) {
      const buf: string[] = [];
      while (i < lines.length && /^\s*>\s?/.test(lines[i])) {
        buf.push(lines[i].replace(/^\s*>\s?/, ''));
        i++;
      }
      out.push(`<blockquote>${renderMarkdown(buf.join('\n'), resolve).html}</blockquote>`);
      continue;
    }

    if (/^\s*([-*+]|\d+\.)\s+/.test(line)) {
      const ordered = /^\s*\d+\.\s/.test(line);
      const items: string[] = [];
      while (
        i < lines.length &&
        (/^\s*([-*+]|\d+\.)\s+/.test(lines[i]) || /^\s{2,}\S/.test(lines[i]))
      ) {
        items.push(lines[i]);
        i++;
      }
      out.push(renderList(items, ordered, resolve));
      continue;
    }

    const buf: string[] = [];
    while (
      i < lines.length &&
      lines[i].trim() &&
      !/^\s*```/.test(lines[i]) &&
      !/^(#{1,6})\s/.test(lines[i]) &&
      !/^\s*>\s?/.test(lines[i]) &&
      !/^\s*([-*+]|\d+\.)\s+/.test(lines[i]) &&
      !/^\s*(---|\*\*\*|___)\s*$/.test(lines[i])
    ) {
      buf.push(lines[i]);
      i++;
    }
    if (buf.length) {
      out.push(`<p>${inlineMd(buf.join('\n'), resolve).replace(/\n/g, '<br />')}</p>`);
    } else {
      i++;
    }
  }

  return { html: out.join('\n'), codes };
}

/** 解析 YAML frontmatter（支持 key: value 与 - item 列表） */
export function parseFrontmatter(raw: string): { meta: NoteMeta; body: string } {
  const m = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(raw);
  if (!m) return { meta: {}, body: raw };
  const meta: NoteMeta = {};
  let listKey: string | null = null;
  for (const line of m[1].split(/\r?\n/)) {
    const kv = /^([A-Za-z_\u4e00-\u9fa5][\w\u4e00-\u9fa5-]*)\s*:\s*(.*)$/.exec(line);
    if (kv) {
      const key = kv[1];
      const val = kv[2].trim().replace(/^['"]|['"]$/g, '');
      if (val === '') {
        listKey = key;
        meta[key] = [];
      } else {
        listKey = null;
        meta[key] = val;
      }
      continue;
    }
    const item = /^\s*-\s+(.*)$/.exec(line);
    if (item && listKey) {
      (meta[listKey] as string[]).push(item[1].trim().replace(/^['"]|['"]$/g, ''));
    }
  }
  return { meta, body: raw.slice(m[0].length) };
}
