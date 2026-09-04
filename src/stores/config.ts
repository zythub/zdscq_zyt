import { computed, ref, watch } from 'vue';
import { DEFAULT_VERSION, PRESET_LIST, PRESET_MAP } from '@/config/baseline';
import type { AppConfig } from '@/types';

/**
 * 配置 store —— 只做「模板选择」，不做任何用户级编辑。
 *
 * 所有配置模板都写死在 src/config/baseline.ts 的 PRESET_LIST 里，
 * 这里只维护当前选中哪个模板（version），并把该模板作为 config 抛给各处读取。
 * 最终使用者不需要也不允许改配置：界面只有「版本」下拉切换。
 */

const VERSION_KEY = 'zdscq:config-version';

function readVersion(): string {
  try {
    const v = localStorage.getItem(VERSION_KEY);
    return v && v in PRESET_MAP ? v : DEFAULT_VERSION;
  } catch {
    return DEFAULT_VERSION;
  }
}

/** 当前选中的模板 id */
export const version = ref<string>(readVersion());

watch(version, (v) => {
  try {
    localStorage.setItem(VERSION_KEY, v);
  } catch {
    /* 忽略（隐私模式等） */
  }
});

export function setVersion(v: string): void {
  if (v in PRESET_MAP) version.value = v;
}

/** 当前生效的完整配置（= 选中的模板，纯基线，无个人覆盖层） */
export const config = computed<AppConfig>(() => PRESET_MAP[version.value] ?? PRESET_MAP[DEFAULT_VERSION]);

/** 供「版本」下拉使用的选项，顺序与 PRESET_LIST 一致 */
export const presetOptions = computed<Array<{ value: string; label: string }>>(() =>
  PRESET_LIST.map((p) => ({ value: p.id, label: p.label }))
);
