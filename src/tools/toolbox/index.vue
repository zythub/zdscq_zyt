<script setup lang="ts">
const url = "https://pdf.io/cn/merge/";
</script>

<template>
  <div class="page">
    <div class="bar"></div>

    <div class="frame-wrap">
      <iframe
        :src="url"
        referrerpolicy="no-referrer"
        title="工具箱"
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
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 8px;
  flex-shrink: 0;
}
.hint {
  font-size: 13px;
  color: var(--text-3);
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
