import { parse } from '@/core/word/designer';
import { addFieldsFromWord, fields, session, resetSession } from '@/stores/builder';
import { config } from '@/stores/config';
import fs from 'node:fs';

resetSession();
session.tableChineseName = '测试表';

const xml = fs.readFileSync('D:/zyt/tools/wordtojson/word-form-autobookmark/doc_b037.xml', 'utf8');
const res = parse({
  docXml: xml,
  tableNameCn: '危大工程清单报审表',
  naming: config.value.naming,
  translationDict: config.value.translationDict,
});
const mainFields = res.fields.filter((f) => f.kind === 'main');
console.log('书签解析出的主表字段数:', mainFields.length);

const added = addFieldsFromWord(mainFields.map((f) => ({ english: f.english, label: f.label, type: f.type })));
console.log('实际加入生成器主表数:', added.length, added.join(','));

const all = fields.value;
const dups: Record<string, number> = {};
for (const f of all) dups[f.english] = (dups[f.english] || 0) + 1;
const dupNames = Object.entries(dups).filter(([, c]) => c > 1).map(([n]) => n);
console.log('生成器总字段数:', all.length);
console.log('重复字段:', dupNames.length ? dupNames.join(',') : '无（去重成功）');

for (const k of ['number', 'project_name', 'organization_name', 'contract_number', 'bz', 'specialty', 'unit', 'id', 'sys_createtime']) {
  const c = all.filter((f) => f.english === k).length;
  console.log(`  ${k}: ${c} 个` + (c > 1 ? '  <-- 重复!' : ''));
}
