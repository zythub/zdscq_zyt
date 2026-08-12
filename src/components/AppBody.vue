<script setup lang="ts">
import { computed, ref, onBeforeUnmount } from 'vue';
import { NButton, NInput, NRadioButton, NRadioGroup, NTag, NTooltip, useMessage } from 'naive-ui';
import NodePanel from './NodePanel.vue';
import QuickAdd from './QuickAdd.vue';
import FieldTable from './FieldTable.vue';
import ConfigCenter from './ConfigCenter.vue';
import WordImport from './WordImport.vue';
import { fields, fullTableName, problemCount, session, setTableMode } from '@/stores/builder';
import { exportExcel } from '@/core/excel';
import type { TableMode } from '@/types';

defineProps<{ isDark: boolean }>();
const emit = defineEmits<{ (e: 'toggle-theme'): void }>();

const message = useMessage();
const showConfig = ref(false);
const showWordImport = ref(false);

const isSub = computed(() => session.tableMode === 'sub');

// ── 列宽可拖拽调整 ──
// 以「权重(百分比)」存储列宽；拖拽分隔条时在相邻两列间转移宽度，总和恒为 100%，
// 容器缩放时自动按比例重排。宽度按主表/子表分别记忆到 localStorage。
const bodyRef = ref<HTMLElement | null>(null);
const dragging = ref<number | null>(null);

const MAIN_DEFAULTS = [20, 25, 55];
const SUB_DEFAULTS = [32, 68];
const MIN_MAIN = [180, 220, 320]; // 节点 / 快速添加 / 字段表 的最小像素宽
const MIN_SUB = [220, 320]; // 快速添加 / 字段表
const KEY_MAIN = 'zdscq:colw:main';
const KEY_SUB = 'zdscq:colw:sub';

function loadWeights(key: string, fallback: number[]): number[] {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return [...fallback];
    const arr = JSON.parse(raw);
    if (
      Array.isArray(arr) &&
      arr.length === fallback.length &&
      arr.every((n) => typeof n === 'number' && isFinite(n) && n > 0)
    ) {
      return arr as number[];
    }
  } catch {
    /* 损坏则回退默认 */
  }
  return [...fallback];
}

const mainWeights = ref<number[]>(loadWeights(KEY_MAIN, MAIN_DEFAULTS));
const subWeights = ref<number[]>(loadWeights(KEY_SUB, SUB_DEFAULTS));

const activeWeights = computed<number[]>(() => (isSub.value ? subWeights.value : mainWeights.value));
const activeMin = computed<number[]>(() => (isSub.value ? MIN_SUB : MIN_MAIN));

function colStyle(i: number) {
  const w = activeWeights.value[i];
  const delay = isSub.value ? (i === 0 ? 40 : 180) : i === 0 ? 40 : i === 1 ? 110 : 180;
  return {
    flex: `${w} 1 0`,
    minWidth: `${activeMin.value[i]}px`,
    animationDelay: `${delay}ms`,
  };
}

const SPLITTER_W = 8;
let drag: { idx: number; startX: number; wA0: number; wB0: number; avail: number } | null = null;

function startDrag(idx: number, e: MouseEvent) {
  if (!bodyRef.value) return;
  e.preventDefault();
  const splitterCount = isSub.value ? 1 : 2;
  const avail = bodyRef.value.clientWidth - 24 /* 容器内边距 12*2 */ - splitterCount * SPLITTER_W;
  const w = activeWeights.value;
  drag = {
    idx,
    startX: e.clientX,
    wA0: (w[idx] / 100) * avail,
    wB0: (w[idx + 1] / 100) * avail,
    avail,
  };
  dragging.value = idx;
  document.body.style.userSelect = 'none';
  document.body.style.cursor = 'col-resize';
  window.addEventListener('mousemove', onMove);
  window.addEventListener('mouseup', onUp);
}

function onMove(e: MouseEvent) {
  if (!drag) return;
  const w = activeWeights.value;
  const minA = activeMin.value[drag.idx];
  const minB = activeMin.value[drag.idx + 1];
  let delta = e.clientX - drag.startX;
  const deltaMin = minA - drag.wA0; // 左列最多可缩小的量
  const deltaMax = drag.wB0 - minB; // 右列最多可缩小的量
  delta = Math.min(Math.max(delta, deltaMin), deltaMax);
  const newA = drag.wA0 + delta;
  const newB = drag.wB0 - delta;
  w[drag.idx] = (newA / drag.avail) * 100;
  w[drag.idx + 1] = (newB / drag.avail) * 100;
}

function onUp() {
  if (!drag) return;
  window.removeEventListener('mousemove', onMove);
  window.removeEventListener('mouseup', onUp);
  document.body.style.userSelect = '';
  document.body.style.cursor = '';
  dragging.value = null;
  const key = isSub.value ? KEY_SUB : KEY_MAIN;
  try {
    localStorage.setItem(key, JSON.stringify(activeWeights.value));
  } catch {
    /* 隐私模式等写入失败则忽略 */
  }
  drag = null;
}

onBeforeUnmount(() => {
  if (drag) onUp();
});

function onExport(): void {
  if (!fields.value.length) {
    message.warning('还没有任何字段，先勾选审批节点或添加自定义字段');
    return;
  }
  if (problemCount.value.errors > 0) {
    message.error(`有 ${problemCount.value.errors} 个字段存在错误，请先修正（表格中标红的行）`);
    return;
  }
  try {
    const name = exportExcel({
      tableName: fullTableName.value,
      tableChineseName: session.tableChineseName,
      dataLinkName: session.dataLinkName,
      tableComment: session.tableComment,
      fields: fields.value,
    });
    message.success(`已导出 ${name}`);
  } catch (e) {
    message.error(`导出失败：${(e as Error).message}`);
  }
}
</script>

<template>
  <div style="display: flex; flex-direction: column; height: 100%; min-height: 0">
    <!-- 顶栏 -->
    <header
      class="appbar"
      style="
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 0 16px;
        height: 56px;
        flex-shrink: 0;
        background: var(--surface-1);
        border-bottom: 1px solid var(--border);
      "
    >
      <span class="brand-mark" aria-hidden="true">
        <svg viewBox="0 0 24 24" width="15" height="15" fill="none">
          <ellipse cx="12" cy="6" rx="7" ry="3" fill="#fff" />
          <path d="M5 6v6c0 1.66 3.13 3 7 3s7-1.34 7-3V6" stroke="#fff" stroke-width="1.6" />
          <path d="M5 12v6c0 1.66 3.13 3 7 3s7-1.34 7-3v-6" stroke="#fff" stroke-width="1.6" />
        </svg>
      </span>

      <div style="display: flex; flex-direction: column; line-height: 1.15">
        <span style="font-size: 16px; font-weight: 600; letter-spacing: 0.01em">数据库字段定义生成器</span>
        <span style="font-size: 12px; color: var(--text-3)">审批流建表 · Excel 字段定义一键生成</span>
      </div>
      <NTag size="tiny" :bordered="false" style="margin-left: 2px">v2.0.0</NTag>

      <NRadioGroup
        :value="session.tableMode"
        size="small"
        style="margin-left: 10px"
        @update:value="(v: TableMode) => setTableMode(v)"
      >
        <NRadioButton value="main">主表</NRadioButton>
        <NRadioButton value="sub">子表</NRadioButton>
      </NRadioGroup>

      <div style="flex: 1"></div>

      <NButton size="small" quaternary @click="emit('toggle-theme')">
        {{ isDark ? '浅色' : '深色' }}
      </NButton>
      <NButton size="small" @click="showWordImport = true">
        <template #icon>
          <svg
            viewBox="0 0 24 24"
            width="14"
            height="14"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <path d="M14 2v6h6" />
            <path d="M12 18v-6" />
            <path d="M9 15h6" />
          </svg>
        </template>
        从 Word 导入
      </NButton>
      <NButton size="small" type="primary" @click="showConfig = true">
        <template #icon>
          <svg
            viewBox="0 0 24 24"
            width="14"
            height="14"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <circle cx="12" cy="12" r="3" />
            <path
              d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"
            />
          </svg>
        </template>
        配置中心
      </NButton>
    </header>

    <!-- 主体：列宽可拖拽调整。分隔条置于相邻两列之间，拖动时在两列间转移宽度 -->
    <div ref="bodyRef" class="body">
      <section v-if="!isSub" class="panel col rise-in" :style="colStyle(0)">
        <NodePanel />
      </section>
      <div
        v-if="!isSub"
        class="splitter"
        :class="{ active: dragging === 0 }"
        title="拖拽调整宽度"
        @mousedown="startDrag(0, $event)"
      ></div>

      <section class="panel col rise-in" :style="colStyle(isSub ? 0 : 1)">
        <QuickAdd />
      </section>
      <div
        class="splitter"
        :class="{ active: dragging === (isSub ? 0 : 1) }"
        title="拖拽调整宽度"
        @mousedown="startDrag(isSub ? 0 : 1, $event)"
      ></div>

      <section class="col rise-in" :style="colStyle(isSub ? 1 : 2)">
        <FieldTable />
      </section>
    </div>

    <!-- 底栏 -->
    <footer
      style="
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 10px 16px;
        background: var(--surface-1);
        border-top: 1px solid var(--border);
        flex-shrink: 0;
      "
    >
      <NInput
        v-model:value="session.tableChineseName"
        size="small"
        placeholder="表中文名，如：设备验收单"
        style="width: 220px"
        clearable
      />
      <NTooltip trigger="hover">
        <template #trigger>
          <NTag size="small" :bordered="false" class="mono">{{ fullTableName }}</NTag>
        </template>
        最终写入 Excel「表名称」sheet 的表名，前缀可在配置中心修改
      </NTooltip>

      <NInput
        v-model:value="session.dataLinkName"
        size="small"
        placeholder="数据链接名称"
        style="width: 150px"
      />
      <NInput
        v-model:value="session.tableComment"
        size="small"
        placeholder="表备注"
        style="width: 150px"
      />

      <div style="flex: 1"></div>

      <NTag v-if="problemCount.errors" size="small" type="error" :bordered="false">
        {{ problemCount.errors }} 个错误
      </NTag>
      <NTag v-else-if="problemCount.warns" size="small" type="warning" :bordered="false">
        {{ problemCount.warns }} 个提示
      </NTag>
      <span class="muted" style="font-size: 14px">共 {{ fields.length }} 个字段</span>

      <NButton type="primary" size="small" :disabled="!fields.length" @click="onExport">
        导出 Excel
      </NButton>
    </footer>

    <ConfigCenter v-model:show="showConfig" />
    <WordImport v-model:show="showWordImport" />
  </div>
</template>

<style scoped>
.appbar {
  position: relative;
}

/* 主体：弹性三/两栏，列宽由 flex 权重驱动，可在分隔条处手动拖拽 */
.body {
  flex: 1;
  display: flex;
  align-items: stretch;
  gap: 0;
  padding: 12px;
  min-height: 0;
}
.col {
  min-width: 0;
  min-height: 0;
  display: flex;
  flex-direction: column;
}

/* 分隔条：细线指示，悬停/拖拽时高亮为强调色；两侧留 3px 隐形热区便于抓取 */
.splitter {
  flex: 0 0 8px;
  align-self: stretch;
  position: relative;
  cursor: col-resize;
  background: transparent;
  touch-action: none;
}
.splitter::before {
  content: '';
  position: absolute;
  inset: 0 -3px;
}
.splitter::after {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  left: 50%;
  width: 2px;
  transform: translateX(-50%);
  background: var(--border);
  transition: background var(--dur-fast) var(--ease-out-quart),
    width var(--dur-fast) var(--ease-out-quart);
}
.splitter:hover::after,
.splitter.active::after {
  background: var(--primary);
  width: 3px;
}
/* 顶栏底部一条强调短线，建立品牌记忆点（仅浅色明显） */
.appbar::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: -1px;
  width: 64px;
  height: 2px;
  background: linear-gradient(90deg, var(--primary), transparent);
  animation: accent-sweep var(--dur-slow) var(--ease-out-expo) both;
}
:global(.dark) .appbar::after {
  background: linear-gradient(90deg, var(--primary), transparent);
}

.brand-mark {
  width: 28px;
  height: 28px;
  border-radius: 8px;
  background: linear-gradient(140deg, var(--accent-400), var(--accent-600));
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-shadow: var(--shadow-1);
  flex-shrink: 0;
}
</style>
