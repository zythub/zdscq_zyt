<script setup lang="ts">
interface ToolItem {
  name: string;
  /** 外链地址（新标签打开） */
  url?: string;
  /** 站内路由（新标签打开） */
  to?: string;
  /** 卡片第二行小字：外链写网址，站内写说明 */
  hint: string;
  /** 一句话说明：卡片第三行 */
  desc?: string;
  /** 站内工具（主色描边 + 右箭头），与第三方站点区分 */
  internal?: boolean;
}

/**
 * 工具箱 = 全站工具集合页。
 *
 * 站内工具（4 个开发工具 + 开发手册）统一收在这里，顶栏只留常用几个，
 * 避免菜单过长；第三方站点都带 X-Frame-Options，禁止跨站 iframe 嵌入，
 * 只能以卡片形式跳新标签。两类统一在新标签打开，体验一致。
 *
 * 注意：这里不要 import 手册的 notes —— 笔记原文约 120KB，
 * 打进主包会拖慢其它工具首屏（手册页本身是懒加载的）。
 */
const tools: ToolItem[] = [
  {
    name: '开发手册',
    to: '/handbook',
    hint: '新标签打开 · bestdt 低代码平台二次开发手册',
    desc: '表单事件代码、子表操作、平台扩展、踩坑与现场速查',
    internal: true,
  },
  {
    name: '字段生成器',
    to: '/field-generator',
    hint: '新标签打开 · 审批流建表',
    desc: 'Excel 字段定义一键生成建表 SQL',
    internal: true,
  },
  {
    name: '书签生成表单',
    to: '/bookmark-form',
    hint: '新标签打开 · Word 书签提取',
    desc: '提取 Word 书签 → 复用编号规则 → 设计器 JSON',
    internal: true,
  },
  {
    name: '自定义表单代码示例',
    to: '/form-code',
    hint: '新标签打开 · 响应式表单代码',
    desc: 'BestDT 响应式表单代码示例，在线查看 / 编辑 / 下载',
    internal: true,
  },
  {
    name: '新增字段 SQL',
    to: '/field-sql',
    hint: '新标签打开 · dy_table_field',
    desc: '批量生成字段插入 / 改表 / 注释 SQL',
    internal: true,
  },
  {
    name: '贝斯特自定义表单文档',
    url: 'https://www.bestdt.com/formdeep/docs/responsive/function/basic-control/',
    hint: 'https://www.bestdt.com/formdeep/docs/',
    desc: '官方控件文档：基础控件、数据源、事件',
  },
  {
    name: 'JSON格式化',
    url: 'https://www.json.cn/',
    hint: 'https://www.json.cn/',
    desc: 'JSON 格式化 / 校验 / 转义',
  },
  {
    name: '123apps 在线工具',
    url: 'https://123apps.com/cn/',
    hint: 'https://123apps.com/cn/',
    desc: '图片、文档、PDF 等一堆在线小工具',
  },
  {
    name: 'PDF.io',
    url: 'https://pdf.io/cn/merge/',
    hint: 'https://pdf.io/cn/merge/',
    desc: 'PDF 合并、拆分、压缩、转换',
  },
];

function open(t: ToolItem): void {
  const base = import.meta.env.BASE_URL; // 部署子路径，如 /zdscq_zyt/
  if (t.to) {
    // 站内工具同样在新标签打开：base + hash 路由拼出完整站内地址
    window.open(base + '#' + t.to, '_blank', 'noopener,noreferrer');
    return;
  }
  if (t.url) window.open(t.url, '_blank', 'noopener,noreferrer');
}

const internalCount = tools.filter((t) => t.internal).length;
const externalCount = tools.length - internalCount;
</script>

<template>
  <div class="page">
    <div class="head">
      <h2>工具箱</h2>
      <p>站内开发工具与常用第三方站点，全部收在这里，点击新标签打开。开发手册查 API，工具做活儿，第三方站点处理杂事。</p>
      <div class="counts">
        <span class="cnt"><b>{{ internalCount }}</b> 个站内工具</span>
        <span class="cnt"><b>{{ externalCount }}</b> 个第三方站点</span>
      </div>
    </div>

    <div class="grid">
      <button
        v-for="t in tools"
        :key="t.name"
        type="button"
        class="card"
        :class="{ 'is-internal': !!t.internal }"
        @click="open(t)"
      >
        <span class="card-top">
          <span class="name">{{ t.name }}</span>
          <span class="arrow" aria-hidden="true">↗</span>
        </span>
        <span v-if="t.desc" class="desc">{{ t.desc }}</span>
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
/* 集合页规模统计 */
.counts {
  display: flex;
  gap: 18px;
  margin-top: 12px;
}
.cnt {
  font-size: 12px;
  color: var(--text-3);
}
.cnt b {
  font-family: var(--font-mono);
  font-size: 18px;
  font-weight: 700;
  color: var(--primary);
  margin-right: 4px;
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
/* 卡片第三行：一句话说明 */
.desc {
  font-size: 13px;
  color: var(--text-2);
  line-height: 1.5;
}
</style>
