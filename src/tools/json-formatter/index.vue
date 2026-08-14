<script setup lang="ts">
import { ref } from 'vue';
import { NAlert, NButton, useMessage } from 'naive-ui';

const message = useMessage();
const input = ref('');
const output = ref('');
const error = ref('');
const jsonToolUrl = 'https://www.json.cn/jsononline/';

function reset(): void {
  error.value = '';
}
function format(): void {
  reset();
  if (!input.value.trim()) {
    message.warning('请输入 JSON');
    return;
  }
  try {
    const obj = JSON.parse(input.value);
    output.value = JSON.stringify(obj, null, 2);
    message.success('已格式化');
  } catch (e) {
    error.value = (e as Error).message;
  }
}
function minify(): void {
  reset();
  if (!input.value.trim()) {
    message.warning('请输入 JSON');
    return;
  }
  try {
    const obj = JSON.parse(input.value);
    output.value = JSON.stringify(obj);
    message.success('已压缩');
  } catch (e) {
    error.value = (e as Error).message;
  }
}
function validate(): void {
  reset();
  if (!input.value.trim()) {
    message.warning('请输入 JSON');
    return;
  }
  try {
    JSON.parse(input.value);
    message.success('JSON 合法 ✓');
  } catch (e) {
    error.value = (e as Error).message;
    message.error('JSON 不合法');
  }
}
async function copy(): Promise<void> {
  if (!output.value) {
    message.warning('没有可复制的内容');
    return;
  }
  try {
    await navigator.clipboard.writeText(output.value);
    message.success('已复制');
  } catch {
    message.error('复制失败，请手动选择');
  }
}
function clearAll(): void {
  input.value = '';
  output.value = '';
  error.value = '';
}
</script>

<template>
  <div class="page">
    <div class="page-head">

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
.editor {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
}
.ops {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
  margin-bottom: 8px;
  flex-shrink: 0;
}
.io {
  flex: 1;
  min-height: 0;
  width: 100%;
  resize: none;
  padding: 10px 12px;
  font-family: var(--font-mono);
  font-size: 13px;
  line-height: 1.6;
  color: var(--text-1);
  background: var(--surface-2);
  border: 1px solid var(--border);
  border-radius: var(--r-sm);
  outline: none;
}
.io:focus {
  border-color: var(--primary);
}
.io.out {
  background: var(--surface-1);
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
