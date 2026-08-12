// 类型推断：把中文标签 / 英文书签名 推断成「表单设计器」的组件类型与长度。
// 设计器组件类型：input(单行文本) / textarea(多行文本) / date(日期) / checkbox(勾选)
//                 / select(下拉) / radio(单选)。office / subtable 等为系统节点，不自动生成。

export type DesignerFieldType = 'input' | 'textarea' | 'date' | 'checkbox' | 'select' | 'radio';

export interface InferredType {
  type: DesignerFieldType;
  length: number | null;
}

/** 子表表头里像「序号/编号/次序」这类列 → 设计器用 ay_serial 自动渲染行号，不作为真实字段 */
export const INDEX_COLUMN_PATTERNS = /^(序号|编号|次序|顺序|行号|no\.?|no$|#|index)$/i;

/** 按中文标签推断类型（用于文字模式字段、子表表头列） */
export function inferTypeFromChinese(label: string): InferredType {
  if (/意见|说明|备注|内容|描述|结论|审核|审批|签署意见/.test(label)) return { type: 'textarea', length: null };
  if (/日期|时间|年月日|年\s*月/.test(label)) return { type: 'date', length: null };
  if (/是否|有无|是\/否|同意否/.test(label)) return { type: 'checkbox', length: null };
  if (/金额|费用|单价|总价|价款|造价|预算|工资|报价|结算/.test(label)) return { type: 'input', length: 18 };
  if (/电话|手机|邮箱|email|邮编|传真/.test(label)) return { type: 'input', length: 50 };
  if (/专业|工程师|代表|负责人|经理|总监|签字|姓名|人$/.test(label)) return { type: 'input', length: 100 };
  return { type: 'input', length: 50 };
}

/** 按英文书签名推断类型（用于已打书签的字段） */
export function inferTypeFromEnglish(name: string): InferredType {
  if (/_yj$/.test(name)) return { type: 'textarea', length: null };
  if (/(_date|_rq|rq$|date)/i.test(name)) return { type: 'date', length: null };
  if (/_name$/.test(name)) return { type: 'input', length: 100 };
  if (/^sfcwd$|_sf$|sfcw/.test(name)) return { type: 'radio', length: null };
  if (name === 'id') return { type: 'input', length: 32 };
  return { type: 'input', length: 50 };
}

/** 把逗号/，/顿号/分号/换行分隔的文字拆成字段标签 */
export function splitTextFields(text: string): string[] {
  return String(text || '')
    .split(/[，,、；;\n\r]+/)
    .map((s) => s.trim().replace(/^["'"]+|["'"]+$/g, ''))
    .filter((s) => s.length > 0);
}
