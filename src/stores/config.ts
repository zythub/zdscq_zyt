import { computed, reactive, ref, watch } from 'vue';
import { DEFAULT_CONFIG, SCHEMA_VERSION } from '@/config/baseline';
import type {
  AppConfig,
  ConfigDiff,
  FieldRole,
  FixedFieldDef,
  NamingConfig,
  NodeDef,
  RoleDefault,
} from '@/types';

const STORAGE_KEY = 'zdscq:config-diff:v1';

function deepClone<T>(v: T): T {
  return JSON.parse(JSON.stringify(v)) as T;
}

function loadDiff(): ConfigDiff {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { baseSchemaVersion: SCHEMA_VERSION };
    const parsed = JSON.parse(raw) as ConfigDiff;
    if (typeof parsed !== 'object' || parsed === null) {
      return { baseSchemaVersion: SCHEMA_VERSION };
    }
    // baseSchemaVersion 记录用户上次确认时的基线版本；
    // 若小于当前 SCHEMA_VERSION，baselineUpdated 会触发提示条
    return { ...parsed, baseSchemaVersion: parsed.baseSchemaVersion ?? SCHEMA_VERSION };
  } catch {
    return { baseSchemaVersion: SCHEMA_VERSION };
  }
}

/** 个人覆盖层：只存改动过的部分，基线更新自动生效 */
const diff = reactive<ConfigDiff>(loadDiff());

/** 基线版本号变化的提示（用户上次记录的基线版本 < 当前代码里的版本） */
export const baselineUpdated = ref(diff.baseSchemaVersion < SCHEMA_VERSION);

let persistEnabled = true;

watch(
  () => deepClone(diff),
  (v) => {
    if (!persistEnabled) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(v));
    } catch (e) {
      console.warn('配置保存失败', e);
    }
  },
  { deep: true }
);

/** 三层合并结果：基线 → 个人 diff */
export const config = computed<AppConfig>(() => {
  const base = DEFAULT_CONFIG;

  const naming: NamingConfig = { ...base.naming, ...(diff.naming ?? {}) };

  const roleDefaults = {} as Record<FieldRole, RoleDefault>;
  for (const key of Object.keys(base.roleDefaults) as FieldRole[]) {
    roleDefaults[key] = { ...base.roleDefaults[key], ...(diff.roleDefaults?.[key] ?? {}) };
  }

  const removed = new Set(diff.nodesRemoved ?? []);
  const nodes: NodeDef[] = base.nodes
    .filter((n) => !removed.has(n.id))
    .map((n) => diff.nodesOverride?.[n.id] ?? n)
    .concat((diff.nodesAdded ?? []).filter((n) => !removed.has(n.id)));

  return {
    schemaVersion: SCHEMA_VERSION,
    naming,
    roleDefaults,
    nodes,
    baseFieldsStart: diff.baseFieldsStart ?? base.baseFieldsStart,
    baseFieldsEnd: diff.baseFieldsEnd ?? base.baseFieldsEnd,
    subTableFields: diff.subTableFields ?? base.subTableFields,
    excludedNames: diff.excludedNames ?? base.excludedNames,
    translationDict: { ...base.translationDict, ...(diff.translationDict ?? {}) },
  };
});

/** 当前有多少项个人覆盖，用于界面提示 */
export const overrideCount = computed(() => {
  let n = 0;
  if (diff.naming && Object.keys(diff.naming).length) n += Object.keys(diff.naming).length;
  if (diff.roleDefaults) n += Object.keys(diff.roleDefaults).length;
  if (diff.nodesOverride) n += Object.keys(diff.nodesOverride).length;
  if (diff.nodesAdded?.length) n += diff.nodesAdded.length;
  if (diff.nodesRemoved?.length) n += diff.nodesRemoved.length;
  if (diff.baseFieldsStart) n += 1;
  if (diff.baseFieldsEnd) n += 1;
  if (diff.subTableFields) n += 1;
  if (diff.excludedNames) n += 1;
  if (diff.translationDict && Object.keys(diff.translationDict).length) {
    n += Object.keys(diff.translationDict).length;
  }
  return n;
});

export function setNaming<K extends keyof NamingConfig>(key: K, value: NamingConfig[K]): void {
  diff.naming = { ...(diff.naming ?? {}), [key]: value };
  if (value === DEFAULT_CONFIG.naming[key]) {
    const next = { ...diff.naming };
    delete next[key];
    diff.naming = Object.keys(next).length ? next : undefined;
  }
}

export function setRoleDefault<K extends keyof RoleDefault>(
  role: FieldRole,
  key: K,
  value: RoleDefault[K]
): void {
  const current = diff.roleDefaults?.[role] ?? {};
  const next = { ...current, [key]: value };
  if (value === DEFAULT_CONFIG.roleDefaults[role][key]) delete next[key];
  const all = { ...(diff.roleDefaults ?? {}) };
  if (Object.keys(next).length) all[role] = next;
  else delete all[role];
  diff.roleDefaults = Object.keys(all).length ? all : undefined;
}

export function upsertNode(node: NodeDef): void {
  const isBaseline = DEFAULT_CONFIG.nodes.some((n) => n.id === node.id);
  if (isBaseline) {
    diff.nodesOverride = { ...(diff.nodesOverride ?? {}), [node.id]: deepClone(node) };
  } else {
    const added = [...(diff.nodesAdded ?? [])];
    const idx = added.findIndex((n) => n.id === node.id);
    if (idx >= 0) added[idx] = deepClone(node);
    else added.push(deepClone(node));
    diff.nodesAdded = added;
  }
  if (diff.nodesRemoved?.includes(node.id)) {
    diff.nodesRemoved = diff.nodesRemoved.filter((id) => id !== node.id);
  }
}

export function removeNode(id: string): void {
  const isBaseline = DEFAULT_CONFIG.nodes.some((n) => n.id === id);
  if (isBaseline) {
    diff.nodesRemoved = [...new Set([...(diff.nodesRemoved ?? []), id])];
    if (diff.nodesOverride?.[id]) {
      const next = { ...diff.nodesOverride };
      delete next[id];
      diff.nodesOverride = Object.keys(next).length ? next : undefined;
    }
  } else {
    diff.nodesAdded = (diff.nodesAdded ?? []).filter((n) => n.id !== id);
  }
}

export function resetNode(id: string): void {
  if (diff.nodesOverride?.[id]) {
    const next = { ...diff.nodesOverride };
    delete next[id];
    diff.nodesOverride = Object.keys(next).length ? next : undefined;
  }
  diff.nodesRemoved = (diff.nodesRemoved ?? []).filter((x) => x !== id);
}

export function setFixedFields(
  which: 'baseFieldsStart' | 'baseFieldsEnd' | 'subTableFields',
  list: FixedFieldDef[]
): void {
  const same = JSON.stringify(list) === JSON.stringify(DEFAULT_CONFIG[which]);
  diff[which] = same ? undefined : deepClone(list);
}

export function setExcludedNames(list: string[]): void {
  const same = JSON.stringify(list) === JSON.stringify(DEFAULT_CONFIG.excludedNames);
  diff.excludedNames = same ? undefined : [...list];
}

/** 记住「中文 → 英文」映射，下次同样的中文自动复用 */
export function rememberTranslation(chinese: string, english: string): void {
  if (!chinese.trim() || !english.trim()) return;
  diff.translationDict = { ...(diff.translationDict ?? {}), [chinese.trim()]: english.trim() };
}

export function forgetTranslation(chinese: string): void {
  if (!diff.translationDict) return;
  const next = { ...diff.translationDict };
  delete next[chinese];
  diff.translationDict = Object.keys(next).length ? next : undefined;
}

/** 一键恢复默认：清空全部个人覆盖 */
export function resetAll(): void {
  for (const k of Object.keys(diff) as (keyof ConfigDiff)[]) {
    if (k !== 'baseSchemaVersion') delete diff[k];
  }
  diff.baseSchemaVersion = SCHEMA_VERSION;
  baselineUpdated.value = false;
}

/** 确认已知悉基线更新 */
export function acknowledgeBaseline(): void {
  diff.baseSchemaVersion = SCHEMA_VERSION;
  baselineUpdated.value = false;
}

/** 导出为 JSON —— 导出的是完整配置，方便别人直接看懂 */
export function exportConfigJson(): string {
  return JSON.stringify(
    { exportedAt: new Date().toISOString(), schemaVersion: SCHEMA_VERSION, diff: deepClone(diff) },
    null,
    2
  );
}

/** 导入 JSON —— 覆盖本地个人覆盖层 */
export function importConfigJson(text: string): { ok: boolean; message: string } {
  try {
    const parsed = JSON.parse(text) as { diff?: ConfigDiff; schemaVersion?: number };
    const incoming = parsed.diff ?? (parsed as unknown as ConfigDiff);
    if (typeof incoming !== 'object' || incoming === null) {
      return { ok: false, message: '文件格式不正确' };
    }
    persistEnabled = false;
    for (const k of Object.keys(diff) as (keyof ConfigDiff)[]) delete diff[k];
    Object.assign(diff, deepClone(incoming));
    diff.baseSchemaVersion = SCHEMA_VERSION;
    persistEnabled = true;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(deepClone(diff)));
    baselineUpdated.value = false;
    return { ok: true, message: `已导入配置，共 ${overrideCount.value} 项个人覆盖` };
  } catch (e) {
    persistEnabled = true;
    return { ok: false, message: `解析失败：${(e as Error).message}` };
  }
}

export { diff as configDiff };
