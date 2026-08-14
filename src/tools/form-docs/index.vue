<script setup lang="ts">
const url =
  "https://www.bestdt.com/formdeep/docs/responsive/function/basic-control/";
</script>

<template>
  <div class="page">
    <div class="bar"></div>
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
.bar {
  display: flex;
  justify-content: flex-end;
  flex-shrink: 0;
  margin-bottom: 8px;
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
