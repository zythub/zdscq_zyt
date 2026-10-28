<script setup lang="ts">
import { computed } from 'vue';
import { noteById, resolveNoteId } from '@/tools/handbook/notes';
import { renderMarkdown } from '@/tools/handbook/markdown';

// 首页 = 手册站首页（首页.md），与手册站保持一致：两边页面基本一样。
const home = noteById.get('首页') ?? null;
const rendered = computed(() =>
  home ? renderMarkdown(home.content, resolveNoteId).html : '',
);
</script>

<template>
  <div class="home">
    <article v-if="home" class="doc">
      <!-- 内容由本地 markdown 渲染器生成，文本已转义 -->
      <div class="markdown" v-html="rendered"></div>
    </article>
    <div v-else class="empty">
      <b>首页内容缺失</b>
      未找到「首页」笔记，请在 src/tools/handbook/notes/ 下补回 首页.md。
    </div>
  </div>
</template>

<style scoped>
.home {
  display: flex;
  flex: 1;
  min-height: 0;
  justify-content: center;
  overflow: auto;
  padding: 28px 20px 80px;
}
.doc {
  width: 100%;
  max-width: 860px;
}
.empty {
  padding: 90px 20px;
  text-align: center;
  color: var(--text-3);
}
.empty b {
  display: block;
  font-size: 15px;
  color: var(--text-2);
  margin-bottom: 6px;
}

/* markdown 排版（与手册页保持一致） */
.markdown {
  font-size: 16px;
  line-height: 1.75;
  color: var(--text-1);
}
.markdown :deep(h1) {
  font-size: 26px;
  font-weight: 700;
  letter-spacing: -0.01em;
  margin: 0 0 16px;
  line-height: 1.3;
}
.markdown :deep(h2) {
  font-size: 19px;
  font-weight: 700;
  margin: 30px 0 12px;
  padding-left: 10px;
  border-left: 3px solid var(--primary);
  line-height: 1.4;
}
.markdown :deep(h3) {
  font-size: 16px;
  font-weight: 650;
  margin: 22px 0 8px;
}
.markdown :deep(h4) {
  font-size: 14px;
  margin: 18px 0 6px;
  color: var(--text-2);
}
.markdown :deep(p) {
  margin: 0 0 12px;
}
.markdown :deep(ul),
.markdown :deep(ol) {
  margin: 0 0 12px;
  padding-left: 22px;
}
.markdown :deep(li) {
  margin: 4px 0;
}
.markdown :deep(a) {
  color: var(--primary);
  text-decoration: none;
}
.markdown :deep(a:hover) {
  text-decoration: underline;
}
.markdown :deep(hr) {
  border: 0;
  border-top: 1px solid var(--border);
  margin: 24px 0;
}
.markdown :deep(blockquote) {
  margin: 14px 0;
  padding: 10px 14px;
  border-left: 3px solid var(--border-strong);
  border-radius: 0 var(--r-sm) var(--r-sm) 0;
  background: var(--surface-2);
  color: var(--text-2);
  font-size: 15px;
}
.markdown :deep(blockquote p:last-child) {
  margin-bottom: 0;
}
.markdown :deep(code) {
  font: 13px/1.6 var(--font-mono);
  background: var(--surface-2);
  border: 1px solid var(--border);
  border-radius: var(--r-xs);
  padding: 1px 5px;
  color: var(--text-1);
}
.markdown :deep(.table-wrap) {
  overflow-x: auto;
  margin: 14px 0;
}
.markdown :deep(table) {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  font-size: 14px;
  border: 1px solid var(--border);
  border-radius: var(--r-sm);
  overflow: hidden;
}
.markdown :deep(th) {
  background: var(--surface-2);
  text-align: left;
  font-weight: 650;
  padding: 8px 10px;
  border-bottom: 1px solid var(--border);
  white-space: nowrap;
}
.markdown :deep(td) {
  padding: 8px 10px;
  border-bottom: 1px solid var(--border);
  vertical-align: top;
}
.markdown :deep(tr:last-child td) {
  border-bottom: 0;
}
.markdown :deep(tbody tr:hover td) {
  background: var(--surface-2);
}
.markdown :deep(.code-block) {
  margin: 14px 0;
  border: 1px solid var(--border);
  border-radius: var(--r-sm);
  background: var(--surface-2);
  overflow: hidden;
}
.markdown :deep(.code-bar) {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 4px 10px;
  background: var(--surface-1);
  border-bottom: 1px solid var(--border);
}
.markdown :deep(.code-lang) {
  font: 10px/1 var(--font-mono);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--primary);
}
.markdown :deep(.copy-btn) {
  margin-left: auto;
  border: 1px solid var(--border);
  background: var(--surface-2);
  color: var(--text-3);
  border-radius: var(--r-xs);
  padding: 2px 8px;
  cursor: pointer;
  font: 11px/1.5 var(--font-mono);
}
.markdown :deep(.code-block pre) {
  margin: 0;
  padding: 12px 14px;
  overflow-x: auto;
}
.markdown :deep(.code-block pre code) {
  background: none;
  border: 0;
  padding: 0;
  font: 13px/1.65 var(--font-mono);
  white-space: pre;
}
.markdown :deep(.wikilink) {
  color: var(--primary);
  border-bottom: 1px dashed var(--primary);
  cursor: pointer;
  font-weight: 500;
}
.markdown :deep(.wikilink:hover) {
  background: var(--primary-soft);
}
.markdown :deep(.wikilink.is-dead) {
  color: var(--text-3);
  border-bottom: 1px dotted var(--border-strong);
  cursor: default;
}
.markdown :deep(.wikilink.is-dead:hover) {
  background: transparent;
}
</style>
