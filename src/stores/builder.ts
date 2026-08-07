import { computed, reactive, ref, watch } from 'vue';
import { config } from './config';
import { generateFields } from '@/core/generator';
import { buildTableName } from '@/core/identifier';
import type { CustomFieldInput, FieldType, GeneratedField, TableMode } from '@/types';

const SESSION_KEY = 'zdscq:session:v1';

interface SessionState {
  tableMode: TableMode;
  tableChineseName: string;
  dataLinkName: string;
  tableComment: string;
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
    selectedNodeIds: [],
    customFields: [],
    edits: {},
    manualOrder: [],
  };
}

function loadSession(): SessionState {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    if (!raw) return defaultSession();
    return { ...defaultSession(), ...(JSON.parse(raw) as SessionState) };
  } catch {
    return defaultSession();
  }
}

export const session = reactive<SessionState>(loadSession());

watch(
  () => JSON.parse(JSON.stringify(session)) as SessionState,
  (v) => {
    try {
      localStorage.setItem(SESSION_KEY, JSON.stringify(v));
    } catch (e) {
      console.warn('会话保存失败', e);
    }
  },
  { deep: true }
);

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

  // 应用手动排序；未在排序列表中的（新增字段）追加到末尾
  const pos = new Map(session.manualOrder.map((name, i) => [name, i]));
  const known: GeneratedField[] = [];
  const fresh: GeneratedField[] = [];
  for (const f of merged) {
    if (pos.has(f.english)) known.push(f);
    else fresh.push(f);
  }
  known.sort((a, b) => (pos.get(a.english) ?? 0) - (pos.get(b.english) ?? 0));
  return [...known, ...fresh];
});

/** 完整表名（带前缀），底部实时展示 */
export const fullTableName = computed(() =>
  buildTableName(session.tableChineseName, config.value.naming)
);

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
