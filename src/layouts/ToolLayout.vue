<script setup lang="ts">
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { NButton } from 'naive-ui';
import type { ToolMeta } from '@/router';
import { EXTERNAL_TOOLS } from '@/stores/externalTools';

defineProps<{ isDark: boolean }>();
const emit = defineEmits<{ (e: 'toggle-theme'): void }>();

const router = useRouter();
const route = useRoute();

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
  <div class="shell">
    <!-- 侧边栏：工具导航 -->
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
          <span class="brand-sub">贝斯特效率提升工具</span>
        </div>
      </div>

      <nav class="nav">
        <template v-for="e in navEntries" :key="e.key">
          <router-link
            v-if="!e.external"
            :to="e.to!"
            class="nav-item"
            active-class="active"
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

    <!-- 右侧：顶栏 + 内容区 -->
    <div class="main">
      <header class="topbar">
        <div class="top-title">
          <h1>{{ current?.title ?? '开发效率提升工具集' }}</h1>
          <p v-if="current?.desc">{{ current.desc }}</p>
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
  position: absolute;
  inset: 0;
  display: flex;
  overflow: hidden;
}

/* ── 侧边栏 ── */
.side {
  width: 232px;
  flex-shrink: 0;
  background: var(--surface-1);
  border-right: 1px solid var(--border);
  display: flex;
  flex-direction: column;
  padding: 16px 12px;
  gap: 14px;
}
.brand {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 4px 6px 12px;
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

.nav {
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
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
