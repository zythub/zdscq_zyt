<script setup lang="ts">
import { ref, computed } from 'vue';
import { NButton } from 'naive-ui';
// 直接把样例 md 打进包里（publicDir:false，无法运行时 fetch）。
import rawMd from '../../../samples/自定义表单代码/自定义表单代码.md?raw';

type Mode = 'preview' | 'edit';

const original = rawMd;
const text = ref(rawMd);
const mode = ref<Mode>('preview');

interface TocItem {
  id: string;
  level: number;
  text: string;
}
interface ParseResult {
  html: string;
  toc: TocItem[];
}

/** 解析一次，同时产出 HTML 与目录（标题带锚点 id，便于点击跳转） */
const parsed = computed<ParseResult>(() => parseMarkdown(text.value));
const rendered = computed(() => parsed.value.html);
const toc = computed(() => parsed.value.toc);

/** 极简 markdown → HTML（覆盖标题/代码块/列表/引用/分割线/行内），无第三方依赖 */
function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function inline(s: string): string {
  let t = escapeHtml(s);
  t = t.replace(/`([^`]+)`/g, '<code>$1</code>');
  t = t.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  t = t.replace(/\*([^*]+)\*/g, '<em>$1</em>');
  t = t.replace(
    /\[([^\]]+)\]\(([^)\s]+)\)/g,
    '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>',
  );
  return t;
}

/** 目录里展示标题的纯文本（去掉行内标记/标签） */
function plainHeading(s: string): string {
  return s
    .replace(/`([^`]+)`/g, '$1')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
    .replace(/<[^>]+>/g, '')
    .trim();
}

function wrapCode(code: string): string {
  return (
    '<div class="code-block"><button type="button" class="copy-btn">复制</button>' +
    '<pre><code>' +
    escapeHtml(code) +
    '</code></pre></div>'
  );
}

function parseMarkdown(md: string): ParseResult {
  const lines = md.replace(/\r\n/g, '\n').split('\n');
  const out: string[] = [];
  const toc: TocItem[] = [];
  let i = 0;
  let inCode = false;
  let codeBuf: string[] = [];
  let listType: 'ul' | 'ol' | null = null;
  let hid = 0;
  const para: string[] = [];

  const flushPara = () => {
    if (para.length) {
      out.push('<p>' + inline(para.join(' ')) + '</p>');
      para.length = 0;
    }
  };
  const closeList = () => {
    if (listType) {
      out.push(`</${listType}>`);
      listType = null;
    }
  };

  while (i < lines.length) {
    const line = lines[i];

    if (/^```/.test(line)) {
      if (!inCode) {
        flushPara();
        closeList();
        inCode = true;
        codeBuf = [];
      } else {
        inCode = false;
        out.push(wrapCode(codeBuf.join('\n')));
      }
      i++;
      continue;
    }
    if (inCode) {
      codeBuf.push(line);
      i++;
      continue;
    }

    const h = line.match(/^(#{1,6})\s+(.*)$/);
    if (h) {
      flushPara();
      closeList();
      const id = 'sec-' + hid++;
      const level = h[1].length;
      toc.push({ id, level, text: plainHeading(h[2]) });
      out.push(`<h${level} id="${id}">${inline(h[2])}</h${level}>`);
      i++;
      continue;
    }

    if (/^(---+|\*\*\*+)\s*$/.test(line)) {
      flushPara();
      closeList();
      out.push('<hr/>');
      i++;
      continue;
    }

    const bq = line.match(/^>\s?(.*)$/);
    if (bq) {
      flushPara();
      closeList();
      out.push('<blockquote>' + inline(bq[1]) + '</blockquote>');
      i++;
      continue;
    }

    const ul = line.match(/^[-*]\s+(.*)$/);
    if (ul) {
      flushPara();
      if (listType !== 'ul') {
        closeList();
        out.push('<ul>');
        listType = 'ul';
      }
      out.push('<li>' + inline(ul[1]) + '</li>');
      i++;
      continue;
    }

    const ol = line.match(/^\d+\.\s+(.*)$/);
    if (ol) {
      flushPara();
      if (listType !== 'ol') {
        closeList();
        out.push('<ol>');
        listType = 'ol';
      }
      out.push('<li>' + inline(ol[1]) + '</li>');
      i++;
      continue;
    }

    if (/^\s*$/.test(line)) {
      flushPara();
      closeList();
      i++;
      continue;
    }

    para.push(line.trim());
    i++;
  }

  flushPara();
  closeList();
  if (inCode) {
    out.push(wrapCode(codeBuf.join('\n')));
  }
  return { html: out.join('\n'), toc };
}

function download(): void {
  const blob = new Blob([text.value], { type: 'text/markdown;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = '自定义表单代码.md';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function reset(): void {
  text.value = original;
}

/** 目录点击：平滑滚动到对应标题 */
function scrollToHeading(id: string): void {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

/** 预览区事件委托：点到复制按钮时复制其代码块内容 */
function onPreviewClick(e: MouseEvent): void {
  const target = e.target as HTMLElement | null;
  const btn = target?.closest('.copy-btn') as HTMLElement | null;
  if (!btn) return;
  const block = btn.closest('.code-block') as HTMLElement | null;
  const codeEl = block?.querySelector('pre code');
  if (!codeEl) return;
  copyText(codeEl.textContent ?? '');
  const old = btn.textContent ?? '复制';
  btn.textContent = '已复制 ✓';
  btn.classList.add('copied');
  window.setTimeout(() => {
    btn.textContent = old;
    btn.classList.remove('copied');
  }, 1500);
}

function copyText(s: string): void {
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(s).catch(() => fallbackCopy(s));
  } else {
    fallbackCopy(s);
  }
}

/** 非安全上下文（如纯 http）兜底到 execCommand */
function fallbackCopy(s: string): void {
  const ta = document.createElement('textarea');
  ta.value = s;
  ta.style.position = 'fixed';
  ta.style.top = '-9999px';
  ta.style.opacity = '0';
  document.body.appendChild(ta);
  ta.select();
  try {
    document.execCommand('copy');
  } catch {
    /* 忽略 */
  }
  document.body.removeChild(ta);
}
</script>

<template>
  <div class="page">
    <div class="toolbar">
      <div class="seg">
        <button :class="{ active: mode === 'preview' }" type="button" @click="mode = 'preview'">
          预览
        </button>
        <button :class="{ active: mode === 'edit' }" type="button" @click="mode = 'edit'">
          编辑
        </button>
      </div>
      <span class="spacer"></span>
      <NButton size="small" tertiary @click="reset">重置</NButton>
      <NButton size="small" type="primary" @click="download">下载 MD</NButton>
    </div>

    <div class="body">
      <template v-if="mode === 'preview'">
        <aside v-if="toc.length" class="toc">
          <div class="toc-title">目录</div>
          <ul>
            <li
              v-for="item in toc"
              :key="item.id"
              :class="'lv' + item.level"
            >
              <a href="#" @click.prevent="scrollToHeading(item.id)">{{ item.text }}</a>
            </li>
          </ul>
        </aside>
        <div class="preview markdown" v-html="rendered" @click="onPreviewClick"></div>
      </template>
      <textarea
        v-else
        v-model="text"
        class="editor"
        spellcheck="false"
        placeholder="在此编辑 Markdown…"
      ></textarea>
    </div>
  </div>
</template>

<style scoped>
.page {
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 0;
}
.toolbar {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
  margin-bottom: 10px;
}
.spacer {
  flex: 1;
}
.seg {
  display: inline-flex;
  border: 1px solid var(--border);
  border-radius: var(--r-md);
  overflow: hidden;
  background: var(--surface-2);
}
.seg button {
  border: 0;
  background: transparent;
  color: var(--text-2);
  font: inherit;
  font-size: 13px;
  padding: 5px 14px;
  cursor: pointer;
}
.seg button.active {
  background: var(--primary);
  color: #fff;
}
.body {
  flex: 1;
  min-height: 0;
  display: flex;
  border: 1px solid var(--border);
  border-radius: var(--r-md);
  overflow: hidden;
  background: var(--surface-1);
}
.preview {
  flex: 1;
  min-height: 0;
  overflow: auto;
  padding: 18px 22px;
  line-height: 1.7;
  color: var(--text-1);
}
.toc {
  width: 220px;
  flex-shrink: 0;
  border-right: 1px solid var(--border);
  background: var(--surface-2);
  overflow: auto;
  padding: 14px 12px;
}
.toc-title {
  font-size: 12px;
  font-weight: 600;
  color: var(--text-3);
  text-transform: uppercase;
  letter-spacing: 0.04em;
  margin-bottom: 10px;
}
.toc ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
.toc li {
  margin: 1px 0;
}
.toc li a {
  display: block;
  font-size: 13px;
  color: var(--text-2);
  text-decoration: none;
  padding: 4px 8px;
  border-radius: 6px;
  line-height: 1.4;
  cursor: pointer;
}
.toc li a:hover {
  background: var(--surface-1);
  color: var(--text-1);
}
.toc li.lv1 a {
  font-weight: 600;
  color: var(--text-1);
}
.toc li.lv2 a { padding-left: 18px; }
.toc li.lv3 a { padding-left: 30px; }
.toc li.lv4 a { padding-left: 42px; }
.toc li.lv5 a { padding-left: 54px; }
.toc li.lv6 a { padding-left: 66px; }
.editor {
  flex: 1;
  min-height: 0;
  width: 100%;
  resize: none;
  border: 0;
  outline: none;
  padding: 16px 18px;
  font-family: var(--font-mono);
  font-size: 13px;
  line-height: 1.65;
  color: var(--text-1);
  background: var(--surface-1);
}

/* markdown 基础排版 */
.markdown :deep(h1),
.markdown :deep(h2),
.markdown :deep(h3),
.markdown :deep(h4) {
  margin: 18px 0 10px;
  line-height: 1.3;
}
.markdown :deep(h1) { font-size: 22px; }
.markdown :deep(h2) { font-size: 19px; border-bottom: 1px solid var(--border); padding-bottom: 6px; }
.markdown :deep(h3) { font-size: 16px; }
.markdown :deep(h4) { font-size: 14px; color: var(--text-2); }
.markdown :deep(p) { margin: 10px 0; }
.markdown :deep(ul),
.markdown :deep(ol) { margin: 10px 0; padding-left: 24px; }
.markdown :deep(li) { margin: 4px 0; }
.markdown :deep(a) { color: var(--primary); }
.markdown :deep(code) {
  font-family: var(--font-mono);
  font-size: 12.5px;
  padding: 1px 5px;
  border-radius: 4px;
  background: var(--surface-2);
  border: 1px solid var(--border);
}
.markdown :deep(pre) {
  margin: 0;
  padding: 14px 16px;
  border-radius: var(--r-sm);
  background: var(--surface-2);
  border: 1px solid var(--border);
  overflow: auto;
}
.markdown :deep(pre code) {
  padding: 0;
  border: 0;
  background: transparent;
  font-size: 12.5px;
  line-height: 1.6;
}
/* 代码块容器 + 右上角复制按钮 */
.markdown :deep(.code-block) {
  position: relative;
  margin: 12px 0;
}
.markdown :deep(.copy-btn) {
  position: absolute;
  top: 8px;
  right: 8px;
  font: inherit;
  font-size: 12px;
  padding: 3px 10px;
  border: 1px solid var(--border);
  border-radius: 6px;
  background: var(--surface-1);
  color: var(--text-2);
  cursor: pointer;
  opacity: 0;
  transition: opacity 0.15s ease, color 0.15s ease, border-color 0.15s ease;
}
.markdown :deep(.code-block:hover .copy-btn) {
  opacity: 1;
}
.markdown :deep(.copy-btn.copied) {
  color: var(--primary);
  border-color: var(--primary);
  opacity: 1;
}
.markdown :deep(blockquote) {
  margin: 10px 0;
  padding: 4px 14px;
  border-left: 3px solid var(--primary);
  color: var(--text-2);
  background: var(--surface-2);
  border-radius: 0 var(--r-sm) var(--r-sm) 0;
}
.markdown :deep(hr) {
  border: 0;
  border-top: 1px solid var(--border);
  margin: 16px 0;
}
</style>
