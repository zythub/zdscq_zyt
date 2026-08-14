<script setup lang="ts">
import { NButton } from 'naive-ui';

const url = 'https://www.bestdt.com/formdeep/docs/responsive/function/basic-control/';
</script>

<template>
  <div class="page">
    <div class="page-head">
      <div>
        <h2>自定义表单在线文档</h2>
        <p>
          BestDT 响应式表单设计器 · 基础控件功能文档。下方为官方在线文档，若浏览器拦截嵌入，可点右侧「在新窗口打开 ↗」。
        </p>
      </div>
      <NButton
        size="small"
        tag="a"
        :href="url"
        target="_blank"
        rel="noopener noreferrer"
      >
        在新窗口打开 ↗
      </NButton>
    </div>

    <div class="frame-wrap">
      <iframe
        :src="url"
        referrerpolicy="no-referrer"
        title="自定义表单在线文档"
        loading="lazy"
      ></iframe>
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
.page-head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 12px;
  flex-shrink: 0;
}
.page-head h2 {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
}
.page-head p {
  margin: 6px 0 0;
  font-size: 13px;
  color: var(--text-3);
  line-height: 1.5;
  max-width: 760px;
}
.frame-wrap {
  flex: 1;
  min-height: 0;
  border: 1px solid var(--border);
  border-radius: var(--r-md);
  overflow: hidden;
  background: var(--surface-1);
}
.frame-wrap iframe {
  width: 100%;
  height: 100%;
  border: 0;
  display: block;
}
</style>
