<script setup lang="ts">
interface ExtTool {
  name: string;
  url: string;
}

// 这些站点都带 X-Frame-Options，浏览器禁止跨站 iframe 嵌入，
// 故改为外链落地页，点击在新窗口打开。
const tools: ExtTool[] = [
  {
    name: '贝斯特自定义表单文档',
    url: 'https://www.bestdt.com/formdeep/docs/responsive/function/basic-control/',
  },
  {
    name: 'JSON格式化',
    url: 'https://www.json.cn/',
  },
  {
    name: '123apps 在线工具',
    url: 'https://123apps.com/cn/',
  },
  {
    name: 'PDF.io',
    url: 'https://pdf.io/cn/merge/',
  },

];

function open(url: string): void {
  window.open(url, '_blank', 'noopener,noreferrer');
}
</script>

<template>
  <div class="page">
 

    <div class="grid">
      <button
        v-for="t in tools"
        :key="t.url"
        type="button"
        class="card"
        @click="open(t.url)"
      >
        <span class="card-top">
          <span class="name">{{ t.name }}</span>
          <span class="arrow" aria-hidden="true">↗</span>
        </span>
        <span class="url">{{ t.url }}</span>
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
