import { pinyin } from 'pinyin-pro';
import { DIALECT_MAX_IDENTIFIER, type Dialect, type NamingConfig } from '@/types';

/** 清洗中文名：去空白与常见标点 */
export function cleanChineseName(raw: string): string {
  return raw
    .trim()
    .replace(/\s+/g, '')
    .replace(/[:：，。；！？、（）()【】\[\]"'`]/g, '');
}

/** 把任意字符串规整成合法的 SQL 标识符片段 */
function sanitize(input: string): string {
  let s = input.toLowerCase().replace(/[^a-z0-9_]/g, '_');
  s = s.replace(/_+/g, '_').replace(/^_+|_+$/g, '');
  // 标识符不能以数字开头
  if (/^\d/.test(s)) s = `f_${s}`;
  return s;
}

/** 拼音首字母，如「监理单位」→ jldw */
export function toAcronym(chinese: string): string {
  const text = cleanChineseName(chinese);
  if (!text) return '';
  try {
    const result = pinyin(text, { pattern: 'first', toneType: 'none', type: 'string' });
    return sanitize(String(result).replace(/\s+/g, ''));
  } catch {
    return sanitize(text);
  }
}

/** 拼音全拼，如「监理单位」→ jianlidanwei */
export function toFullPinyin(chinese: string): string {
  const text = cleanChineseName(chinese);
  if (!text) return '';
  try {
    const result = pinyin(text, { toneType: 'none', type: 'string' });
    return sanitize(String(result).replace(/\s+/g, ''));
  } catch {
    return sanitize(text);
  }
}

/** 当前生效的标识符长度上限 */
export function effectiveMaxLength(naming: NamingConfig): number {
  return naming.maxIdentifierLength ?? DIALECT_MAX_IDENTIFIER[naming.dialect];
}

export function dialectLabel(d: Dialect): string {
  return { postgresql: 'PostgreSQL', mysql: 'MySQL', dameng: '达梦' }[d];
}

export interface NameResolution {
  name: string;
  /** 生成过程中产生的提示，会显示在字段表格里 */
  warnings: string[];
}

/**
 * 为中文名解析出唯一的英文标识符。
 *
 * 策略（对应 grilling Q5 决策 d）：
 *   1. 手工词典命中 → 直接用
 *   2. 拼音首字母
 *   3. 撞名 → 降级为全拼
 *   4. 全拼仍撞 → 追加 _2 / _3（首个不带后缀）
 * 每一步降级都会产生可见告警，不再静默处理。
 *
 * @param suffixes 该名字还会派生出的后缀（如 _name / _yj / _date），一并参与占用检测，
 *                 避免主名不撞但派生名撞。
 */
export function resolveEnglishName(
  chinese: string,
  used: Set<string>,
  naming: NamingConfig,
  dict: Record<string, string>,
  suffixes: string[] = []
): NameResolution {
  const warnings: string[] = [];
  const cleaned = cleanChineseName(chinese);
  const max = effectiveMaxLength(naming);

  const allTaken = (base: string): boolean =>
    used.has(base) || suffixes.some((sfx) => used.has(base + sfx));

  const longest = (base: string): number =>
    suffixes.reduce((m, sfx) => Math.max(m, base.length + sfx.length), base.length);

  // 1. 手工词典优先
  const fromDict = dict[cleaned];
  if (fromDict) {
    const name = sanitize(fromDict);
    if (allTaken(name)) {
      warnings.push(`词典映射「${cleaned} → ${name}」与已有字段冲突，已改用拼音`);
    } else {
      if (longest(name) > max) {
        warnings.push(`超出 ${max} 字符上限（当前 ${longest(name)}）`);
      }
      return { name, warnings };
    }
  }

  // 2. 拼音首字母
  const acronym = toAcronym(cleaned);
  if (acronym && !allTaken(acronym) && longest(acronym) <= max) {
    return { name: acronym, warnings };
  }

  // 3. 降级全拼
  if (naming.fallbackToFullPinyin) {
    const full = toFullPinyin(cleaned);
    if (full && !allTaken(full)) {
      if (longest(full) <= max) {
        if (acronym && allTaken(acronym)) {
          warnings.push(`首字母 ${acronym} 已被占用，降级为全拼`);
        }
        return { name: full, warnings };
      }
      // 全拼可用但超长 → 截断后再判重
      const budget = max - Math.max(0, ...suffixes.map((s) => s.length), 0);
      const truncated = full.slice(0, budget).replace(/_+$/, '');
      if (truncated && !allTaken(truncated)) {
        warnings.push(`全拼 ${full.length} 字符超出上限，已截断为 ${truncated}`);
        return { name: truncated, warnings };
      }
    }
  }

  // 4. 数字后缀兜底
  const base = acronym || toFullPinyin(cleaned) || 'field';
  if (!allTaken(base) && longest(base) <= max) {
    return { name: base, warnings };
  }
  for (let i = 2; i < 100; i++) {
    const budget = max - String(i).length - 1 - Math.max(0, ...suffixes.map((s) => s.length), 0);
    const candidate = `${base.slice(0, Math.max(1, budget))}_${i}`;
    if (!allTaken(candidate)) {
      warnings.push(`名称冲突，已追加序号后缀 ${candidate}（建议手动改成有语义的名字）`);
      return { name: candidate, warnings };
    }
  }
  warnings.push('无法生成唯一字段名，请手动指定');
  return { name: `${base}_x`, warnings };
}

/** 生成表名 */
export function buildTableName(chineseTableName: string, naming: NamingConfig): string {
  const body = toAcronym(chineseTableName) || 'custom_table';
  return `${naming.tablePrefix}${body}`;
}
