<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { NButton } from 'naive-ui';
import type { ToolMeta } from '@/router';
import { EXTERNAL_TOOLS } from '@/stores/externalTools';

defineProps<{ isDark: boolean }>();
const emit = defineEmits<{ (e: 'toggle-theme'): void }>();

const router = useRouter();
const route = useRoute();

// 布局固定为「顶部菜单栏」一种（用户确认：不再提供左侧菜单 / 横竖切换）

/**
 * 站点访问人次（Vercount，不蒜子替代）。
 * 必须在 Vue 挂载之后再注入脚本：计数器执行时会扫描 #vercount_value_site_pv 元素，
 * 若在 index.html 里 defer 引入会先于 Vue 渲染执行而扫不到元素，永远不显示。
 * 注入一次即可（SPA 内路由切换不重新计数）。
 */
const VERCOUNT_SRC = 'https://events.vercount.one/js';
function loadVisitCounter(): void {
  const w = window as unknown as { __vercountLoaded?: boolean };
  if (w.__vercountLoaded) return;
  w.__vercountLoaded = true;
  // 清掉历史缓存计数：接口请求失败时脚本会回退显示 localStorage 里旧的
  // （曾出现过旧的域名级大数 63,724,565 被缓存），确保每次都取新值，失败则显示占位符
  try {
    localStorage.removeItem('visitorCountData');
  } catch {
    /* 忽略 */
  }
  const s = document.createElement('script');
  s.src = VERCOUNT_SRC;
  s.async = true;
  s.onerror = () => {
    w.__vercountLoaded = false; // 失败可重试
  };
  document.head.appendChild(s);
}
onMounted(loadVisitCounter);

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
  <!-- 固定顶部菜单布局（用户确认：不再提供左侧菜单 / 横竖切换） -->
  <div class="shell is-top">
    <!-- 顶部菜单栏：品牌 + 工具导航 -->
    <aside class="side">
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
          <span class="brand-sub">贝斯特效率提升工具 by：张义涛</span>
        </div>
      </div>

      <!-- 菜单控制已移除：布局固定顶部菜单，无需任何切换按钮 -->

      <nav class="nav">
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
        <span class="visits" title="站点累计访问人次">访问 <span id="vercount_value_site_pv" class="mono">–</span></span>
      </div>

      <!-- 深浅色切换：全站统一放在顶部菜单栏最右上角 -->
      <div class="top-right">
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
    </aside>

    <!-- 右侧：顶栏 + 内容区 -->
    <div class="main">
      <header v-if="!current?.hideTopbar" class="topbar">
        <div class="top-title">
          <h1>{{ current?.title ?? '开发效率提升工具集' }}</h1>
        </div>
        <!-- 深浅色已全局移至顶部菜单栏右上角，此处不再重复 -->
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
  flex-shrink: 0;
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
  white-space: nowrap;
}
.brand-sub {
  font-size: 11px;
  color: var(--text-3);
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
.side-foot .visits {
  display: inline-flex;
  align-items: center;
  gap: 4px;
}
.side-foot .visits .mono {
  font-variant-numeric: tabular-nums;
  min-width: 1.5em;
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
  flex: 1 1 0;
  min-width: 0;
  align-items: center;
  gap: 4px;
  overflow-x: auto;
  overflow-y: hidden;
}
.shell.is-top .side-foot {
  display: flex;
  order: 4;
  flex-direction: row;
  align-items: center;
  gap: 8px;
  margin-left: auto;
  padding: 0 2px;
  border-top: none;
  white-space: nowrap;
  flex-shrink: 0;
}
.shell.is-top .nav-item {
  flex-shrink: 0;
}
/* 深浅色切换：顶部菜单栏最右上角 */
.shell.is-top .top-right {
  order: 5;
  flex-shrink: 0;
  display: flex;
  align-items: center;
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
.top-title {
  min-width: 0;
  display: flex;
  align-items: center;
}
.top-title h1 {
  font-size: 17px;
  font-weight: 600;
  margin: 0;
  line-height: 1.2;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
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
