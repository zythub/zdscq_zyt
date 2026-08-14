<script setup lang="ts">
const jsonToolUrl = "https://www.json.cn/jsononline/";
</script>

<template>
  <div class="page">
    <div class="cols">
      <section class="frame-col">
        <iframe
          :src="jsonToolUrl"
          referrerpolicy="no-referrer"
          title="JSON.cn 在线工具"
          loading="lazy"
        ></iframe>
      </section>
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
.cols {
  flex: 1;
  min-height: 0;
  display: flex;
  gap: 12px;
}
.frame-col {
  flex: 1;
  min-width: 0;
  border: 1px solid var(--border);
  border-radius: var(--r-md);
  overflow: hidden;
  background: var(--surface-1);
}
.frame-col iframe {
  width: 100%;
  height: 100%;
  border: 0;
  display: block;
}
</style>
