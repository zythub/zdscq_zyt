<script setup lang="ts">
import { ref, computed } from 'vue';
import { NButton } from 'naive-ui';
// 直接把样例 md 打进包里（publicDir:false，无法运行时 fetch）。
import rawMd from '../../../samples/自定义表单代码/自定义表单代码.md?raw';

type Mode = 'preview' | 'edit';

const original = rawMd;
const text = ref(rawMd);
const mode = ref<Mode>('preview');

const rendered = computed(() => renderMarkdown(text.value));

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

function renderMarkdown(md: string): string {
  const lines = md.replace(/\r\n/g, '\n').split('\n');
  const out: string[] = [];
  let i = 0;
  let inCode = false;
  let codeBuf: string[] = [];
  let listType: 'ul' | 'ol' | null = null;
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
        out.push('<pre><code>' + escapeHtml(codeBuf.join('\n')) + '</code></pre>');
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
      out.push(`<h${h[1].length}>${inline(h[2])}</h${h[1].length}>`);
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
    out.push('<pre><code>' + escapeHtml(codeBuf.join('\n')) + '</code></pre>');
  }
  return out.join('\n');
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
      <div v-if="mode === 'preview'" class="preview markdown" v-html="rendered"></div>
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
  margin: 12px 0;
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
