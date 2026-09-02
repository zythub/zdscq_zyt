import type { AppConfig, FieldRole, NodeDef, RoleDefaults } from '@/types';

/**
 * 配置基线 —— 团队共享的默认值，随代码发布。
 * 用户的个人改动以 diff 形式存在 localStorage，基线更新后自动生效。
 *
 * 改动基线请同步 +1 SCHEMA_VERSION，界面会提示用户基线已更新。
 */
export const SCHEMA_VERSION = 3;

/** L1 全局默认表：按字段角色定义默认属性 */
export const DEFAULT_ROLE_DEFAULTS: RoleDefaults = {
  personId: { type: 'VARCHAR', length: 50, scale: null, nullable: true, defaultValue: '', comment: '' },
  personName: { type: 'VARCHAR', length: 200, scale: null, nullable: true, defaultValue: '', comment: '' },
  opinion: { type: 'TEXT', length: null, scale: null, nullable: true, defaultValue: '', comment: '' },
  date: { type: 'DATE', length: null, scale: null, nullable: true, defaultValue: '', comment: '' },
  text: { type: 'VARCHAR', length: 50, scale: null, nullable: true, defaultValue: '', comment: '' },
  amount: { type: 'DECIMAL', length: 18, scale: 2, nullable: true, defaultValue: '', comment: '' },
  serial: { type: 'INT', length: null, scale: null, nullable: true, defaultValue: '', comment: '' },
  foreignKey: { type: 'VARCHAR', length: 50, scale: null, nullable: true, defaultValue: '', comment: '' },
};

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

export const DEFAULT_NODES: NodeDef[] = [
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

export const DEFAULT_CONFIG: AppConfig = {
  schemaVersion: SCHEMA_VERSION,
  naming: {
    opinionSuffix: '_yj',
    nameSuffix: '_name',
    dateSuffix: '_date',
    fallbackToFullPinyin: true,
    tablePrefix: 'tud_',
    dialect: 'postgresql',
    maxIdentifierLength: null,
  },
  roleDefaults: DEFAULT_ROLE_DEFAULTS,
  nodes: DEFAULT_NODES,
  baseFieldsStart: [
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
  ],
  baseFieldsEnd: [
    { english: 'fdd_dzqz_file_id', chinese: '签章文件id', role: 'text' },
    { english: 'fdd_dzqz_status', chinese: '签章状态', role: 'text' },
    { english: 'flow_instance_id', chinese: '流程实例ID', role: 'text' },
    { english: 'flow_id', chinese: '流程编号', role: 'text' },
    { english: 'flow_startflag', chinese: '流程状态', role: 'text' },
    { english: 'flow_bizstate', chinese: '流程业务状态', role: 'text' },
  ],
  subTableFields: [
    { english: 'ay_serial', chinese: '序号', role: 'serial' },
    { english: 'zb_id', chinese: '主表_id', role: 'foreignKey' },
  ],
  translationDict: {},
};
