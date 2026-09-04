<script setup lang="ts">
import { computed, provide, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { NButton } from 'naive-ui';
import type { ToolMeta } from '@/router';
import { EXTERNAL_TOOLS } from '@/stores/externalTools';

const props = defineProps<{ isDark: boolean }>();
const emit = defineEmits<{ (e: 'toggle-theme'): void }>();

/**
 * 顶栏可被单个工具隐藏（hideTopbar），但主题切换仍需可用，
 * 故把切换能力 provide 下去，由工具页自己在工具条上呈现。
 */
provide('theme', {
  isDark: computed(() => props.isDark),
  toggle: () => emit('toggle-theme'),
});

const router = useRouter();
const route = useRoute();

// ── 布局偏好（持久化到 localStorage，刷新后仍记住）──
type Layout = 'side' | 'top';
const LAYOUT_KEY = 'effkit.layout';
const COLLAPSE_KEY = 'effkit.sidebar.collapsed';
const WIDTH_KEY = 'effkit.sidebar.width';

function readStore(k: string, fallback: string): string {
  try {
    const v = localStorage.getItem(k);
    return v === null ? fallback : v;
  } catch {
    return fallback;
  }
}
function writeStore(k: string, v: string): void {
  try {
    localStorage.setItem(k, v);
  } catch {
    /* 忽略（隐私模式等） */
  }
}

const layout = ref<Layout>((readStore(LAYOUT_KEY, 'side') as Layout) || 'side');
const collapsed = ref<boolean>(readStore(COLLAPSE_KEY, 'false') === 'true');
const sideWidth = ref<number>(Number(readStore(WIDTH_KEY, '232')) || 232);

function toggleLayout(): void {
  layout.value = layout.value === 'side' ? 'top' : 'side';
  writeStore(LAYOUT_KEY, layout.value);
}
function toggleCollapse(): void {
  collapsed.value = !collapsed.value;
  writeStore(COLLAPSE_KEY, String(collapsed.value));
}
function persistWidth(): void {
  writeStore(WIDTH_KEY, String(sideWidth.value));
}

// 拖动调整侧栏宽度（仅「左侧菜单」布局且未收起时生效）
function startResize(e: PointerEvent): void {
  if (layout.value !== 'side' || collapsed.value) return;
  e.preventDefault();
  const startX = e.clientX;
  const startW = sideWidth.value;
  const onMove = (ev: PointerEvent) => {
    const next = Math.max(180, Math.min(460, Math.round(startW + (ev.clientX - startX))));
    sideWidth.value = next;
  };
  const onUp = () => {
    document.removeEventListener('pointermove', onMove);
    document.removeEventListener('pointerup', onUp);
    document.body.style.cursor = '';
    document.body.style.userSelect = '';
    persistWidth();
  };
  document.addEventListener('pointermove', onMove);
  document.addEventListener('pointerup', onUp);
  document.body.style.cursor = 'col-resize';
  document.body.style.userSelect = 'none';
}

// 侧栏内联宽度（仅左侧布局生效；收起时固定为图标轨道宽度）
const sideStyle = computed(() => {
  if (layout.value !== 'side') return {};
  return { width: (collapsed.value ? 56 : sideWidth.value) + 'px' };
});

// 收起按钮图标：随布局/状态变化（左栏用左右箭头，顶部用上下箭头）
const collapseIcon = computed(() => {
  if (layout.value === 'side') {
    return collapsed.value ? 'M9 6l6 6-6 6' : 'M15 6l-6 6 6 6';
  }
  return collapsed.value ? 'M6 15l6-6 6 6' : 'M6 9l6 6 6-6';
});
// 布局切换按钮图标：当前在左栏则显示"顶部"图标，反之亦然
const layoutIcon = computed(() =>
  layout.value === 'side' ? 'M3 4h18v16H3zM3 9h18' : 'M3 4h18v16H3zM9 4v16',
);

interface NavEntry {
  key: string;
  title: string;
  desc?: string;
  /** 内置工具：svg path；外链工具：emoji */
  icon: string;
  external: boolean;
  to?: string;
  url?: string;
}

// 内置工具：取所有带 meta.tool 的具名路由
const internalTools = computed<NavEntry[]>(() =>
  router
    .getRoutes()
    .filter((r) => r.name && (r.meta as { tool?: ToolMeta } | undefined)?.tool)
    .map((r) => {
      const tool = (r.meta as { tool: ToolMeta }).tool;
      return {
        key: String(r.name),
        title: tool.title,
        desc: tool.desc,
        icon: tool.icon,
        external: false,
        to: r.path,
      };
    }),
);

// 内置工具与外链工具平铺为同一个列表（不区分类型）
const navEntries = computed<NavEntry[]>(() => [
  ...internalTools.value,
  ...EXTERNAL_TOOLS.map((t) => ({
    key: t.id,
    title: t.name,
    desc: t.desc,
    icon: t.icon || '🔗',
    external: true,
    url: t.url,
  })),
]);

const current = computed<ToolMeta | undefined>(
  () => (route.meta as { tool?: ToolMeta } | undefined)?.tool,
);
</script>

<template>
  <div class="shell" :class="{ 'is-top': layout === 'top' }">
    <!-- 侧边栏 / 顶部栏：工具导航 -->
    <aside class="side" :class="{ collapsed }" :style="sideStyle">
      <div class="brand">
        <span class="brand-mark" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#fff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
            <ellipse cx="12" cy="6" rx="7" ry="3" fill="#fff" stroke="none" />
            <path d="M5 6v6c0 1.66 3.13 3 7 3s7-1.34 7-3V6" />
            <path d="M5 12v6c0 1.66 3.13 3 7 3s7-1.34 7-3v-6" />
          </svg>
        </span>
        <div class="brand-text">
          <span class="brand-name">开发效率提升工具集</span>
          <span class="brand-sub">贝斯特效率提升工具</span>
        </div>
      </div>

      <!-- 菜单控制：布局切换 + 收起（所有页面常驻，含铺满的嵌入页） -->
      <div class="side-tools">
        <button class="tool-btn" type="button" :title="layout === 'side' ? '切换为顶部菜单' : '切换为左侧菜单'" @click="toggleLayout">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
            <path :d="layoutIcon" />
          </svg>
        </button>
        <button class="tool-btn" type="button" :title="collapsed ? '展开菜单' : '收起菜单'" @click="toggleCollapse">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
            <path :d="collapseIcon" />
          </svg>
        </button>
      </div>

      <nav class="nav" v-show="!(layout === 'top' && collapsed)">
        <template v-for="e in navEntries" :key="e.key">
          <router-link
            v-if="!e.external"
            :to="e.to!"
            class="nav-item"
            active-class="active"
            :title="e.title"
          >
            <svg class="nav-ico" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
              <path :d="e.icon" />
            </svg>
            <span class="nav-label">{{ e.title }}</span>
          </router-link>
          <a
            v-else
            :href="e.url"
            target="_blank"
            rel="noopener noreferrer"
            class="nav-item ext"
            :title="e.title"
          >
            <span class="nav-ico ext-ico">{{ e.icon }}</span>
            <span class="nav-label">{{ e.title }}</span>
            <span class="ext-badge" aria-hidden="true">↗</span>
          </a>
        </template>
      </nav>

      <div class="side-foot">
        <span class="ver">v2.1.0</span>
      </div>
    </aside>

    <!-- 拖拽调整宽度（仅左侧布局且未收起时出现） -->
    <div
      v-if="layout === 'side' && !collapsed"
      class="resizer"
      title="拖动调整菜单宽度"
      @pointerdown="startResize"
    ></div>

    <!-- 右侧：顶栏 + 内容区 -->
    <div class="main">
      <header v-if="!current?.hideTopbar" class="topbar">
        <div class="top-title">
          <h1>{{ current?.title ?? '开发效率提升工具集' }}</h1>
        </div>
        <div class="top-actions">
          <NButton size="small" quaternary @click="emit('toggle-theme')">
            <template #icon>
              <svg v-if="isDark" viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
              </svg>
              <svg v-else viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
              </svg>
            </template>
            {{ isDark ? '浅色' : '深色' }}
          </NButton>
        </div>
      </header>

      <main class="content">
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </main>
    </div>
  </div>
</template>

<style scoped>
.shell {
  height: 100%;
  width: 100%;
  display: flex;
  overflow: hidden;
}
.shell.is-top {
  flex-direction: column;
}

/* ── 侧边栏 / 顶部栏 ── */
.side {
  width: 232px;
  flex-shrink: 0;
  background: var(--surface-1);
  border-right: 1px solid var(--border);
  display: flex;
  flex-direction: column;
  padding: 14px 12px;
  gap: 14px;
}
.brand {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 2px 6px 12px;
  border-bottom: 1px solid var(--border);
}
.brand-mark {
  width: 30px;
  height: 30px;
  border-radius: 8px;
  background: linear-gradient(140deg, var(--accent-400), var(--accent-600));
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-shadow: var(--shadow-1);
  flex-shrink: 0;
}
.brand-text {
  display: flex;
  flex-direction: column;
  line-height: 1.2;
  min-width: 0;
}
.brand-name {
  font-size: 15px;
  font-weight: 700;
  letter-spacing: 0.01em;
}
.brand-sub {
  font-size: 11px;
  color: var(--text-3);
}

/* 菜单控制按钮 */
.side-tools {
  display: flex;
  gap: 6px;
  flex-shrink: 0;
}
.tool-btn {
  width: 30px;
  height: 30px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--border);
  border-radius: var(--r-md, 8px);
  background: var(--surface-2);
  color: var(--text-2);
  cursor: pointer;
  flex-shrink: 0;
  transition: background var(--dur-fast) var(--ease-out-quart),
    color var(--dur-fast) var(--ease-out-quart),
    border-color var(--dur-fast) var(--ease-out-quart);
}
.tool-btn:hover {
  background: var(--primary-soft);
  color: var(--primary);
  border-color: color-mix(in srgb, var(--primary) 35%, transparent);
}

.nav {
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
  min-height: 0;
  overflow: auto;
}
.nav-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  border-radius: var(--r-md, 8px);
  color: var(--text-2);
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  transition: background var(--dur-fast) var(--ease-out-quart),
    color var(--dur-fast) var(--ease-out-quart);
  border: 1px solid transparent;
}
.nav-item:hover {
  background: var(--surface-2);
  color: var(--text-1);
}
.nav-item.active {
  background: var(--primary-soft);
  color: var(--primary);
  border-color: color-mix(in srgb, var(--primary) 35%, transparent);
  font-weight: 600;
}
.nav-ico {
  flex-shrink: 0;
}
.nav-label {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* 外链工具条目（新窗口打开） */
.nav-item.ext {
  color: var(--text-2);
}
.nav-item.ext:hover {
  background: var(--surface-2);
  color: var(--text-1);
}
.ext-ico {
  flex-shrink: 0;
  width: 18px;
  text-align: center;
  font-size: 13px;
  line-height: 1;
}
/* 外链标记：明确区分"会跳走"的条目，而非装饰 */
.ext-badge {
  margin-left: auto;
  font-size: 12px;
  color: var(--text-3);
  opacity: 0.7;
}
.nav-item.ext:hover .ext-badge {
  color: var(--primary);
  opacity: 1;
}

.side-foot {
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 10px 6px 0;
  border-top: 1px solid var(--border);
  font-size: 11px;
  color: var(--text-3);
}
.side-foot .ver {
  font-weight: 600;
  color: var(--text-2);
}

/* ── 顶部布局（菜单在上方）── */
.shell.is-top .side {
  width: 100%;
  flex-direction: row;
  align-items: center;
  border-right: none;
  border-bottom: 1px solid var(--border);
  height: 56px;
  padding: 0 14px;
  gap: 14px;
}
.shell.is-top .brand {
  order: 1;
  border-bottom: none;
  padding: 0;
}
.shell.is-top .nav {
  order: 2;
  flex-direction: row;
  flex: 1;
  align-items: center;
  gap: 4px;
  overflow-x: auto;
  overflow-y: hidden;
}
.shell.is-top .side-tools {
  order: 3;
}
.shell.is-top .side-foot {
  display: none;
}
.shell.is-top .nav-item {
  flex-shrink: 0;
}

/* ── 收起（左侧布局时为图标轨道）── */
.side.collapsed {
  padding-left: 8px;
  padding-right: 8px;
}
.side.collapsed .brand {
  justify-content: center;
  border-bottom: none;
  padding-bottom: 0;
}
.side.collapsed .brand-text,
.side.collapsed .nav-label,
.side.collapsed .ext-badge,
.side.collapsed .side-foot {
  display: none;
}
.side.collapsed .side-tools {
  flex-direction: column;
}
.side.collapsed .nav-item {
  justify-content: center;
  padding-left: 0;
  padding-right: 0;
}

/* ── 拖拽分隔条 ── */
.resizer {
  width: 5px;
  flex-shrink: 0;
  cursor: col-resize;
  position: relative;
  margin-left: -1px;
  background: transparent;
}
.resizer::after {
  content: '';
  position: absolute;
  left: 2px;
  top: 0;
  bottom: 0;
  width: 1px;
  background: var(--border);
}
.resizer:hover::after,
.resizer:active::after {
  background: var(--primary);
  width: 2px;
  left: 1.5px;
}

/* ── 右侧主区 ── */
.main {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
  min-height: 0;
}
.topbar {
  height: 60px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 0 20px;
  background: var(--surface-1);
  border-bottom: 1px solid var(--border);
}
.top-title h1 {
  font-size: 17px;
  font-weight: 600;
  margin: 0;
  line-height: 1.2;
}
.top-title p {
  margin: 2px 0 0;
  font-size: 12px;
  color: var(--text-3);
}
.top-actions {
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: 8px;
}
.content {
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
  overflow: auto;
  padding: 18px 20px;
}

/* 路由切换淡入 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity var(--dur-mid) var(--ease-out-quart),
    transform var(--dur-mid) var(--ease-out-quart);
}
.fade-enter-from {
  opacity: 0;
  transform: translateY(6px);
}
.fade-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}
</style>
