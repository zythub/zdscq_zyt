<script setup lang="ts">
interface ToolItem {
  name: string;
  /** 外链地址（新标签打开） */
  url?: string;
  /** 站内路由（新标签打开） */
  to?: string;
  /** 卡片第二行小字：外链写网址，站内写说明 */
  hint: string;
}

// 「开发手册」是站内工具，入口收在这里（顶部菜单不放，避免菜单项过长）；
// 第三方站点都带 X-Frame-Options，禁止跨站 iframe 嵌入，故以卡片形式跳新标签。
// 两类统一在新标签打开，体验一致。
// 注意：这里不要 import 手册的 notes —— 笔记原文约 120KB，
// 打进主包会拖慢其它工具首屏（手册页本身是懒加载的）。
const tools: ToolItem[] = [
  {
    name: '开发手册',
    to: '/handbook',
    hint: '新标签打开 · bestdt 低代码平台二次开发手册',
  },
  {
    name: '贝斯特自定义表单文档',
    url: 'https://www.bestdt.com/formdeep/docs/responsive/function/basic-control/',
    hint: 'https://www.bestdt.com/formdeep/docs/',
  },
  {
    name: 'JSON格式化',
    url: 'https://www.json.cn/',
    hint: 'https://www.json.cn/',
  },
  {
    name: '123apps 在线工具',
    url: 'https://123apps.com/cn/',
    hint: 'https://123apps.com/cn/',
  },
  {
    name: 'PDF.io',
    url: 'https://pdf.io/cn/merge/',
    hint: 'https://pdf.io/cn/merge/',
  },
];

function open(t: ToolItem): void {
  const base = import.meta.env.BASE_URL; // 部署子路径，如 /zdscq_zyt/
  if (t.to) {
    // 站内工具（开发手册）同样在新标签打开：base + hash 路由拼出完整站内地址
    window.open(base + '#' + t.to, '_blank', 'noopener,noreferrer');
    return;
  }
  if (t.url) window.open(t.url, '_blank', 'noopener,noreferrer');
}
</script>

<template>
  <div class="page">
 

    <div class="grid">
      <button
        v-for="t in tools"
        :key="t.name"
        type="button"
        class="card"
        :class="{ 'is-internal': !!t.to }"
        @click="open(t)"
      >
        <span class="card-top">
          <span class="name">{{ t.name }}</span>
          <span class="arrow" aria-hidden="true">↗</span>
        </span>
        <span class="url">{{ t.hint }}</span>
      </button>
    </div>
  </div>
</template>

<style scoped>
.page {
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 0;
  padding: 4px;
}
.head {
  margin-bottom: 16px;
  flex-shrink: 0;
}
.head h2 {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: var(--text-1);
}
.head p {
  margin: 6px 0 0;
  font-size: 13px;
  color: var(--text-3);
  line-height: 1.5;
}
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 12px;
  align-content: start;
  overflow: auto;
  min-height: 0;
}
.card {
  display: flex;
  flex-direction: column;
  gap: 8px;
  text-align: left;
  padding: 16px;
  border: 1px solid var(--border);
  border-radius: var(--r-md);
  background: var(--surface-2);
  color: inherit;
  cursor: pointer;
  font: inherit;
  transition: border-color 0.15s ease, transform 0.05s ease, background 0.15s ease;
}
.card:hover {
  border-color: var(--primary);
  background: var(--surface-1);
}
.card:active {
  transform: translateY(1px);
}
/* 站内工具（开发手册）：与外部站点区分，用主色描边 + 右箭头 */
.card.is-internal {
  border-color: color-mix(in srgb, var(--primary) 40%, transparent);
  background: var(--primary-soft);
}
.card-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.name {
  font-size: 15px;
  font-weight: 600;
  color: var(--text-1);
}
.arrow {
  font-size: 15px;
  color: var(--primary);
}
.url {
  font-family: var(--font-mono);
  font-size: 12px;
  color: var(--text-3);
  word-break: break-all;
}
</style>
