// 从「已打书签的 Word」或「逗号分隔文字」生成【表单设计器完整树 JSON】。
// 目标格式 = 工作区 json文件/ 样例：{id,type,props,children} 树，每个字段节点带
//   dataTable / dataField / label / 类型 / 校验 / 内嵌渲染代码(modalCode)。
//
// 命名严格沿用原生成器（@/core/identifier 的 resolveEnglishName / buildTableName），
// 并叠加一份种子词典（源自历史样本）做兜底，保证「项目经理→xmjl_name」这类习惯命名一致。
// 基础字段对齐 generator baseline（技术字段 + baseFieldsStart + 默认备注 + baseFieldsEnd）。
//
// 对外两个入口：
//   parse(opts)    —— 解析 docx 书签 / 文字，产出可编辑字段列表（供复核 UI）
//   generate(...)  —— 依据（可能改过的）字段列表，生成最终设计器树 JSON
import { resolveEnglishName, toAcronym } from '@/core/identifier';
import type { NamingConfig } from '@/types';
import { DESIGNER_TEMPLATE } from './designerTemplate';
import {
  inferTypeFromChinese,
  inferTypeFromEnglish,
  splitTextFields,
  INDEX_COLUMN_PATTERNS,
  type DesignerFieldType,
} from './infer';
import { extractBookmarks, labelBeforeBookmark, extractSubtableHeaders } from './docx';

export type { DesignerFieldType } from './infer';

/** 复核 UI 里的一行可编辑字段 */
export interface EditableField {
  kind: 'base' | 'main' | 'sub';
  english: string;
  label: string;
  type: DesignerFieldType;
  length: number | null;
  /** 仅 UI 锁定（技术字段 id / 创建时间） */
  lock?: boolean;
}

export interface ParseOptions {
  docXml?: string;
  text?: string;
  tableNameCn: string;
  naming: NamingConfig;
  /** 用户个人中文→英文映射（来自配置中心），覆盖种子词典 */
  translationDict?: Record<string, string>;
}

export interface ParseResult {
  mainEn: string;
  subEn: string;
  fields: EditableField[];
  warnings: string[];
}

export interface DesignerNode {
  id: string;
  type: string;
  props: Record<string, unknown>;
  children: DesignerNode[];
}

export interface GenerateResult {
  json: DesignerNode;
  mainCount: number;
  sysCount: number;
  subCount: number;
}

// ── 种子词典（源自历史样本 + baseline，做命名兜底）──
const SEED_FIELD_DICT: Record<string, string> = {
  工程名称: 'project_name',
  编号: 'number',
  表单号: 'bdh',
  致: 'zhi',
  起草单位: 'qcdw',
  单位名称: 'organization_name',
  单位代码: 'company_code',
  合同名称: 'contract_name',
  合同编号: 'contract_number',
  表单名称: 'bdmc',
  是否超危大: 'sfcwd',
  经办人: 'jbr_name',
  项目经理: 'xmjl_name',
  经办人日期: 'jbrrq',
  专业监理工程师意见: 'zyjlyj',
  专业监理工程师: 'zyjlgcs_name',
  安全监理工程师: 'aqjlgcs_name',
  总监理工程师: 'fzjlgcs_name',
  总监理工程师日期: 'fzjlgcsrq',
  项目监理机构审查意见: 'xmjljgscyj',
  监理日期: 'jlrq',
  工程部审核意见: 'gcbshyj',
  工程部专业工程师: 'gcbzygcs_name',
  工程部部门负责人: 'gcbbmfzr_name',
  安健环部审核意见: 'ajhbshyj',
  安健环部专业工程师: 'ajhbzygcs_name',
  安健环部部门负责人: 'ajhbbmfzr_name',
  安健环部日期: 'ajhbrq',
  建设单位审批意见: 'jsdwspyj',
  建设单位代表: 'jsdwdb_name',
  建设单位日期: 'jsdwrq',
  专业工程师: 'zygcs',
  工程部主任: 'gcbfzr',
  安质部专业工程师: 'ajhbzygcs',
  安质部主任: 'ajhbbmfzr',
};

const SEED_TABLE_DICT: Record<string, string> = {
  危大工程专项施工方案报审表: 'wdgczxsgbsb',
  危大工程清单报审表: 'wdgcqdbsb',
};

/** 自动生成的字段中文标签最多 10 个字（用户手动修改不受限） */
const LABEL_MAX = 10;
function capLabel(s: string): string {
  const t = (s || '').trim();
  return t.length > LABEL_MAX ? t.slice(0, LABEL_MAX) : t;
}

interface BaseFieldSpec {
  english: string;
  label: string;
  type: DesignerFieldType;
  length: number | null;
  lock?: boolean;
}

const TECH_FIELDS: BaseFieldSpec[] = [
  { english: 'id', label: '主键ID', type: 'input', length: 32, lock: true },
  { english: 'sys_createtime', label: '创建时间', type: 'input', length: null, lock: true },
];
const GEN_START: BaseFieldSpec[] = [
  { english: 'specialty', label: '专业', type: 'input', length: 50 },
  { english: 'unit', label: '机组', type: 'input', length: 50 },
  { english: 'project_name', label: '工程名称', type: 'input', length: 50 },
  { english: 'number', label: '编号', type: 'input', length: 50 },
  { english: 'bdh', label: '表单号', type: 'input', length: 50 },
  { english: 'zhi', label: '致', type: 'input', length: 50 },
  { english: 'qcdw', label: '起草单位', type: 'input', length: 50 },
  { english: 'organization_name', label: '单位名称', type: 'input', length: 50 },
  { english: 'company_code', label: '单位代码', type: 'input', length: 50 },
  { english: 'contract_name', label: '合同名称', type: 'input', length: 50 },
  { english: 'contract_number', label: '合同编号', type: 'input', length: 50 },
];
// 用户要求的默认「备注」字段（可填写多行 → textarea，保证导入后可录入）
const EXTRA_BZ: BaseFieldSpec = { english: 'bz', label: '备注', type: 'textarea', length: null };
const GEN_END: BaseFieldSpec[] = [
  { english: 'fdd_dzqz_file_id', label: '签章文件id', type: 'input', length: null },
  { english: 'fdd_dzqz_status', label: '签章状态', type: 'input', length: null },
  { english: 'flow_instance_id', label: '流程实例ID', type: 'input', length: null },
  { english: 'flow_id', label: '流程编号', type: 'input', length: null },
  { english: 'flow_startflag', label: '流程状态flag', type: 'input', length: null },
  { english: 'flow_bizstate', label: '流程业务状态', type: 'select', length: null },
];
const BASE_FIELDS: BaseFieldSpec[] = [...TECH_FIELDS, ...GEN_START, EXTRA_BZ, ...GEN_END];

// ── 工具 ──
function isValidEn(s: string): boolean {
  return /^[a-z_][a-z0-9_]*$/i.test(s);
}
function sanitizeEn(s: string): string {
  let out = String(s)
    .toLowerCase()
    .replace(/[^a-z0-9_]/g, '_')
    .replace(/_+/g, '_')
    .replace(/^_+|_+$/g, '');
  if (/^\d/.test(out)) out = 'f_' + out;
  return out || 'field';
}
function genId(type: string): string {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let s = '';
  for (let i = 0; i < 17; i++) s += chars[Math.floor(Math.random() * chars.length)];
  return `${type}_${s}`;
}
function template(type: string): Record<string, unknown> {
  const props = DESIGNER_TEMPLATE[type] || {};
  return JSON.parse(JSON.stringify(props));
}
function buildTableName(cn: string, naming: NamingConfig): string {
  const mapped = SEED_TABLE_DICT[cn.trim()];
  const body = mapped || toAcronym(cn) || 'custom_table';
  return naming.tablePrefix + body;
}

/** 解析：书签/文字 → 可编辑字段列表（含基础字段，自动去重） */
export function parse(opts: ParseOptions): ParseResult {
  const docXml = opts.docXml || '';
  const text = opts.text || '';
  const naming = opts.naming;
  const dict = { ...SEED_FIELD_DICT, ...(opts.translationDict || {}) };
  const mainEn0 = buildTableName(opts.tableNameCn, naming);
  let mainEn = mainEn0;

  const names = docXml ? extractBookmarks(docXml) : [];
  const childBm = names.find((n) => /_child$/.test(n)) || null;

  let subEn = mainEn + 'zb';
  if (childBm) {
    const derived = childBm.replace(/_child$/, '');
    subEn = derived;
    if (/zb$/.test(derived) && derived !== mainEn) mainEn = derived.replace(/zb$/, '');
  }

  const used = new Set<string>();
  // 先登记书签英文名（与基础字段去重）
  for (const n of names) {
    if (/_child$/.test(n)) continue;
    const en = isValidEn(n)
      ? sanitizeEn(n)
      : sanitizeEn(resolveEnglishName(n, used, naming, dict, []).name);
    used.add(en);
  }

  const fields: EditableField[] = [];

  // 基础字段（技术 + 前组 + 备注 + 后组），与书签去重
  for (const f of BASE_FIELDS) {
    if (used.has(f.english)) continue;
    used.add(f.english);
    fields.push({ kind: 'base', english: f.english, label: f.label, type: f.type, length: f.length, lock: f.lock });
  }

  // 主表字段：书签
  for (const n of names) {
    if (/_child$/.test(n)) continue;
    const label = capLabel(labelBeforeBookmark(docXml, n) || n);
    let en = isValidEn(n)
      ? sanitizeEn(n)
      : sanitizeEn(resolveEnglishName(n, used, naming, dict, []).name);
    used.add(en);
    const inf = inferTypeFromEnglish(en);
    fields.push({ kind: 'main', english: en, label, type: inf.type, length: inf.length });
  }
  // 主表字段：文字模式
  for (const piece of splitTextFields(text)) {
    let en = isValidEn(piece)
      ? sanitizeEn(piece)
      : sanitizeEn(resolveEnglishName(piece, used, naming, dict, []).name);
    if (used.has(en)) {
      let i = 2;
      while (used.has(`${en}_${i}`)) i++;
      en = `${en}_${i}`;
    }
    used.add(en);
    const inf = inferTypeFromChinese(piece);
    fields.push({ kind: 'main', english: en, label: capLabel(piece), type: inf.type, length: inf.length });
  }

  // 子表字段
  if (childBm) {
    const headers = extractSubtableHeaders(docXml, childBm);
    for (const h of headers) {
      if (INDEX_COLUMN_PATTERNS.test(h.chinese.trim())) continue; // 序号列 → ay_serial，跳过
      const en = sanitizeEn(resolveEnglishName(h.chinese, used, naming, dict, []).name);
      used.add(en);
      const inf = inferTypeFromChinese(h.chinese);
      fields.push({ kind: 'sub', english: en, label: capLabel(h.chinese), type: inf.type, length: inf.length });
    }
  }

  return { mainEn, subEn, fields, warnings: [] };
}

function buildFieldNode(
  type: DesignerFieldType,
  dataTable: string,
  dataField: string,
  label: string,
  length: number | null,
  isSub: boolean
): DesignerNode {
  const props = template(type);
  props.dataTable = dataTable;
  props.dataField = dataField;
  props.label = label;
  if (length !== undefined) props.fieldLength = length;
  const id = genId(type);
  props.dataBind = id;
  if (isSub) props.isInSubForm = true;
  return { id, type, props, children: [] };
}

function rowsOf(nodes: DesignerNode[], perRow = 3): DesignerNode[] {
  const rows: DesignerNode[] = [];
  for (let i = 0; i < nodes.length; i += perRow) {
    const row: DesignerNode = { id: genId('row'), type: 'row', props: template('row'), children: [] };
    nodes.slice(i, i + perRow).forEach((nd) => {
      row.children.push({ id: genId('col'), type: 'col', props: template('col'), children: [nd] });
    });
    rows.push(row);
  }
  return rows;
}

/** 依据（可能改过的）字段列表，生成最终设计器树 JSON */
export function generate(fields: EditableField[], mainEn: string, subEn: string): GenerateResult {
  const baseNodes = fields
    .filter((f) => f.kind === 'base')
    .map((f) => buildFieldNode(f.type, mainEn, f.english, f.label, f.length, false));
  const mainNodes = fields
    .filter((f) => f.kind === 'main')
    .map((f) => buildFieldNode(f.type, mainEn, f.english, f.label, f.length, false));
  const subNodes = fields
    .filter((f) => f.kind === 'sub')
    .map((f) => buildFieldNode(f.type, subEn, f.english, f.label, f.length, true));

  const formNode: DesignerNode = { id: genId('form'), type: 'form', props: template('form'), children: [] };
  const collapse: DesignerNode = { id: genId('collapse'), type: 'collapse', props: template('collapse'), children: [] };

  const paneBase: DesignerNode = {
    id: genId('collapse-pane'),
    type: 'collapse-pane',
    props: { ...template('collapse-pane'), label: '基础字段' },
    children: [],
  };
  rowsOf(baseNodes, 6).forEach((r) => paneBase.children.push(r));

  const paneMain: DesignerNode = {
    id: genId('collapse-pane'),
    type: 'collapse-pane',
    props: { ...template('collapse-pane'), label: '表单字段' },
    children: [],
  };
  rowsOf(mainNodes, 2).forEach((r) => paneMain.children.push(r));

  collapse.children.push(paneBase, paneMain);
  formNode.children.push(collapse);

  if (subNodes.length) {
    const st = template('subtable');
    const stId = genId('subtable');
    st.dataTable = subEn;
    st.dataField = '';
    st.label = '明细子表';
    st.dataBind = stId;
    st.visibleIndexColumnField = 'ay_serial';
    formNode.children.push({ id: stId, type: 'subtable', props: st, children: subNodes });
  }

  return {
    json: formNode,
    mainCount: mainNodes.length,
    sysCount: baseNodes.length,
    subCount: subNodes.length,
  };
}
