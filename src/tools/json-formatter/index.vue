<script setup lang="ts">
import { ref } from 'vue';
import { NAlert, NButton, useMessage } from 'naive-ui';

const message = useMessage();
const input = ref('');
const output = ref('');
const error = ref('');
const jsonToolUrl = 'https://www.json.cn/';

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
      <div>
        <h2>JSON 格式化 / 校验</h2>
        <p>
          左侧自研：格式化、压缩、合法性校验；右侧嵌入 JSON.cn 在线工具，二者任选。
        </p>
      </div>
      <NButton
        size="small"
        tag="a"
        :href="jsonToolUrl"
        target="_blank"
        rel="noopener noreferrer"
      >
        在新窗口打开 JSON.cn ↗
      </NButton>
    </div>

    <div class="cols">
      <!-- 左：自研 JSON 工具 -->
      <section class="panel editor">
        <div class="ops">
          <NButton size="small" type="primary" @click="format">格式化</NButton>
          <NButton size="small" @click="minify">压缩</NButton>
          <NButton size="small" @click="validate">校验</NButton>
          <NButton size="small" @click="copy">复制</NButton>
          <NButton size="small" quaternary @click="clearAll">清空</NButton>
        </div>

        <textarea
          v-model="input"
          class="io"
          spellcheck="false"
          placeholder="在此粘贴 JSON…"
        ></textarea>

        <NAlert v-if="error" type="error" :show-icon="true" style="margin-top: 8px">
          {{ error }}
        </NAlert>
        <textarea
          v-else
          v-model="output"
          class="io out"
          spellcheck="false"
          readonly
          placeholder="格式化 / 压缩结果将显示在这里…"
        ></textarea>
      </section>

      <!-- 右：第三方在线工具 -->
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
