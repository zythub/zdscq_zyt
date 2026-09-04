import { computed, reactive, ref } from 'vue';
import { config } from './config';
import { generateFields } from '@/core/generator';
import { buildTableName } from '@/core/identifier';
import type { CustomFieldInput, FieldType, GeneratedField, TableMode } from '@/types';
import type { DesignerFieldType } from '@/core/word/designer';

interface SessionState {
  tableMode: TableMode;
  tableChineseName: string;
  dataLinkName: string;
  tableComment: string;
  englishTableName: string;
  selectedNodeIds: string[];
  customFields: CustomFieldInput[];
  /** 用户手动改过的字段属性，key = english 名，避免重算时丢失 */
  edits: Record<string, Partial<GeneratedField>>;
  /** 手动拖拽后的顺序，存 english 名序列 */
  manualOrder: string[];
}

function defaultSession(): SessionState {
  return {
    tableMode: 'main',
    tableChineseName: '',
    dataLinkName: '',
    tableComment: '',
    englishTableName: '',
    selectedNodeIds: [],
    customFields: [],
    edits: {},
    manualOrder: [],
  };
}

/** 会话仅存内存，不做 localStorage 持久化 —— 刷新/重开即恢复空白初始状态 */
export const session = reactive<SessionState>(defaultSession());

/** 最近新增的字段，用于表格高亮 */
export const recentlyAdded = ref<Set<string>>(new Set());

let uidCounter = 0;
export function newUid(): string {
  return `cf${Date.now().toString(36)}${(uidCounter++).toString(36)}`;
}

export function addCustomField(partial: Partial<CustomFieldInput>): CustomFieldInput {
  const field: CustomFieldInput = {
    uid: newUid(),
    chineseName: '',
    englishName: '',
    type: 'VARCHAR',
    length: 50,
    scale: null,
    isPerson: false,
    hasDate: false,
    hasOpinion: false,
    ...partial,
  };
  session.customFields.push(field);
  return field;
}

export function removeCustomField(uid: string): void {
  const idx = session.customFields.findIndex((f) => f.uid === uid);
  if (idx >= 0) session.customFields.splice(idx, 1);
}

/** 清空全部手动添加的字段（快速添加区），并清理已失效的行内编辑记录 */
export function clearCustomFields(): void {
  session.customFields = [];
  const live = new Set(fields.value.map((f) => f.english));
  for (const k of Object.keys(session.edits)) {
    if (!live.has(k)) delete session.edits[k];
  }
}

/**
 * 把「从 Word / 文字」解析出的主表字段直接接入生成器主流程：
 * 写入 session.customFields，随即出现在主字段表、可像普通字段一样编辑/排序/导出 Excel。
 * - DesignerFieldType(表单组件类型) → 生成器的 DB 字段类型
 * - 自动识别人员/日期/意见后缀，复用原生成器"人员字段展开"逻辑
 * - 与已存在的 customFields 去重；若某字段英文名已被「生成器基础字段」占用
 *   （如书签里打了 编号/number、工程名称/project_name 等），直接跳过，避免重复导入
 * - 若主表字段里没有「备注」，自动补一个 备注(bz, TEXT)
 * @returns 实际新增的英文名列表（用于表格高亮）
 */
const DESIGNER_TO_DB: Record<DesignerFieldType, { type: FieldType; length: number | null }> = {
  input: { type: 'VARCHAR', length: 50 },
  textarea: { type: 'TEXT', length: null },
  date: { type: 'DATE', length: null },
  checkbox: { type: 'VARCHAR', length: 50 },
  select: { type: 'VARCHAR', length: 50 },
  radio: { type: 'VARCHAR', length: 50 },
};

export function addFieldsFromWord(
  items: Array<{ english: string; label: string; type: DesignerFieldType }>
): string[] {
  const existing = new Set(session.customFields.map((f) => f.englishName));
  // 生成器自己会产出这些基础字段（来自配置中心 baseline）：书签若已打「编号 / 工程名称 / 单位名称 …」
  // 等，必须跳过，否则会和生成器基础字段在主表清单里重复出现。
  const reserved = new Set<string>([
    ...config.value.baseFieldsStart.map((f) => f.english),
    ...config.value.baseFieldsEnd.map((f) => f.english),
  ]);
  const added: string[] = [];

  for (const it of items) {
    // 已存在 或 已由生成器基础字段提供 → 跳过，杜绝重复导入
    if (existing.has(it.english) || reserved.has(it.english)) continue;
    const m = DESIGNER_TO_DB[it.type] ?? DESIGNER_TO_DB.input;
    const f = addCustomField({
      chineseName: it.label,
      englishName: it.english,
      type: m.type,
      length: m.length,
      scale: null,
      isPerson: it.english.endsWith('_name'),
      hasDate: /_(rq|date)$/.test(it.english),
      hasOpinion: /_yj$/.test(it.english),
    });
    existing.add(f.englishName);
    added.push(f.englishName);
  }

  // 默认「备注」字段：主表没有时补一个（用户要求的固定基础字段；bz 不在生成器基础字段内，不会被 reserved 吃掉）
  if (!existing.has('bz') && !reserved.has('bz')) {
    const f = addCustomField({
      chineseName: '备注',
      englishName: 'bz',
      type: 'TEXT',
      length: null,
      scale: null,
      isPerson: false,
      hasDate: false,
      hasOpinion: false,
    });
    added.push(f.englishName);
  }

  return added;
}

export function toggleNode(id: string): void {
  const idx = session.selectedNodeIds.indexOf(id);
  if (idx >= 0) session.selectedNodeIds.splice(idx, 1);
  else session.selectedNodeIds.push(id);
}

/** 切换主表/子表：子表不涉及审批节点，按用户确认清空选择 */
export function setTableMode(mode: TableMode): void {
  if (session.tableMode === mode) return;
  session.tableMode = mode;
  if (mode === 'sub') session.selectedNodeIds = [];
  session.manualOrder = [];
}

/** 生成结果 = 算法输出 + 用户编辑 + 手动排序 */
export const fields = computed<GeneratedField[]>(() => {
  const generated = generateFields({
    config: config.value,
    tableMode: session.tableMode,
    selectedNodeIds: session.selectedNodeIds,
    customFields: session.customFields,
  });

  // 叠加用户在表格里的行内编辑
  const merged = generated.map((f) => {
    const edit = session.edits[f.english];
    if (!edit) return f;
    const touched = Object.keys(edit);
    return { ...f, ...edit, touched } as GeneratedField;
  });

  if (!session.manualOrder.length) return merged;

  // 应用手动排序；system 固定字段（基础字段）不参与重排，归位到前置/后置区段；
  // 未在手动排序列表中的自定义/节点字段追加到中间段末尾
  const pos = new Map(session.manualOrder.map((name, i) => [name, i]));
  const head: GeneratedField[] = [];
  const tail: GeneratedField[] = [];
  const body: GeneratedField[] = [];
  let seenNonSystem = false;
  for (const f of merged) {
    if (f.origin === 'system') {
      if (!seenNonSystem) head.push(f);
      else tail.push(f);
    } else {
      seenNonSystem = true;
      body.push(f);
    }
  }
  const known = body.filter((f) => pos.has(f.english));
  const fresh = body.filter((f) => !pos.has(f.english));
  known.sort((a, b) => (pos.get(a.english) ?? 0) - (pos.get(b.english) ?? 0));
  return [...head, ...known, ...fresh, ...tail];
});

/** 完整表名（带前缀），底部实时展示 */
export const fullTableName = computed(() => {
  const manual = session.englishTableName.trim();
  if (manual) return manual;
  return buildTableName(session.tableChineseName, config.value.naming);
});

export const problemCount = computed(() => {
  let errors = 0;
  let warns = 0;
  for (const f of fields.value) {
    for (const w of f.warnings) {
      if (w.level === 'error') errors++;
      else warns++;
    }
  }
  return { errors, warns };
});

export function editField(english: string, patch: Partial<GeneratedField>): void {
  session.edits[english] = { ...(session.edits[english] ?? {}), ...patch };
}

export function resetFieldEdit(english: string): void {
  delete session.edits[english];
}

export function applyManualOrder(names: string[]): void {
  session.manualOrder = names;
}

export function clearManualOrder(): void {
  session.manualOrder = [];
}

/** 记录新增字段用于高亮，2 秒后自动淡出 */
export function markRecentlyAdded(names: string[]): void {
  recentlyAdded.value = new Set(names);
  window.setTimeout(() => {
    recentlyAdded.value = new Set();
  }, 2400);
}

export function resetSession(): void {
  Object.assign(session, defaultSession());
}

export const FIELD_TYPES: FieldType[] = [
  'VARCHAR',
  'CHAR',
  'TEXT',
  'INT',
  'BIGINT',
  'DECIMAL',
  'DATE',
  'DATETIME',
  'TIMESTAMP',
];

// 调试钩子：在浏览器里方便查看当前生成的字段
if (typeof window !== 'undefined') {
  Object.defineProperty(window, '__builder', {
    get: () => ({
      fields: fields.value,
      problemCount: problemCount.value,
      fullTableName: fullTableName.value,
      session,
      nodeIds: config.value.nodes.map((n) => n.id),
      setNodes: (ids: string[]) => {
        session.selectedNodeIds = ids;
      },
    }),
  });
}
