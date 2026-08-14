<script setup lang="ts">
const jsonToolUrl = 'https://www.json.cn/json/json';
</script>

<template>
  <div class="page">
    <div class="page-head">
      <div>
        <h2>JSON 格式化</h2>
        <p>第三方在线工具（JSON.cn），支持格式化、压缩、校验、转义等。如加载异常，请检查网络或浏览器是否拦截了跨站嵌入。</p>
      </div>
    </div>

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
