<script setup lang="ts">
import { computed, inject, nextTick, onBeforeUnmount, ref, watch } from 'vue';
import { NInput } from 'naive-ui';
import { groups, noteById, notes, resolveNoteId } from './notes';
import { escapeHtml, renderMarkdown } from './markdown';
import { MANUAL_PV_ID, useVisitCounter } from '@/core/visitCounter';

interface AppThemeApi {
  isDark: { value: boolean };
  toggle: () => void;
}
// 手册是「无外壳」页面，自带深浅色切换（主题状态由 App 通过 provide 下发）
const appTheme = inject<AppThemeApi>('appTheme');

// 手册页 hideChrome 隐藏了站点底栏，这里单独显示访问人次
useVisitCounter();

interface TocItem {
  id: string;
  text: string;
  level: number;
}

/** 默认打开首页（没有则打开第一篇） */
const HOME = notes.find((n) => n.id === '首页') ?? notes[0];

const tabs = ref<string[]>(HOME ? [HOME.id] : []);
const active = ref<string | null>(HOME ? HOME.id : null);
const query = ref('');
const showResults = ref(false);
const toc = ref<TocItem[]>([]);
const activeHeading = ref('');
const docEl = ref<HTMLElement | null>(null);
let codes: string[] = [];
let observer: IntersectionObserver | null = null;

const current = computed(() => (active.value ? noteById.get(active.value) ?? null : null));
const rendered = computed(() =>
  current.value ? renderMarkdown(current.value.content, resolveNoteId).html : '',
);

watch(
  rendered,
  () => {
    if (current.value) {
      codes = renderMarkdown(current.value.content, resolveNoteId).codes;
    } else {
      codes = [];
    }
    void nextTick(() => buildToc());
  },
  { immediate: true },
);

/* ── 目录 ── */
function open(id: string): void {
  if (!noteById.has(id)) return;
  if (!tabs.value.includes(id)) tabs.value.push(id);
  active.value = id;
  query.value = '';
  showResults.value = false;
  const el = docEl.value?.parentElement;
  if (el) el.scrollTop = 0;
}
function close(id: string): void {
  const at = tabs.value.indexOf(id);
  if (at < 0) return;
  tabs.value.splice(at, 1);
  if (active.value === id) {
    active.value = tabs.value[Math.min(at, tabs.value.length - 1)] ?? null;
  }
}

/* ── 搜索 ── */
interface Hit {
  id: string;
  title: string;
  groupIndex: string;
  snippet: string;
}
const hits = computed<Hit[]>(() => {
  const key = query.value.trim().toLowerCase();
  if (!key) return [];
  const out: Hit[] = [];
  for (const n of notes) {
    const inTitle = n.title.toLowerCase().includes(key);
    const at = n.content.toLowerCase().indexOf(key);
    if (!inTitle && at < 0) continue;
    const raw =
      at >= 0
        ? (at > 30 ? '…' : '') + n.content.slice(Math.max(0, at - 30), at + 110).replace(/\s+/g, ' ')
        : n.content.replace(/[#>*`|-]/g, ' ').replace(/\s+/g, ' ').slice(0, 90);
    const snippet = escapeHtml(raw).replace(
      new RegExp(`(${key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'ig'),
      '<mark>$1</mark>',
    );
    out.push({ id: n.id, title: n.title, groupIndex: n.groupIndex, snippet });
  }
  return out.slice(0, 12);
});

/* ── 正文交互：双链 / 复制 / 目录 ── */
function onDocClick(e: MouseEvent): void {
  const t = e.target as HTMLElement | null;
  if (!t) return;
  const link = t.closest<HTMLElement>('.wikilink');
  if (link?.dataset.link) {
    open(link.dataset.link);
    return;
  }
  const btn = t.closest<HTMLElement>('.copy-btn');
  if (btn) {
    const idx = Number(btn.dataset.code ?? -1);
    const text = codes[idx] ?? '';
    copyText(text);
    const old = btn.textContent ?? '复制';
    btn.textContent = '已复制 ✓';
    window.setTimeout(() => {
      btn.textContent = old;
    }, 1500);
  }
}

function copyText(s: string): void {
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(s).catch(() => fallbackCopy(s));
  } else {
    fallbackCopy(s);
  }
}
function fallbackCopy(s: string): void {
  const ta = document.createElement('textarea');
  ta.value = s;
  ta.style.position = 'fixed';
  ta.style.top = '-9999px';
  document.body.appendChild(ta);
  ta.select();
  try {
    document.execCommand('copy');
  } catch {
    /* 忽略 */
  }
  document.body.removeChild(ta);
}

function buildToc(): void {
  observer?.disconnect();
  const root = docEl.value;
  if (!root) return;
  const hs = Array.from(root.querySelectorAll<HTMLElement>('h2, h3'));
  hs.forEach((h, i) => {
    if (!h.id) h.id = 'sec-' + i;
  });
  toc.value = hs.map((h) => ({
    id: h.id,
    text: h.textContent ?? '',
    level: h.tagName === 'H3' ? 3 : 2,
  }));
  activeHeading.value = toc.value[0]?.id ?? '';
  observer = new IntersectionObserver(
    (entries) => {
      for (const en of entries) {
        if (en.isIntersecting) activeHeading.value = en.target.id;
      }
    },
    { rootMargin: '-70px 0px -70% 0px' },
  );
  hs.forEach((h) => observer?.observe(h));
}

function scrollToHeading(id: string): void {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

onBeforeUnmount(() => observer?.disconnect());

const metaChips = computed(() => {
  const m = current.value?.meta ?? {};
  const chips: { text: string; kind: string }[] = [];
  if (m.type) chips.push({ text: String(m.type), kind: 'type' });
  if (m.status) chips.push({ text: String(m.status), kind: m.status === '完成' ? 'ok' : 'warn' });
  for (const tag of Array.isArray(m.tags) ? m.tags : []) chips.push({ text: '#' + tag, kind: 'tag' });
  if (m.updated) chips.push({ text: '更新 ' + m.updated, kind: 'tag' });
  return chips;
});
</script>

<template>
  <div class="page">
    <div class="toolbar">
      <div class="search">
        <NInput
          v-model:value="query"
          size="small"
          placeholder="搜索标题与正文"
          clearable
          @focus="showResults = true"
        />
        <div v-if="showResults && query.trim()" class="results">
          <button
            v-for="h in hits"
            :key="h.id"
            type="button"
            class="hit"
            @click="open(h.id)"
          >
            <span class="hit-t">
              <em>{{ h.groupIndex }}</em>
              <span v-html="h.title"></span>
            </span>
            <span class="hit-s" v-html="h.snippet"></span>
          </button>
          <p v-if="!hits.length" class="hit-empty">没有匹配「{{ query }}」的笔记</p>
        </div>
      </div>
      <span class="spacer"></span>
      <span class="stat">{{ notes.length }} 篇 · {{ groups.length }} 分区</span>
      <span class="stat" title="站点累计访问人次">访问 <span :id="MANUAL_PV_ID" class="mono">–</span></span>
      <button
        v-if="appTheme"
        type="button"
        class="theme-btn"
        :title="appTheme.isDark.value ? '切换到浅色' : '切换到深色'"
        @click="appTheme.toggle()"
      >
        <svg v-if="appTheme.isDark.value" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
        </svg>
        <svg v-else viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
        </svg>
      </button>
    </div>

    <div class="body">
      <aside class="sidebar">
        <div v-for="g in groups" :key="g.index" class="grp">
          <div class="grp-head">
            <span v-if="g.index !== '99'" class="grp-num">{{ g.index }}</span>
            <span>{{ g.name }}</span>
          </div>
          <button
            v-for="id in g.notes"
            :key="id"
            type="button"
            class="leaf"
            :class="{ on: id === active }"
            :title="noteById.get(id)?.title"
            @click="open(id)"
          >
            {{ noteById.get(id)?.title }}
          </button>
        </div>
      </aside>

      <main class="main">
        <div class="tabbar">
          <div
            v-for="id in tabs"
            :key="id"
            class="tab"
            :class="{ on: id === active }"
            @click="open(id)"
          >
            <span v-if="noteById.get(id)?.groupIndex !== '99'" class="tab-num">{{
              noteById.get(id)?.groupIndex
            }}</span>
            <span class="tab-t">{{ noteById.get(id)?.title }}</span>
            <button type="button" class="tab-x" title="关闭" @click.stop="close(id)">×</button>
          </div>
        </div>

        <div class="doc-wrap">
          <article v-if="current" class="doc">
            <div class="meta-bar">
              <span v-for="c in metaChips" :key="c.text + c.kind" class="chip" :class="c.kind">
                {{ c.text }}
              </span>
              <span class="crumb">{{ current.file }}</span>
            </div>
            <!-- 内容由本地 markdown 渲染器生成，文本已转义 -->
            <div ref="docEl" class="markdown" v-html="rendered" @click="onDocClick"></div>
          </article>
          <div v-else class="empty">
            <b>没有打开的笔记</b>
            从左侧目录或顶部搜索挑一篇，它会在这里以标签页打开。
          </div>
        </div>
      </main>

      <nav v-if="toc.length" class="toc">
        <div class="toc-title">本页目录</div>
        <a
          v-for="t in toc"
          :key="t.id"
          href="#"
          :class="['lv' + t.level, { on: t.id === activeHeading }]"
          @click.prevent="scrollToHeading(t.id)"
          >{{ t.text }}</a
        >
      </nav>
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
.search {
  position: relative;
  width: 280px;
}
.results {
  position: absolute;
  z-index: 30;
  top: 34px;
  left: 0;
  right: 0;
  max-height: 60vh;
  overflow: auto;
  padding: 6px;
  background: var(--surface-1);
  border: 1px solid var(--border);
  border-radius: var(--r-md);
  box-shadow: 0 8px 24px rgba(15, 23, 42, 0.12);
}
.hit {
  display: block;
  width: 100%;
  text-align: left;
  border: 0;
  background: transparent;
  border-radius: var(--r-sm);
  padding: 6px 8px;
  cursor: pointer;
  color: var(--text-2);
}
.hit:hover {
  background: var(--primary-soft);
}
.hit-t {
  display: flex;
  align-items: baseline;
  gap: 6px;
  font-size: 13px;
  font-weight: 600;
  color: var(--text-1);
}
.hit-t em {
  font: 11px/1 var(--font-mono);
  color: var(--primary);
  font-style: normal;
}
.hit-s {
  display: block;
  font-size: 12px;
  color: var(--text-3);
  margin-top: 2px;
  line-height: 1.5;
}
.hit-s :deep(mark) {
  background: var(--warning-soft);
  color: var(--warning);
  border-radius: 2px;
}
.hit-empty {
  margin: 0;
  padding: 12px;
  text-align: center;
  font-size: 13px;
  color: var(--text-3);
}
.spacer {
  flex: 1;
}
.stat {
  font: 12px/1 var(--font-mono);
  color: var(--text-3);
}
.theme-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  flex-shrink: 0;
  border: 1px solid var(--border);
  border-radius: var(--r-md);
  background: var(--surface-2);
  color: var(--text-2);
  cursor: pointer;
  transition: color 0.15s ease, border-color 0.15s ease, background 0.15s ease;
}
.theme-btn:hover {
  color: var(--primary);
  border-color: var(--primary);
  background: var(--primary-soft);
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

/* 目录 */
.sidebar {
  width: 232px;
  flex-shrink: 0;
  overflow: auto;
  padding: 10px 8px 24px;
  border-right: 1px solid var(--border);
  background: var(--surface-2);
}
.grp {
  margin-bottom: 8px;
}
.grp-head {
  display: flex;
  align-items: center;
  gap: 7px;
  padding: 5px 8px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.06em;
  color: var(--text-3);
}
.grp-num {
  font: 700 11px/1 var(--font-mono);
  color: var(--primary);
}
.leaf {
  display: block;
  width: 100%;
  text-align: left;
  border: 0;
  background: transparent;
  color: var(--text-2);
  font-size: 13px;
  line-height: 1.45;
  padding: 5px 8px 5px 24px;
  border-radius: var(--r-sm);
  cursor: pointer;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.leaf:hover {
  background: var(--surface-1);
  color: var(--text-1);
}
.leaf.on {
  background: var(--primary-soft);
  color: var(--primary);
  font-weight: 600;
}

/* 标签条 + 正文 */
.main {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
}
.tabbar {
  display: flex;
  align-items: stretch;
  gap: 3px;
  padding: 5px 8px 0;
  overflow-x: auto;
  border-bottom: 1px solid var(--border);
  background: var(--surface-2);
}
.tab {
  display: flex;
  align-items: center;
  gap: 7px;
  max-width: 240px;
  flex-shrink: 0;
  padding: 5px 8px 6px 10px;
  border: 1px solid var(--border);
  border-bottom: 0;
  border-radius: var(--r-sm) var(--r-sm) 0 0;
  background: var(--surface-1);
  color: var(--text-2);
  font-size: 13px;
  cursor: pointer;
}
.tab.on {
  background: var(--surface-1);
  color: var(--text-1);
  font-weight: 600;
  box-shadow: inset 0 2px 0 var(--primary);
}
.tab-num {
  font: 700 10px/1 var(--font-mono);
  color: var(--primary);
}
.tab-t {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.tab-x {
  border: 0;
  background: transparent;
  color: var(--text-3);
  cursor: pointer;
  font-size: 14px;
  line-height: 1;
  padding: 0 2px;
  border-radius: 4px;
}
.tab-x:hover {
  background: var(--surface-3);
  color: var(--error);
}
.doc-wrap {
  flex: 1;
  min-height: 0;
  overflow: auto;
  padding: 22px 28px 120px;
}
.doc {
  max-width: 780px;
  margin: 0 auto;
}
.meta-bar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 6px;
  padding-bottom: 14px;
  margin-bottom: 16px;
  border-bottom: 1px solid var(--border);
}
.chip {
  font: 11px/1 var(--font-mono);
  padding: 4px 7px;
  border-radius: var(--r-xs);
  background: var(--surface-2);
  color: var(--text-2);
  border: 1px solid var(--border);
}
.chip.type {
  background: var(--primary-soft);
  color: var(--primary);
  border-color: transparent;
}
.chip.ok {
  background: var(--success-soft);
  color: var(--success);
  border-color: transparent;
}
.chip.warn {
  background: var(--warning-soft);
  color: var(--warning);
  border-color: transparent;
}
.crumb {
  margin-left: auto;
  font: 11px/1 var(--font-mono);
  color: var(--text-3);
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

/* 目录（右侧） */
.toc {
  width: 200px;
  flex-shrink: 0;
  border-left: 1px solid var(--border);
  background: var(--surface-2);
  overflow: auto;
  padding: 16px 10px;
}
.toc-title {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.06em;
  color: var(--text-3);
  padding: 0 8px 8px;
}
.toc a {
  display: block;
  font-size: 12.5px;
  color: var(--text-2);
  text-decoration: none;
  padding: 4px 8px;
  border-left: 2px solid transparent;
  border-radius: 0 var(--r-xs) var(--r-xs) 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.toc a:hover {
  color: var(--text-1);
  background: var(--surface-1);
}
.toc a.on {
  color: var(--primary);
  border-left-color: var(--primary);
  font-weight: 600;
}
.toc a.lv3 {
  padding-left: 18px;
  font-size: 12px;
}

@media (max-width: 1180px) {
  .toc {
    display: none;
  }
}
@media (max-width: 860px) {
  .sidebar {
    width: 168px;
  }
  .doc-wrap {
    padding: 16px;
  }
}
</style>

<style scoped>
/* markdown 排版（v-html 内容，需 :deep） */
.markdown {
  font-size: 16px;
  line-height: 1.75;
  color: var(--text-1);
}
.markdown :deep(h1) {
  font-size: 24px;
  font-weight: 700;
  letter-spacing: -0.01em;
  margin: 0 0 14px;
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

/* 代码块 */
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
.markdown :deep(.copy-btn:hover) {
  color: var(--primary);
  border-color: var(--primary);
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
.markdown :deep(.tok-c) {
  color: var(--text-3);
  font-style: italic;
}
.markdown :deep(.tok-s) {
  color: var(--success);
}
.markdown :deep(.tok-k) {
  color: var(--primary);
  font-weight: 600;
}
.markdown :deep(.tok-n) {
  color: var(--warning);
}

/* 双链 */
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
