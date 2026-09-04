<script setup lang="ts">
import { computed, ref } from 'vue';
import {
  NButton,
  NInput,
  NInputNumber,
  NPopover,
  NRadioButton,
  NRadioGroup,
  NSelect,
  NSwitch,
  NTag,
  NTooltip,
  useMessage,
} from 'naive-ui';
import {
  applyManualOrder,
  clearManualOrder,
  editField,
  FIELD_TYPES,
  fields,
  recentlyAdded,
  resetFieldEdit,
  session,
} from '@/stores/builder';
import { presetOptions, setVersion, version } from '@/stores/config';
import { TYPES_WITHOUT_LENGTH, TYPES_WITH_SCALE, type FieldType, type GeneratedField } from '@/types';

const message = useMessage();

/** 表格 / Excel(可粘贴) 两种视图切换 */
const viewMode = ref<'table' | 'excel'>('table');

/**
 * 生成 TSV（制表符分隔）文本：Excel / WPS / 飞书表格 直接 Ctrl+V 会按列展开，
 * 比 Markdown 表格体验好很多（Markdown 粘进去会被塞进同一列）。
 */
const tsvText = computed(() => {
  const esc = (s: string) => s.replace(/\t/g, ' ').replace(/[\r\n]+/g, ' ');
  const header = ['字段名称', '中文名称', '类型', '长度', '小数位', '允许空', '默认值', '备注', '来源'];
  const rows = visible.value.map((f) =>
    [
      f.english,
      f.chinese,
      f.type,
      f.length == null ? '' : String(f.length),
      f.scale == null ? '' : String(f.scale),
      f.nullable ? '是' : '否',
      f.defaultValue ?? '',
      f.comment ?? '',
      f.originLabel,
    ]
      .map((c) => esc(String(c)))
      .join('\t')
  );
  return [header.join('\t'), ...rows].join('\n');
});

async function copyExcel(): Promise<void> {
  try {
    await navigator.clipboard.writeText(tsvText.value);
    message.success('已复制，直接 Ctrl+V 粘贴到 Excel / WPS / 飞书表格即可按列展开');
  } catch {
    message.error('复制失败（浏览器禁用了剪贴板），请手动选中下方文本复制');
  }
}

const typeOptions = FIELD_TYPES.map((t) => ({ label: t, value: t }));

const dragIndex = ref<number | null>(null);
const overIndex = ref<number | null>(null);
const filter = ref('');

const visible = computed(() => {
  const q = filter.value.trim().toLowerCase();
  return fields.value.filter((f) => {
    if (f.origin === 'system') return false; // 基础字段不在表格展示，但导出 Excel 时仍生成
    if (!q) return true;
    return f.english.toLowerCase().includes(q) || f.chinese.toLowerCase().includes(q);
  });
});

const hasManualOrder = computed(() => session.manualOrder.length > 0);

function onDragStart(i: number, e: DragEvent): void {
  if (filter.value.trim()) {
    message.warning('筛选状态下不能拖拽排序，请先清空筛选');
    e.preventDefault();
    return;
  }
  dragIndex.value = i;
  // 让拖拽影像显示整行，而不只是手柄那一个格子
  const rowEl = (e.currentTarget as HTMLElement).closest('.ft-row') as HTMLElement | null;
  if (rowEl && e.dataTransfer) {
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setDragImage(rowEl, 0, 0);
  }
}

function onDragOver(i: number, e: DragEvent): void {
  e.preventDefault();
  overIndex.value = i;
}

function onDrop(target: number): void {
  const from = dragIndex.value;
  dragIndex.value = null;
  overIndex.value = null;
  if (from == null || from === target) return;

  const names = visible.value.map((f) => f.english);
  const [moved] = names.splice(from, 1);
  if (moved === undefined) return;
  names.splice(target, 0, moved);
  applyManualOrder(names);
}

function onDragEnd(): void {
  dragIndex.value = null;
  overIndex.value = null;
}

function needsLength(t: FieldType): boolean {
  return !TYPES_WITHOUT_LENGTH.has(t);
}

function needsScale(t: FieldType): boolean {
  return TYPES_WITH_SCALE.has(t);
}

function onTypeChange(f: GeneratedField, t: FieldType): void {
  const patch: Partial<GeneratedField> = { type: t };
  if (TYPES_WITHOUT_LENGTH.has(t)) patch.length = null;
  else if (f.length == null) patch.length = 50;
  if (TYPES_WITH_SCALE.has(t)) {
    patch.scale = f.scale ?? 2;
    if (f.length == null) patch.length = 18;
  } else {
    patch.scale = null;
  }
  editField(f.english, patch);
}

function onEnglishCommit(f: GeneratedField, value: string): void {
  const next = value.trim().toLowerCase();
  if (!next || next === f.english) return;
  editField(f.english, { english: next });
  message.success(`已改为 ${next}`);
}

function severityClass(f: GeneratedField): string {
  if (f.warnings.some((w) => w.level === 'error')) return 'row-error';
  if (f.warnings.length) return 'row-warn';
  return '';
}

const columns = [
  { key: 'seq', label: '#', width: '44px' },
  { key: 'english', label: '字段名称', width: 'minmax(170px, 1.1fr)' },
  { key: 'chinese', label: '中文名称', width: 'minmax(240px, 2fr)' },
  { key: 'type', label: '类型', width: '116px' },
  { key: 'length', label: '长度', width: '84px' },
  { key: 'scale', label: '小数位', width: '78px' },
  { key: 'nullable', label: 'null', width: '58px' },
  { key: 'default', label: '默认值', width: '90px' },
  { key: 'comment', label: '备注', width: 'minmax(90px, 0.8fr)' },
  { key: 'origin', label: '来源', width: '108px', sticky: true },
];

const gridTemplate = computed(() => columns.map((c) => c.width).join(' '));
</script>

<template>
  <div style="display: flex; flex-direction: column; flex: 1; min-height: 0; min-width: 0; overflow: hidden">
    <div class="panel-head">
      <span class="panel-title">字段定义</span>
      <NTag size="tiny" :bordered="false">{{ fields.length }} 个</NTag>
      <NTag v-if="hasManualOrder" size="tiny" type="info" :bordered="false">已手动排序</NTag>
      <NButton v-if="hasManualOrder" size="tiny" quaternary @click="clearManualOrder">
        恢复默认顺序
      </NButton>
      <div style="flex: 1"></div>
      <NRadioGroup v-model:value="viewMode" size="small">
        <NRadioButton value="table">表格</NRadioButton>
        <NRadioButton value="excel">Excel</NRadioButton>
      </NRadioGroup>
      <NInput
        v-model:value="filter"
        size="tiny"
        placeholder="筛选字段"
        clearable
        style="width: 150px"
      />
      <!-- 版本下拉：配置模板在 baseline.ts 中写死，这里只负责切换 -->
      <NSelect
        :value="version"
        :options="presetOptions"
        size="small"
        style="width: 128px"
        :consistent-menu-width="false"
        @update:value="(v: string) => setVersion(v)"
      />
    </div>

    <div
      v-if="viewMode === 'table'"
      class="scroll-y field-grid"
      style="flex: 1; border: 1px solid var(--border); border-radius: var(--r-md)"
    >
      <div
        class="grid-head"
        :style="{ gridTemplateColumns: gridTemplate }"
      >
        <div
          v-for="c in columns"
          :key="c.key"
          :class="{ 'sticky-col': c.sticky }"
          style="padding: 8px 8px"
        >{{ c.label }}</div>
      </div>

      <div
        v-for="(f, i) in visible"
        :key="f.key"
        class="ft-row hoverable"
        :class="[severityClass(f), { 'row-flash': recentlyAdded.has(f.english) }]"
        :style="{
          gridTemplateColumns: gridTemplate,
          opacity: dragIndex === i ? 0.4 : 1,
          borderTop: overIndex === i && dragIndex !== null ? '2px solid var(--success)' : undefined,
        }"
        @dragover="onDragOver(i, $event)"
        @drop="onDrop(i)"
      >
        <!-- 仅此格作为拖拽手柄，其余单元格可正常编辑，避免拖拽抢先 -->
        <div
          class="drag-handle"
          draggable="true"
          title="拖拽排序"
          @dragstart="(e: DragEvent) => onDragStart(i, e)"
          @dragend="onDragEnd"
          style="padding: 4px 8px; opacity: 0.45; cursor: grab; user-select: none; touch-action: none"
        >
          {{ i + 1 }}
        </div>

        <div style="padding: 2px 4px; min-width: 0">
          <NInput
            :value="f.english"
            size="tiny"
            class="mono"
            :status="f.warnings.some((w) => w.level === 'error') ? 'error' : undefined"
            @change="(v: string) => onEnglishCommit(f, v)"
          />
        </div>

        <div style="padding: 2px 4px; min-width: 0">
          <NInput
            :value="f.chinese"
            size="tiny"
            @update:value="(v: string) => editField(f.english, { chinese: v })"
          />
        </div>

        <div style="padding: 2px 4px">
          <NSelect
            :value="f.type"
            :options="typeOptions"
            size="tiny"
            @update:value="(v: FieldType) => onTypeChange(f, v)"
          />
        </div>

        <div style="padding: 2px 4px">
          <NInputNumber
            v-if="needsLength(f.type)"
            :value="f.length"
            size="tiny"
            :min="1"
            :max="65535"
            :show-button="false"
            @update:value="(v: number | null) => editField(f.english, { length: v })"
          />
          <span v-else class="muted" style="opacity: 0.3; padding-left: 6px">—</span>
        </div>

        <div style="padding: 2px 4px">
          <NInputNumber
            v-if="needsScale(f.type)"
            :value="f.scale"
            size="tiny"
            :min="0"
            :max="30"
            :show-button="false"
            @update:value="(v: number | null) => editField(f.english, { scale: v })"
          />
          <span v-else class="muted" style="opacity: 0.3; padding-left: 6px">—</span>
        </div>

        <div style="padding: 2px 8px">
          <NSwitch
            :value="f.nullable"
            size="small"
            @update:value="(v: boolean) => editField(f.english, { nullable: v })"
          />
        </div>

        <div style="padding: 2px 4px">
          <NInput
            :value="f.defaultValue"
            size="tiny"
            placeholder="—"
            @update:value="(v: string) => editField(f.english, { defaultValue: v })"
          />
        </div>

        <div style="padding: 2px 4px; min-width: 0">
          <NInput
            :value="f.comment"
            size="tiny"
            placeholder="—"
            @update:value="(v: string) => editField(f.english, { comment: v })"
          />
        </div>

        <div
          class="sticky-col"
          style="padding: 4px 8px; min-width: 0; display: flex; align-items: center; gap: 6px"
        >
          <NPopover v-if="f.warnings.length" trigger="hover" placement="left">
            <template #trigger>
              <NTag
                size="tiny"
                :type="f.warnings.some((w) => w.level === 'error') ? 'error' : 'warning'"
                :bordered="false"
              >
                {{ f.originLabel }}
              </NTag>
            </template>
            <div style="max-width: 280px; font-size: 13px; line-height: 1.6">
              <div v-for="(w, wi) in f.warnings" :key="wi">{{ w.message }}</div>
            </div>
          </NPopover>
          <NTooltip v-else trigger="hover" placement="left">
            <template #trigger>
              <NTag size="tiny" :bordered="false" style="max-width: 100%">
                {{ f.originLabel }}
              </NTag>
            </template>
            {{ f.origin }}
          </NTooltip>
          <NButton
            v-if="f.touched.length"
            size="tiny"
            quaternary
            title="撤销对该行的修改"
            @click="resetFieldEdit(f.english)"
          >
            ↺
          </NButton>
        </div>
      </div>

      <div v-if="!visible.length" class="empty-hint">
        {{ filter ? '没有匹配的字段' : '勾选审批节点或添加自定义字段后，这里会显示生成结果' }}
      </div>
    </div>

    <div
      v-else
      class="scroll-y"
      style="flex: 1; min-height: 0; display: flex; flex-direction: column; padding: 4px"
    >
      <div style="display: flex; justify-content: flex-end; padding: 4px 2px">
        <NButton size="tiny" @click="copyExcel">复制（直接粘贴到 Excel）</NButton>
      </div>
      <pre class="md-box mono">{{ tsvText }}</pre>
    </div>
  </div>
</template>

<style scoped>
.field-grid {
  overflow: auto;
  min-height: 0;
}
.md-box {
  margin: 0;
  padding: 12px;
  flex: 1;
  font-size: 13px;
  line-height: 1.7;
  white-space: pre;
  overflow: auto;
  background: var(--surface-2);
  border: 1px solid var(--border);
  border-radius: var(--r-md);
  color: var(--text-2);
}
.grid-head {
  display: grid;
  position: sticky;
  top: 0;
  z-index: 2;
  font-size: 14px;
  font-weight: 600;
  color: var(--text-2);
  background: var(--surface-1);
  border-bottom: 1px solid var(--border);
}
.ft-row {
  display: grid;
  align-items: center;
  font-size: 15px;
  border-bottom: 1px solid var(--border);
  background: transparent;
}
.ft-row.row-error {
  background: var(--error-soft);
}
.ft-row.row-warn {
  background: var(--warning-soft);
}
.ft-row:hover {
  background: var(--surface-2);
}
/* 拖拽手柄：仅在手柄格上触发拖拽，编辑单元格不受影响 */
.drag-handle {
  transition: opacity var(--dur-fast) var(--ease-out-quart), color var(--dur-fast);
}
.drag-handle:hover {
  opacity: 0.85 !important;
  color: var(--primary);
}
/* 来源列：固定在右侧，水平滚动时始终可见 */
.sticky-col {
  position: sticky;
  right: 0;
  z-index: 3;
  background: var(--surface-1);
  border-left: 1px solid var(--border);
  box-shadow: -8px 0 8px -6px rgba(31, 42, 55, 0.16);
}
.grid-head .sticky-col {
  z-index: 4;
}
/* 行悬停/告警底色需同步到 sticky 列，避免断层；告警优先级高于悬停 */
.ft-row:hover .sticky-col {
  background: var(--surface-2);
}
.ft-row.row-error .sticky-col {
  background: var(--error-soft);
}
.ft-row.row-warn .sticky-col {
  background: var(--warning-soft);
}
:global(.dark) .sticky-col {
  box-shadow: -8px 0 8px -6px rgba(0, 0, 0, 0.5);
}
</style>
