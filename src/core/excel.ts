import * as XLSX from 'xlsx';
import type { GeneratedField } from '@/types';

/**
 * 「表名称」「字段信息」两个 sheet 的表头是下游导入工具的硬性契约，
 * 不得增删列或改名。可变的只是单元格里的值。
 */
const TABLE_SHEET_HEADER = ['表名称', '中文名称', '数据链接名称', '备注'] as const;
const FIELD_SHEET_HEADER = [
  '顺序号',
  '字段名称',
  '中文名称',
  '字段类型',
  '字段长度',
  '小数位数',
  '是否允许null',
  '默认值',
  '备注',
] as const;

export interface ExportInput {
  tableName: string;
  tableChineseName: string;
  dataLinkName: string;
  tableComment: string;
  fields: GeneratedField[];
}

/** 构造两个 sheet 的二维数组，导出与预览共用同一份数据，保证所见即所得 */
export function buildSheets(input: ExportInput): {
  table: (string | number)[][];
  field: (string | number)[][];
} {
  const table: (string | number)[][] = [
    [...TABLE_SHEET_HEADER],
    [input.tableName, input.tableChineseName || input.tableName, input.dataLinkName, input.tableComment],
  ];

  const field: (string | number)[][] = [[...FIELD_SHEET_HEADER]];
  input.fields.forEach((f, i) => {
    field.push([
      i + 1,
      f.english,
      f.chinese,
      f.type,
      f.length ?? '',
      f.scale ?? '',
      f.nullable ? 'YES' : 'NO',
      f.defaultValue ?? '',
      f.comment ?? '',
    ]);
  });

  return { table, field };
}

export function exportExcel(input: ExportInput): string {
  const { table, field } = buildSheets(input);

  const wb = XLSX.utils.book_new();

  const tableWs = XLSX.utils.aoa_to_sheet(table);
  tableWs['!cols'] = [{ wch: 24 }, { wch: 24 }, { wch: 20 }, { wch: 20 }];
  XLSX.utils.book_append_sheet(wb, tableWs, '表名称');

  const fieldWs = XLSX.utils.aoa_to_sheet(field);
  fieldWs['!cols'] = [
    { wch: 8 },
    { wch: 26 },
    { wch: 24 },
    { wch: 12 },
    { wch: 10 },
    { wch: 10 },
    { wch: 13 },
    { wch: 12 },
    { wch: 20 },
  ];
  XLSX.utils.book_append_sheet(wb, fieldWs, '字段信息');

  const fileName = `${input.tableName || '字段定义'}.xlsx`;
  XLSX.writeFile(wb, fileName);
  return fileName;
}
