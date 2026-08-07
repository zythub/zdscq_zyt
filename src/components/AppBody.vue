<script setup lang="ts">
import { computed, ref } from 'vue';
import { NButton, NInput, NRadioButton, NRadioGroup, NTag, NTooltip, useMessage } from 'naive-ui';
import NodePanel from './NodePanel.vue';
import QuickAdd from './QuickAdd.vue';
import FieldTable from './FieldTable.vue';
import ConfigCenter from './ConfigCenter.vue';
import { fields, fullTableName, problemCount, session, setTableMode } from '@/stores/builder';
import { exportExcel } from '@/core/excel';
import type { TableMode } from '@/types';

defineProps<{ isDark: boolean }>();
const emit = defineEmits<{ (e: 'toggle-theme'): void }>();

const message = useMessage();
const showConfig = ref(false);

const isSub = computed(() => session.tableMode === 'sub');

// 主表三列：节点 20% / 快速添加 25% / 字段表 55%
// 子表无审批节点，隐藏左栏并把空间让给快速添加与字段表，整页更宽
const gridStyle = computed(() =>
  isSub.value
    ? { gridTemplateColumns: 'minmax(260px, 32%) minmax(0, 68%)' }
    : { gridTemplateColumns: 'minmax(180px, 20%) minmax(220px, 25%) minmax(0, 55%)' },
);

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
        <span style="font-size: 15px; font-weight: 600; letter-spacing: 0.01em">数据库字段定义生成器</span>
        <span style="font-size: 11px; color: var(--text-3)">审批流建表 · Excel 字段定义一键生成</span>
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

    <!-- 主体：主表三列 / 子表两列（隐藏节点栏，空间让给快速添加） -->
    <div
      style="
        flex: 1;
        display: grid;
        gap: 12px;
        padding: 12px;
        min-height: 0;
      "
      :style="gridStyle"
    >
      <section v-if="!isSub" class="panel rise-in" style="animation-delay: 40ms">
        <NodePanel />
      </section>

      <section
        class="panel rise-in"
        :style="{ animationDelay: isSub ? '40ms' : '110ms' }"
      >
        <QuickAdd />
      </section>

      <section class="rise-in" style="min-width: 0; display: flex; flex-direction: column; min-height: 0; animation-delay: 180ms">
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
      <span class="muted" style="font-size: 13px">共 {{ fields.length }} 个字段</span>

      <NButton type="primary" size="small" :disabled="!fields.length" @click="onExport">
        导出 Excel
      </NButton>
    </footer>

    <ConfigCenter v-model:show="showConfig" />
  </div>
</template>

<style scoped>
.appbar {
  position: relative;
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
