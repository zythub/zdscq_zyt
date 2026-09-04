import type { AppConfig, FieldRole, NodeDef, PersonFieldTemplate, RoleDefaults } from '@/types';

/**
 * ★ 配置基线 —— 唯一需要维护的配置文件 ★
 *
 * 本工具的所有「配置模板」都写死在本文件里：用户（最终使用者）不提供任何编辑入口，
 * 只通过界面右上「版本」下拉在模板间切换。要新增一套模板：
 *   1. 往下滚到 PRESET_LIST，复制一条已有的 { id, label, config } 条目；
 *   2. 把 config 里的字段 / 节点 / 长度按新模板改好即可（节点可参考下方各 xxx_NODES 常量，
 *      人员字段会自动按该模板的 personTemplate 展开成 _id/_name/_sign/_yj/_date 等）。
 * 添加后请同步在界面下拉里出现新版本（列表顺序即下拉顺序，第一个为默认版本）。
 */
export const SCHEMA_VERSION = 4;

/** L1 全局默认表：按字段角色定义默认属性（南充版本） */
const NANCHONG_ROLE_DEFAULTS: RoleDefaults = {
  personId: { type: 'VARCHAR', length: 100, scale: null, nullable: true, defaultValue: '', comment: '' },
  personName: { type: 'VARCHAR', length: 200, scale: null, nullable: true, defaultValue: '', comment: '' },
  opinion: { type: 'TEXT', length: null, scale: null, nullable: true, defaultValue: '', comment: '' },
  date: { type: 'DATE', length: null, scale: null, nullable: true, defaultValue: '', comment: '' },
  text: { type: 'VARCHAR', length: 50, scale: null, nullable: true, defaultValue: '', comment: '' },
  amount: { type: 'DECIMAL', length: 18, scale: 2, nullable: true, defaultValue: '', comment: '' },
  serial: { type: 'INT', length: null, scale: null, nullable: true, defaultValue: '', comment: '' },
  foreignKey: { type: 'VARCHAR', length: 50, scale: null, nullable: true, defaultValue: '', comment: '' },
};

/** L1 全局默认表：标准版本（人员 id 50 / 姓名 100，与 xlsx 对齐） */
const STANDARD_ROLE_DEFAULTS: RoleDefaults = {
  personId: { type: 'VARCHAR', length: 50, scale: null, nullable: true, defaultValue: '', comment: '' },
  personName: { type: 'VARCHAR', length: 100, scale: null, nullable: true, defaultValue: '', comment: '' },
  opinion: { type: 'TEXT', length: null, scale: null, nullable: true, defaultValue: '', comment: '' },
  date: { type: 'DATE', length: null, scale: null, nullable: true, defaultValue: '', comment: '' },
  text: { type: 'VARCHAR', length: 50, scale: null, nullable: true, defaultValue: '', comment: '' },
  amount: { type: 'DECIMAL', length: 18, scale: 2, nullable: true, defaultValue: '', comment: '' },
  serial: { type: 'INT', length: null, scale: null, nullable: true, defaultValue: '', comment: '' },
  foreignKey: { type: 'VARCHAR', length: 50, scale: null, nullable: true, defaultValue: '', comment: '' },
};

/** 南充版本人员展开：ID(裸) + 姓名 + 签字 */
const NANCHONG_PERSON_TEMPLATE: PersonFieldTemplate[] = [
  { suffix: '', role: 'personId', label: '' },
  { suffix: '_name', role: 'personName', label: '姓名' },
  { suffix: '_sign', role: 'text', label: '签字', override: { type: 'TEXT', length: null } },
];

/** 标准版本人员展开：_id + _name + _sign + _yj + _date（与《标准化表单字段.xlsx》完全一致） */
const STANDARD_PERSON_TEMPLATE: PersonFieldTemplate[] = [
  { suffix: '_id', role: 'personId', label: 'id', override: { type: 'VARCHAR', length: 50 } },
  { suffix: '_name', role: 'personName', label: '姓名', override: { type: 'VARCHAR', length: 100 } },
  { suffix: '_sign', role: 'text', label: '签名图片', override: { type: 'TEXT', length: null } },
  { suffix: '_yj', role: 'opinion', label: '意见' },
  { suffix: '_date', role: 'date', label: '日期' },
];

/** 构造节点的辅助函数，避免重复书写 */
function node(id: string, name: string, group: string, fields: Array<[string, FieldRole] | [string, FieldRole, true]>): NodeDef {
  return {
    id,
    name,
    group,
    fields: fields.map(([fname, role, isPerson]) => ({
      name: fname,
      role,
      isPerson: isPerson === true,
    })),
  };
}

const P = true; // 人员字段标记，提升下方表格可读性

/* ───────────────────────── 南充版本节点 ───────────────────────── */
const NANCHONG_NODES: NodeDef[] = [
  node('sgdw', '施工单位', '参建单位', [
    ['经办人', 'personId', P],
    ['项目技术负责人', 'personId', P],
    ['项目经理', 'personId', P],
    ['经办人日期', 'date'],
  ]),
  node('jldw', '监理单位', '参建单位', [
    ['总监意见', 'opinion'],
    ['专业监理工程师意见', 'opinion'],
    ['专业监理工程师', 'personId', P],
    ['安全监理工程师', 'personId', P],
    ['总监理工程师', 'personId', P],
    ['监理日期', 'date'],
  ]),
  node('sjdw', '设计单位', '参建单位', [
    ['设计单位意见', 'opinion'],
    ['设计代表', 'personId', P],
    ['设计单位日期', 'date'],
  ]),
  node('zjzxdw', '造价咨询单位', '参建单位', [
    ['造价咨询单位意见', 'opinion'],
    ['专业造价工程师', 'personId', P],
    ['造价咨询单位负责人', 'personId', P],
    ['造价咨询单位日期', 'date'],
  ]),
  node('dbgdw', '代保管单位', '参建单位', [
    ['代保管单位意见', 'opinion'],
    ['代保管单位负责人', 'personId', P],
    ['代保管单位日期', 'date'],
  ]),
  node('gcb', '工程部', '建设单位部门', [
    ['工程部审核意见', 'opinion'],
    ['工程部专业工程师', 'personId', P],
    ['工程部部门负责人', 'personId', P],
    ['工程部日期', 'date'],
  ]),
  node('azb', '安质部', '建设单位部门', [
    ['安质部审核意见', 'opinion'],
    ['安质部专业工程师', 'personId', P],
    ['安质部部门负责人', 'personId', P],
    ['安质部日期', 'date'],
  ]),
  node('ajhb', '安健环部', '建设单位部门', [
    ['安健环部审核意见', 'opinion'],
    ['安健环部专业工程师', 'personId', P],
    ['安健环部部门负责人', 'personId', P],
    ['安健环部日期', 'date'],
  ]),
  node('jhb', '计划部', '建设单位部门', [
    ['计划部审核意见', 'opinion'],
    ['计划部专业工程师', 'personId', P],
    ['计划部部门负责人', 'personId', P],
    ['计划部日期', 'date'],
  ]),
  node('dab', '档案部', '建设单位部门', [
    ['档案部审核意见', 'opinion'],
    ['档案部专业工程师', 'personId', P],
    ['档案部部门负责人', 'personId', P],
    ['档案部日期', 'date'],
  ]),
  node('wzb', '物资部', '建设单位部门', [
    ['建设单位物资部意见', 'opinion'],
    ['物资部专业工程师', 'personId', P],
    ['物资部主任', 'personId', P],
    ['物资部日期', 'date'],
  ]),
  node('jsdw', '建设单位', '建设单位', [
    ['建设单位审批意见', 'opinion'],
    ['建设单位代表', 'personId', P],
    ['建设单位日期', 'date'],
  ]),
  node('jsdwznbm', '建设单位职能部门', '建设单位', [
    ['建设单位职能部门审核意见', 'opinion'],
    ['职能部门专业工程师', 'personId', P],
    ['职能部门负责人', 'personId', P],
    ['职能部门日期', 'date'],
  ]),
];

/* ───────────────────────── 标准版本节点 ─────────────────────────
 * 由《标准化表单字段.xlsx·字段信息》整理：19 类审批角色，每类按标准模板展开为
 * _id / _name / _sign / _yj / _date 五个物理字段。中文名经拼音首字母解析，
 * 仅「设计单位」在 translationDict 中显式映射为 sjdb（xlsx 用 sjdb，拼音默认 sjdw）。
 */
const STANDARD_NODES: NodeDef[] = [
  node('sgdw', '施工单位', '参建单位', [
     ['经办人', 'personId', P],   
     ['项目技术负责人', 'personId', P],
    ]),
  node('jldw', '监理单位', '参建单位', [
    ['项目经理', 'personId', P],
    ['专业监理工程师', 'personId', P],
    ['安全监理工程师', 'personId', P],
    ['总监理工程师', 'personId', P],
  ]),
  node('sjdw', '设计单位', '参建单位', [['设计单位', 'personId', P]]),
  node('zjzxdw', '造价咨询单位', '参建单位', [
    ['专业造价工程师', 'personId', P],
    ['造价咨询单位负责人', 'personId', P],
  ]),
  node('dbgdw', '代保管单位', '参建单位', [['代保管单位负责人', 'personId', P]]),
  node('gcb', '工程部', '建设单位部门', [
    ['工程部专业工程师', 'personId', P],
    ['工程部部门负责人', 'personId', P],
  ]),
  node('azb', '安质部', '建设单位部门', [
    ['安质部专业工程师', 'personId', P],
    ['安质部部门负责人', 'personId', P],
  ]),
  node('jhb', '计划部', '建设单位部门', [
    ['计划部专业工程师', 'personId', P],
    ['计划部部门负责人', 'personId', P],
  ]),
  node('wzb', '物资部', '建设单位部门', [
    ['物资部专业工程师', 'personId', P],
    ['物资部负责人', 'personId', P],
  ]),
  node('jsdw', '建设单位', '建设单位部门', [['建设单位负责人', 'personId', P]]),
];

const COMMON_NAMING = {
  opinionSuffix: '_yj',
  nameSuffix: '_name',
  dateSuffix: '_date',
  fallbackToFullPinyin: true,
  tablePrefix: 'tud_',
  dialect: 'postgresql' as const,
  maxIdentifierLength: null,
};

const NANCHONG_BASE_START: AppConfig['baseFieldsStart'] = [
  { english: '_id', chinese: '_id', role: 'text', override: { type: 'VARCHAR', length: 200 } },
  { english: 'specialty', chinese: '专业', role: 'text' },
  { english: 'unit', chinese: '机组', role: 'text' },
  { english: 'project_name', chinese: '工程名称', role: 'text', override: { type: 'VARCHAR', length: 200 } },
  { english: 'number', chinese: '编号', role: 'text' },
  { english: 'bdh', chinese: '表单号', role: 'text' },
  { english: 'zhi', chinese: '致', role: 'text' },
  { english: 'qcdw', chinese: '起草单位', role: 'text', override: { type: 'VARCHAR', length: 100 } },
  { english: 'organization_name', chinese: '单位名称', role: 'text', override: { type: 'VARCHAR', length: 100 } },
  { english: 'company_code', chinese: '单位代码', role: 'text', override: { type: 'VARCHAR', length: 100 } },
  { english: 'contract_name', chinese: '合同名称', role: 'text', override: { type: 'VARCHAR', length: 100 } },
  { english: 'contract_number', chinese: '合同编号', role: 'text', override: { type: 'VARCHAR', length: 100 } },
];

const NANCHONG_BASE_END: AppConfig['baseFieldsEnd'] = [
  { english: 'fdd_dzqz_file_id', chinese: '签章文件id', role: 'text' },
  { english: 'fdd_dzqz_status', chinese: '签章状态', role: 'text' },
  { english: 'flow_instance_id', chinese: '流程实例ID', role: 'text' },
  { english: 'flow_id', chinese: '流程编号', role: 'text' },
  { english: 'flow_startflag', chinese: '流程状态', role: 'text' },
  { english: 'flow_bizstate', chinese: '流程业务状态', role: 'text' },
];

const STANDARD_BASE_START: AppConfig['baseFieldsStart'] = [
  { english: 'specialty', chinese: '专业', role: 'text' },
  { english: 'unit', chinese: '机组', role: 'text' },
  { english: 'project_name', chinese: '工程名称', role: 'text', override: { type: 'VARCHAR', length: 200 } },
  { english: 'number', chinese: '编号', role: 'text' },
  { english: 'bdh', chinese: '表单号', role: 'text' },
  { english: 'zhi', chinese: '致', role: 'text' },
  { english: 'qcdw', chinese: '起草单位', role: 'text', override: { type: 'VARCHAR', length: 50 } },
  { english: 'organization_name', chinese: '单位名称', role: 'text', override: { type: 'VARCHAR', length: 200 } },
  { english: 'company_code', chinese: '单位代码', role: 'text', override: { type: 'VARCHAR', length: 50 } },
  { english: 'contract_name', chinese: '合同名称', role: 'text', override: { type: 'VARCHAR', length: 50 } },
  { english: 'contract_number', chinese: '合同编号', role: 'text', override: { type: 'VARCHAR', length: 50 } },
];

/** 子表默认字段（各版本通用） */
const SUBTABLE_FIELDS: AppConfig['subTableFields'] = [
  { english: 'ay_serial', chinese: '序号', role: 'serial' },
  { english: 'zb_id', chinese: '主表_id', role: 'foreignKey' },
];

/** 一条配置模板（Preset）。id 唯一；label 是界面下拉里的显示名；config 为该模板全部配置。 */
export interface PresetEntry {
  id: string;
  label: string;
  config: AppConfig;
}

/**
 * ★ 全部配置模板清单 ★
 * 列表顺序即界面「版本」下拉的顺序，第一项为默认打开版本。
 * 新增模板 = 在下方复制一条条目并修改 config，无需改其它任何文件。
 */
export const PRESET_LIST: PresetEntry[] = [
  // ── 标准版本（默认，字段取自《标准化表单字段.xlsx》：11 基础字段 + 19 审批角色 × 5 字段）──
  {
    id: 'standard',
    label: '标准版本',
    config: {
      schemaVersion: SCHEMA_VERSION,
      naming: { ...COMMON_NAMING },
      roleDefaults: STANDARD_ROLE_DEFAULTS,
      nodes: STANDARD_NODES,
      baseFieldsStart: STANDARD_BASE_START,
      // 标准版按 xlsx 只含业务字段，不含 _id / fdd_dzqz_* / flow_* 系统字段
      baseFieldsEnd: [],
      subTableFields: SUBTABLE_FIELDS,
      // 「设计单位」在 xlsx 里是 sjdb（拼音首字母默认是 sjdw），用词典显式钉住
      translationDict: { 设计单位: 'sjdb' },
      personTemplate: STANDARD_PERSON_TEMPLATE,
    },
  },
  // ── 南充版本（历史默认字段与审批节点）──
  {
    id: 'nanchong',
    label: '南充版本',
    config: {
      schemaVersion: SCHEMA_VERSION,
      naming: { ...COMMON_NAMING },
      roleDefaults: NANCHONG_ROLE_DEFAULTS,
      nodes: NANCHONG_NODES,
      baseFieldsStart: NANCHONG_BASE_START,
      baseFieldsEnd: NANCHONG_BASE_END,
      subTableFields: SUBTABLE_FIELDS,
      translationDict: {},
      personTemplate: NANCHONG_PERSON_TEMPLATE,
    },
  },
];

/** 默认打开的版本 id（默认取清单第一项 = 标准版本） */
export const DEFAULT_VERSION: string = PRESET_LIST[0].id;

/** id → 配置 的便捷索引（config store 使用） */
export const PRESET_MAP: Record<string, AppConfig> = Object.fromEntries(
  PRESET_LIST.map((p) => [p.id, p.config])
);
