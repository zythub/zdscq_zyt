<script setup lang="ts">
import { computed, inject, ref, onBeforeUnmount } from 'vue';
import {
  NButton,
  NInput,
  NRadioButton,
  NRadioGroup,
  NSelect,
  NTag,
  useMessage,
} from 'naive-ui';
import NodePanel from './components/NodePanel.vue';
import QuickAdd from './components/QuickAdd.vue';
import FieldTable from './components/FieldTable.vue';
import { fields, fullTableName, problemCount, session, setTableMode } from '@/stores/builder';
import { presetOptions, setVersion, version } from '@/stores/config';
import { exportExcel } from '@/core/excel';
import type { TableMode } from '@/types';

const message = useMessage();

/** 顶栏在字段生成器里被隐藏（用户要求：菜单下方直接就是内容），
 *  主题切换改由 ToolLayout 通过 provide 下发，在这里的工具条上呈现 */
const theme = inject<{ isDark: { value: boolean }; toggle: () => void } | undefined>(
  'theme',
  undefined
);

const isSub = computed(() => session.tableMode === 'sub');

// ── 列宽可拖拽调整 ──
// 以「权重(百分比)」存储列宽；拖拽分隔条时在相邻两列间转移宽度，总和恒为 100%，
// 容器缩放时自动按比例重排。宽度按主表/子表分别记忆到 localStorage。
const bodyRef = ref<HTMLElement | null>(null);
const dragging = ref<number | null>(null);

// 主表三栏：审批节点 / 快速添加 / 字段表；子表两栏：快速添加 / 字段表
const MAIN_DEFAULTS = [24, 16, 60];
const SUB_DEFAULTS = [32, 68];
const MIN_MAIN = [200, 160, 340]; // 节点 / 快速添加 / 字段表 的最小像素宽
const MIN_SUB = [220, 320]; // 快速添加 / 字段表
const KEY_MAIN = 'zdscq:colw:main:v2';
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
  <div style="display: flex; flex-direction: column; flex: 1; min-height: 0; overflow: hidden">
    <!-- 工具条：版本 / 主表·子表 / 深浅色 集中在一行（模板在 baseline.ts 维护） -->
    <div
      class="toolbar"
      style="
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 8px 4px;
        flex-shrink: 0;
        flex-wrap: wrap;
      "
    >
      <NRadioGroup
        :value="session.tableMode"
        size="small"
        @update:value="(v: TableMode) => setTableMode(v)"
      >
        <NRadioButton value="main">主表</NRadioButton>
        <NRadioButton value="sub">子表</NRadioButton>
      </NRadioGroup>

      <NSelect
        :value="version"
        :options="presetOptions"
        size="small"
        style="width: 130px"
        :consistent-menu-width="false"
        @update:value="(v: string) => setVersion(v)"
      />

      <div style="flex: 1"></div>

      <NButton
        v-if="theme"
        size="small"
        quaternary
        @click="theme.toggle()"
      >
        {{ theme.isDark.value ? '浅色' : '深色' }}
      </NButton>
    </div>

    <!-- 主体：三栏。审批节点 | 快速添加字段 | 字段定义表，列宽可拖拽 -->
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

    <!-- 底栏：表中文名 + 自动英文表名 + 错误统计 + 导出 -->
    <footer
      style="
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        gap: 10px;
        padding: 10px 4px;
        flex-shrink: 0;
      "
    >
      <NInput
        v-model:value="session.tableChineseName"
        size="small"
        placeholder="请输入表名（中文）"
        style="width: 200px"
        clearable
      />
      <NInput
        :value="fullTableName"
        size="small"
        placeholder="表名自动生成"
        style="width: 240px"
        :disabled="true"
        class="mono"
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
  </div>
</template>

<style scoped>
/* 主体：弹性三/两栏，列宽由 flex 权重驱动，可在分隔条处手动拖拽 */
.body {
  flex: 1;
  display: flex;
  align-items: stretch;
  gap: 0;
  padding: 4px;
  min-height: 0;
  overflow: hidden;
}

/* 表信息条提示文字（置于底部 footer 内） */
.info-hint {
  font-size: 12px;
  color: var(--text-3);
}
.col {
  min-width: 0;
  min-height: 0;
  display: flex;
  flex-direction: column;
  overflow: hidden;
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
</style>
