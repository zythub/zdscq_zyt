import { computed, ref } from 'vue';
import { DEFAULT_VERSION, PRESET_LIST, PRESET_MAP } from '@/config/baseline';
import type { AppConfig } from '@/types';

/**
 * 配置 store —— 只做「模板选择」，不做任何用户级编辑。
 *
 * 所有配置模板都写死在 src/config/baseline.ts 的 PRESET_LIST 里，
 * 这里只维护当前选中哪个模板（version），并把该模板作为 config 抛给各处读取。
 *
 * 不做任何 localStorage 持久化：刷新/重开页面即回到默认版本（不缓存配置）。
 */
const DEFAULT = DEFAULT_VERSION;

/** 当前选中的模板 id（仅内存态，刷新即回默认） */
export const version = ref<string>(DEFAULT);

export function setVersion(v: string): void {
  if (v in PRESET_MAP) version.value = v;
}

/** 当前生效的完整配置（= 选中的模板，纯基线） */
export const config = computed<AppConfig>(() => PRESET_MAP[version.value] ?? PRESET_MAP[DEFAULT]);

/** 供「版本」下拉使用的选项，顺序与 PRESET_LIST 一致 */
export const presetOptions = computed<Array<{ value: string; label: string }>>(() =>
  PRESET_LIST.map((p) => ({ value: p.id, label: p.label }))
);
