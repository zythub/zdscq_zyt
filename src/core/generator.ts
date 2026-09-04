import {
  TYPES_WITHOUT_LENGTH,
  TYPES_WITH_SCALE,
  type AppConfig,
  type CustomFieldInput,
  type FieldRole,
  type FieldWarning,
  type FixedFieldDef,
  type GeneratedField,
  type NodeDef,
  type RoleDefault,
  type TableMode,
} from '@/types';
import { cleanChineseName, effectiveMaxLength, resolveEnglishName } from './identifier';

export interface GenerateInput {
  config: AppConfig;
  tableMode: TableMode;
  selectedNodeIds: string[];
  customFields: CustomFieldInput[];
}

/** 按类型规整长度与小数位，避免出现 DATE(50) 这种无意义组合 */
function normalize(attrs: RoleDefault): RoleDefault {
  const out = { ...attrs };
  if (TYPES_WITHOUT_LENGTH.has(out.type)) out.length = null;
  else if (out.length == null || out.length <= 0) out.length = 50;
  if (!TYPES_WITH_SCALE.has(out.type)) out.scale = null;
  else if (out.scale == null || out.scale < 0) out.scale = 2;
  return out;
}

/** 合并 L1 角色默认值 + L2 单字段覆盖 */
function resolveAttrs(
  config: AppConfig,
  role: FieldRole,
  override?: Partial<RoleDefault>
): RoleDefault {
  const base = config.roleDefaults[role] ?? config.roleDefaults.text;
  return normalize({ ...base, ...(override ?? {}) });
}

interface BuildCtx {
  config: AppConfig;
  /** 已落地的字段名（push 后写入），用于重复检测与排重 */
  used: Set<string>;
  /** 仅为「占位防抢名」而预留的派生名（人员/意见/日期字段展开前的预约），
   *  不计入 used，否则 push 会把同一个字段自己预约的名字误判为重复 */
  reserved: Set<string>;
  out: GeneratedField[];
  max: number;
  seq: number;
}

function push(
  ctx: BuildCtx,
  params: {
    english: string;
    chinese: string;
    role: FieldRole;
    override?: Partial<RoleDefault>;
    origin: string;
    originLabel: string;
    warnings?: string[];
  }
): void {
  const attrs = resolveAttrs(ctx.config, params.role, params.override);
  const warnings: FieldWarning[] = (params.warnings ?? []).map((m) => ({ level: 'warn', message: m }));

  if (params.english.length > ctx.max) {
    warnings.push({
      level: 'error',
      message: `字段名 ${params.english.length} 字符，超出上限 ${ctx.max}，导入数据库会失败`,
    });
  }
  if (ctx.used.has(params.english)) {
    warnings.push({ level: 'error', message: `字段名重复：${params.english}` });
  }

  ctx.used.add(params.english);
  ctx.out.push({
    key: `${params.origin}::${params.english}::${ctx.seq++}`,
    english: params.english,
    chinese: params.chinese,
    type: attrs.type,
    length: attrs.length,
    scale: attrs.scale,
    nullable: attrs.nullable,
    defaultValue: attrs.defaultValue,
    comment: attrs.comment,
    role: params.role,
    origin: params.origin,
    originLabel: params.originLabel,
    touched: [],
    warnings,
  });
}

/** 固定字段：英文名由配置直接给出，仍需查重（旧版 BASE_FIELDS 完全不查重） */
function pushFixed(ctx: BuildCtx, defs: FixedFieldDef[], originLabel: string): void {
  for (const def of defs) {
    const warnings: string[] = [];
    let english = def.english.trim();
    if (!english) continue;
    if (ctx.used.has(english)) {
      // 旧版在这里直接 continue 静默丢字段，现在改为重命名 + 告警
      let i = 2;
      while (ctx.used.has(`${english}_${i}`)) i++;
      warnings.push(`固定字段 ${english} 与前面的字段重名，已改为 ${english}_${i}，请检查配置`);
      english = `${english}_${i}`;
    }
    push(ctx, {
      english,
      chinese: def.chinese,
      role: def.role,
      override: def.override,
      origin: 'system',
      originLabel,
      warnings,
    });
  }
}

/**
 * 人员字段展开（审批节点专用）：按配置的 personTemplate 展开。
 * 南充版本 = 裸ID + _name + _sign；标准版本 = _id + _name + _sign + _yj + _date。
 * 英文 = base + suffix，中文 = 人员中文名 + label。
 */
function pushPersonTemplate(
  ctx: BuildCtx,
  params: {
    base: string;
    chinese: string;
    origin: string;
    originLabel: string;
    warnings: string[];
    /** 节点字段上的 override，作用于展开出的每一个物理字段 */
    override?: Partial<RoleDefault>;
  }
): void {
  // warnings（如撞名降级）只挂在展开出的第一个物理字段上，避免同一条告警重复 N 遍
  ctx.config.personTemplate.forEach((t, i) => {
    push(ctx, {
      english: params.base + t.suffix,
      chinese: params.chinese + t.label,
      role: t.role,
      // 模板自带 override 优先于节点字段 override
      override: { ...(params.override ?? {}), ...(t.override ?? {}) },
      origin: params.origin,
      originLabel: params.originLabel,
      warnings: i === 0 ? params.warnings : [],
    });
  });
}

/** 人员字段展开：ID → 姓名（+ 可选 意见 / 日期） */
function pushPerson(
  ctx: BuildCtx,
  params: {
    base: string;
    chinese: string;
    origin: string;
    originLabel: string;
    warnings: string[];
    idOverride?: Partial<RoleDefault>;
    nameOverride?: Partial<RoleDefault>;
    withOpinion?: boolean;
    withDate?: boolean;
    opinionOverride?: Partial<RoleDefault>;
  }
): void {
  const { naming } = ctx.config;

  if (params.withOpinion) {
    push(ctx, {
      english: params.base + naming.opinionSuffix,
      chinese: params.chinese + '意见',
      role: 'opinion',
      override: params.opinionOverride,
      origin: params.origin,
      originLabel: params.originLabel,
    });
  }

  // ID 字段：走 personId 角色（默认 50，用户可在配置中心统一改成 200）
  push(ctx, {
    english: params.base,
    chinese: params.chinese,
    role: 'personId',
    override: params.idOverride,
    origin: params.origin,
    originLabel: params.originLabel,
    warnings: params.warnings,
  });

  // 姓名字段：走 personName 角色（默认 100，旧版这里错误地吃了 800）
  push(ctx, {
    english: params.base + naming.nameSuffix,
    chinese: params.chinese + '姓名',
    role: 'personName',
    override: params.nameOverride,
    origin: params.origin,
    originLabel: params.originLabel,
  });

  // 签名字段：每个签字人自动加一个 _sign（TEXT），用于存放签字内容
  push(ctx, {
    english: params.base + '_sign',
    chinese: params.chinese + '签字',
    role: 'text',
    override: { type: 'TEXT', length: null },
    origin: params.origin,
    originLabel: params.originLabel,
  });

  if (params.withDate) {
    push(ctx, {
      english: params.base + naming.dateSuffix,
      chinese: params.chinese + '日期',
      role: 'date',
      origin: params.origin,
      originLabel: params.originLabel,
    });
  }
}

function buildNode(ctx: BuildCtx, node: NodeDef): void {
  const { naming, translationDict } = ctx.config;
  const nonPerson: Array<() => void> = [];
  const persons: Array<() => void> = [];

  for (const field of node.fields) {
    const chinese = cleanChineseName(field.name);
    if (!chinese) continue;

    // 人员字段会按模板展开成多个物理字段，撞名检测需覆盖模板的全部后缀
    // （标准版 _id/_name/_sign/_yj/_date，南充版 裸ID/_name/_sign）
    const suffixes = field.isPerson ? ctx.config.personTemplate.map((t) => t.suffix) : [];
    const taken = new Set<string>([...ctx.used, ...ctx.reserved]);
    const { name, warnings } = resolveEnglishName(chinese, taken, naming, translationDict, suffixes);

    if (field.isPerson) {
      // 预留展开出的全部派生名，避免同节点后续字段抢名。
      // 用 reserved 而非 used——否则 push 会把同一个字段自己预约的名字
      // 误判为「字段名重复」而刷出一排假 error。
      ctx.reserved.add(name);
      for (const t of ctx.config.personTemplate) ctx.reserved.add(name + t.suffix);
      persons.push(() =>
        pushPersonTemplate(ctx, {
          base: name,
          chinese: field.name,
          origin: `node:${node.id}`,
          originLabel: node.name,
          warnings,
          override: field.override,
        })
      );
    } else {
      // 同样走 reserved：push 自己会把名字写进 used，若在 push 前就写入 used，
      // 会被当成「字段名重复」刷出假 error
      ctx.reserved.add(name);
      nonPerson.push(() =>
        push(ctx, {
          english: name,
          chinese: field.name,
          role: field.role,
          override: field.override,
          origin: `node:${node.id}`,
          originLabel: node.name,
          warnings,
        })
      );
    }
  }

  // 保持旧版顺序：节点内非人员字段在前，人员字段在后
  for (const fn of nonPerson) fn();
  for (const fn of persons) fn();
}

function buildCustom(ctx: BuildCtx, fields: CustomFieldInput[]): void {
  const { naming, translationDict } = ctx.config;
  const nonPerson: Array<() => void> = [];
  const persons: Array<() => void> = [];

  for (const cf of fields) {
    const chinese = cleanChineseName(cf.chineseName);
    if (!chinese) continue;

    const needsDate = cf.hasDate && cf.type !== 'DATE' && cf.type !== 'DATETIME' && cf.type !== 'TIMESTAMP';
    const suffixes: string[] = [];
    if (cf.isPerson) suffixes.push(naming.nameSuffix);
    if (cf.hasOpinion) suffixes.push(naming.opinionSuffix);
    if (needsDate) suffixes.push(naming.dateSuffix);

    let name: string;
    let warnings: string[] = [];
    const taken = new Set<string>([...ctx.used, ...ctx.reserved]);
    if (cf.englishName.trim()) {
      name = cf.englishName.trim().toLowerCase();
      if (taken.has(name)) warnings.push(`手填英文名 ${name} 已被占用`);
    } else {
      const r = resolveEnglishName(chinese, taken, naming, translationDict, suffixes);
      name = r.name;
      warnings = r.warnings;
    }

    // 预留派生名，避免后续字段抢名；用 reserved 而非 used，否则自身展开会被误判重复
    ctx.reserved.add(name);
    for (const sfx of suffixes) ctx.reserved.add(name + sfx);

    const origin = `custom:${cf.uid}`;
    const typeOverride: Partial<RoleDefault> = { type: cf.type, length: cf.length, scale: cf.scale };

    if (cf.isPerson) {
      persons.push(() =>
        pushPerson(ctx, {
          base: name,
          chinese: cf.chineseName,
          origin,
          originLabel: '自定义',
          warnings,
          // 人员字段的类型/长度输入作用于姓名字段；ID 走全局 personId 默认
          nameOverride: typeOverride,
          withOpinion: cf.hasOpinion,
          withDate: needsDate,
        })
      );
    } else {
      nonPerson.push(() => {
        push(ctx, {
          english: name,
          chinese: cf.chineseName,
          role: cf.type === 'DECIMAL' ? 'amount' : cf.type === 'DATE' ? 'date' : 'text',
          override: typeOverride,
          origin,
          originLabel: '自定义',
          warnings,
        });
        if (cf.hasOpinion) {
          push(ctx, {
            english: name + naming.opinionSuffix,
            chinese: cf.chineseName + '意见',
            role: 'opinion',
            origin,
            originLabel: '自定义',
          });
        }
        if (needsDate) {
          push(ctx, {
            english: name + naming.dateSuffix,
            chinese: cf.chineseName + '日期',
            role: 'date',
            origin,
            originLabel: '自定义',
          });
        }
      });
    }
  }

  for (const fn of nonPerson) fn();
  for (const fn of persons) fn();
}

/**
 * 生成完整字段列表。
 * 顺序：基础字段(前) → 自定义 → 各审批节点 → 基础字段(后)
 */
export function generateFields(input: GenerateInput): GeneratedField[] {
  const { config, tableMode, selectedNodeIds, customFields } = input;
  const ctx: BuildCtx = {
    config,
    used: new Set<string>(),
    reserved: new Set<string>(),
    out: [],
    max: effectiveMaxLength(config.naming),
    seq: 0,
  };

  if (tableMode === 'main') {
    pushFixed(ctx, config.baseFieldsStart, '基础字段');
  } else {
    pushFixed(ctx, config.subTableFields, '子表字段');
  }

  buildCustom(ctx, customFields);

  // 子表不涉及审批节点（用户确认：这是有意为之）
  if (tableMode === 'main') {
    const byId = new Map(config.nodes.map((n) => [n.id, n]));
    for (const id of selectedNodeIds) {
      const node = byId.get(id);
      if (node) buildNode(ctx, node);
    }
    pushFixed(ctx, config.baseFieldsEnd, '基础字段');
  }

  return ctx.out;
}
