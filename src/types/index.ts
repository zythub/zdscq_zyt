/** 支持的数据库方言 —— 决定标识符长度上限与类型可用性 */
export type Dialect = 'postgresql' | 'mysql' | 'dameng';

/** 各方言的标识符长度上限（字节/字符） */
export const DIALECT_MAX_IDENTIFIER: Record<Dialect, number> = {
  postgresql: 63,
  mysql: 64,
  dameng: 128,
};

/** 字段数据类型 */
export type FieldType =
  | 'VARCHAR'
  | 'CHAR'
  | 'TEXT'
  | 'INT'
  | 'BIGINT'
  | 'DECIMAL'
  | 'DATE'
  | 'DATETIME'
  | 'TIMESTAMP';

/** 不需要长度的类型 */
export const TYPES_WITHOUT_LENGTH: ReadonlySet<FieldType> = new Set<FieldType>([
  'TEXT',
  'DATE',
  'DATETIME',
  'TIMESTAMP',
  'INT',
  'BIGINT',
]);

/** 需要小数位数的类型 */
export const TYPES_WITH_SCALE: ReadonlySet<FieldType> = new Set<FieldType>(['DECIMAL']);

/**
 * 字段角色 —— L1 全局默认表的键。
 * 一个中文字段展开成多个物理字段时，每个物理字段都有明确角色。
 */
export type FieldRole =
  | 'personId' // 人员 ID（存主键）
  | 'personName' // 人员姓名
  | 'opinion' // 意见/审核意见
  | 'date' // 日期
  | 'text' // 普通文本
  | 'amount' // 金额
  | 'serial' // 序号
  | 'foreignKey'; // 外键（如子表的主表_id）

export const FIELD_ROLE_LABEL: Record<FieldRole, string> = {
  personId: '人员 ID',
  personName: '人员姓名',
  opinion: '意见字段',
  date: '日期字段',
  text: '普通文本',
  amount: '金额',
  serial: '序号',
  foreignKey: '外键',
};

/** L1 全局默认值：按角色定义类型、长度、小数位、可空、默认值 */
export interface RoleDefault {
  type: FieldType;
  length: number | null;
  scale: number | null;
  nullable: boolean;
  defaultValue: string;
  comment: string;
}

export type RoleDefaults = Record<FieldRole, RoleDefault>;

/** 审批节点内的一条字段定义（配置层，用户可编辑） */
export interface NodeFieldDef {
  /** 中文名 */
  name: string;
  /** 是否人员字段（会展开成 ID + 姓名两个物理字段） */
  isPerson: boolean;
  /** 该字段的角色，决定默认长度等 */
  role: FieldRole;
  /** 覆盖角色默认值；未设置的项走 L1 */
  override?: Partial<RoleDefault>;
}

/** 审批节点定义 */
export interface NodeDef {
  /** 稳定 ID，重命名节点不影响已选状态 */
  id: string;
  /** 显示名 */
  name: string;
  /** 分组，用于左栏折叠 */
  group: string;
  fields: NodeFieldDef[];
}

/** 固定字段（基础字段前/后段、子表默认字段），英文名由用户直接指定 */
export interface FixedFieldDef {
  english: string;
  chinese: string;
  role: FieldRole;
  override?: Partial<RoleDefault>;
}

/** 用户在界面上快速添加的自定义字段 */
export interface CustomFieldInput {
  /** 客户端唯一 ID */
  uid: string;
  chineseName: string;
  /** 留空则自动拼音生成 */
  englishName: string;
  type: FieldType;
  length: number | null;
  scale: number | null;
  isPerson: boolean;
  hasDate: boolean;
  hasOpinion: boolean;
}

/** 生成结果中的一个物理字段 */
export interface GeneratedField {
  /** 稳定 key，用于表格 diff 与拖拽排序 */
  key: string;
  english: string;
  chinese: string;
  type: FieldType;
  length: number | null;
  scale: number | null;
  nullable: boolean;
  defaultValue: string;
  comment: string;
  role: FieldRole;
  /** 来源：system / custom:{uid} / node:{nodeId} */
  origin: string;
  /** 来源显示名，用于表格分组标签 */
  originLabel: string;
  /** 该字段被用户手动改过的属性名集合 */
  touched: string[];
  /** 生成过程中的告警（撞名降级、超长等） */
  warnings: FieldWarning[];
}

export interface FieldWarning {
  level: 'warn' | 'error';
  message: string;
}

/** 命名策略 */
export interface NamingConfig {
  /** 意见字段后缀 */
  opinionSuffix: string;
  /** 姓名字段后缀 */
  nameSuffix: string;
  /** 日期字段后缀 */
  dateSuffix: string;
  /** 撞名时是否自动降级为全拼 */
  fallbackToFullPinyin: boolean;
  /** 表名前缀 */
  tablePrefix: string;
  /** 目标数据库方言 */
  dialect: Dialect;
  /** 标识符长度上限，null 表示跟随方言 */
  maxIdentifierLength: number | null;
}

/** 完整配置基线 */
export interface AppConfig {
  schemaVersion: number;
  naming: NamingConfig;
  roleDefaults: RoleDefaults;
  nodes: NodeDef[];
  baseFieldsStart: FixedFieldDef[];
  baseFieldsEnd: FixedFieldDef[];
  subTableFields: FixedFieldDef[];
  /** 中文 → 英文 手工映射词典，命中即直接复用 */
  translationDict: Record<string, string>;
}

/** 存进 localStorage 的个人覆盖层：只存改动，不存全量 */
export interface ConfigDiff {
  /** 记录建立 diff 时所基于的基线版本 */
  baseSchemaVersion: number;
  naming?: Partial<NamingConfig>;
  roleDefaults?: Partial<Record<FieldRole, Partial<RoleDefault>>>;
  /** 节点：按 id 覆盖 / 新增 / 标记删除 */
  nodesOverride?: Record<string, NodeDef>;
  nodesAdded?: NodeDef[];
  nodesRemoved?: string[];
  baseFieldsStart?: FixedFieldDef[];
  baseFieldsEnd?: FixedFieldDef[];
  subTableFields?: FixedFieldDef[];
  translationDict?: Record<string, string>;
}

export type TableMode = 'main' | 'sub';
