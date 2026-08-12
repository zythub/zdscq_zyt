"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// src/core/identifier.ts
var import_pinyin_pro = require("pinyin-pro");

// src/types/index.ts
var DIALECT_MAX_IDENTIFIER = {
  postgresql: 63,
  mysql: 64,
  dameng: 128
};
var TYPES_WITHOUT_LENGTH = /* @__PURE__ */ new Set([
  "TEXT",
  "DATE",
  "DATETIME",
  "TIMESTAMP",
  "INT",
  "BIGINT"
]);
var TYPES_WITH_SCALE = /* @__PURE__ */ new Set(["DECIMAL"]);

// src/core/identifier.ts
function cleanChineseName(raw) {
  return raw.trim().replace(/\s+/g, "").replace(/[:：，。；！？、（）()【】\[\]"'`]/g, "");
}
function sanitize(input) {
  let s = input.toLowerCase().replace(/[^a-z0-9_]/g, "_");
  s = s.replace(/_+/g, "_").replace(/^_+|_+$/g, "");
  if (/^\d/.test(s)) s = `f_${s}`;
  return s;
}
function toAcronym(chinese) {
  const text = cleanChineseName(chinese);
  if (!text) return "";
  try {
    const result = (0, import_pinyin_pro.pinyin)(text, { pattern: "first", toneType: "none", type: "string" });
    return sanitize(String(result).replace(/\s+/g, ""));
  } catch {
    return sanitize(text);
  }
}
function toFullPinyin(chinese) {
  const text = cleanChineseName(chinese);
  if (!text) return "";
  try {
    const result = (0, import_pinyin_pro.pinyin)(text, { toneType: "none", type: "string" });
    return sanitize(String(result).replace(/\s+/g, ""));
  } catch {
    return sanitize(text);
  }
}
function effectiveMaxLength(naming) {
  return naming.maxIdentifierLength ?? DIALECT_MAX_IDENTIFIER[naming.dialect];
}
function resolveEnglishName(chinese, used, naming, dict, suffixes = []) {
  const warnings = [];
  const cleaned = cleanChineseName(chinese);
  const max = effectiveMaxLength(naming);
  const allTaken = (base2) => used.has(base2) || suffixes.some((sfx) => used.has(base2 + sfx));
  const longest = (base2) => suffixes.reduce((m, sfx) => Math.max(m, base2.length + sfx.length), base2.length);
  const fromDict = dict[cleaned];
  if (fromDict) {
    const name = sanitize(fromDict);
    if (allTaken(name)) {
      warnings.push(`\u8BCD\u5178\u6620\u5C04\u300C${cleaned} \u2192 ${name}\u300D\u4E0E\u5DF2\u6709\u5B57\u6BB5\u51B2\u7A81\uFF0C\u5DF2\u6539\u7528\u62FC\u97F3`);
    } else {
      if (longest(name) > max) {
        warnings.push(`\u8D85\u51FA ${max} \u5B57\u7B26\u4E0A\u9650\uFF08\u5F53\u524D ${longest(name)}\uFF09`);
      }
      return { name, warnings };
    }
  }
  const acronym = toAcronym(cleaned);
  if (acronym && !allTaken(acronym) && longest(acronym) <= max) {
    return { name: acronym, warnings };
  }
  if (naming.fallbackToFullPinyin) {
    const full = toFullPinyin(cleaned);
    if (full && !allTaken(full)) {
      if (longest(full) <= max) {
        if (acronym && allTaken(acronym)) {
          warnings.push(`\u9996\u5B57\u6BCD ${acronym} \u5DF2\u88AB\u5360\u7528\uFF0C\u964D\u7EA7\u4E3A\u5168\u62FC`);
        }
        return { name: full, warnings };
      }
      const budget = max - Math.max(0, ...suffixes.map((s) => s.length), 0);
      const truncated = full.slice(0, budget).replace(/_+$/, "");
      if (truncated && !allTaken(truncated)) {
        warnings.push(`\u5168\u62FC ${full.length} \u5B57\u7B26\u8D85\u51FA\u4E0A\u9650\uFF0C\u5DF2\u622A\u65AD\u4E3A ${truncated}`);
        return { name: truncated, warnings };
      }
    }
  }
  const base = acronym || toFullPinyin(cleaned) || "field";
  if (!allTaken(base) && longest(base) <= max) {
    return { name: base, warnings };
  }
  for (let i = 2; i < 100; i++) {
    const budget = max - String(i).length - 1 - Math.max(0, ...suffixes.map((s) => s.length), 0);
    const candidate = `${base.slice(0, Math.max(1, budget))}_${i}`;
    if (!allTaken(candidate)) {
      warnings.push(`\u540D\u79F0\u51B2\u7A81\uFF0C\u5DF2\u8FFD\u52A0\u5E8F\u53F7\u540E\u7F00 ${candidate}\uFF08\u5EFA\u8BAE\u624B\u52A8\u6539\u6210\u6709\u8BED\u4E49\u7684\u540D\u5B57\uFF09`);
      return { name: candidate, warnings };
    }
  }
  warnings.push("\u65E0\u6CD5\u751F\u6210\u552F\u4E00\u5B57\u6BB5\u540D\uFF0C\u8BF7\u624B\u52A8\u6307\u5B9A");
  return { name: `${base}_x`, warnings };
}
function buildTableName(chineseTableName, naming) {
  const body = toAcronym(chineseTableName) || "custom_table";
  return `${naming.tablePrefix}${body}`;
}

// src/core/word/infer.ts
var INDEX_COLUMN_PATTERNS = /^(序号|编号|次序|顺序|行号|no\.?|no$|#|index)$/i;
function inferTypeFromChinese(label) {
  if (/意见|说明|备注|内容|描述|结论|审核|审批|签署意见/.test(label)) return { type: "textarea", length: null };
  if (/日期|时间|年月日|年\s*月/.test(label)) return { type: "date", length: null };
  if (/是否|有无|是\/否|同意否/.test(label)) return { type: "checkbox", length: null };
  if (/金额|费用|单价|总价|价款|造价|预算|工资|报价|结算/.test(label)) return { type: "input", length: 18 };
  if (/电话|手机|邮箱|email|邮编|传真/.test(label)) return { type: "input", length: 50 };
  if (/专业|工程师|代表|负责人|经理|总监|签字|姓名|人$/.test(label)) return { type: "input", length: 100 };
  return { type: "input", length: 50 };
}
function inferTypeFromEnglish(name) {
  if (/_yj$/.test(name)) return { type: "textarea", length: null };
  if (/(_date|_rq|rq$|date)/i.test(name)) return { type: "date", length: null };
  if (/_name$/.test(name)) return { type: "input", length: 100 };
  if (/^sfcwd$|_sf$|sfcw/.test(name)) return { type: "radio", length: null };
  if (name === "id") return { type: "input", length: 32 };
  return { type: "input", length: 50 };
}
function splitTextFields(text) {
  return String(text || "").split(/[，,、；;\n\r]+/).map((s) => s.trim().replace(/^["'"]+|["'"]+$/g, "")).filter((s) => s.length > 0);
}

// src/core/word/docx.ts
var import_jszip = __toESM(require("jszip"), 1);
function extractBookmarks(docXml) {
  const names = [];
  const seen = {};
  let m;
  const re = /<w:bookmarkStart\b[^>]*\bw:name="([^"]+)"[^>]*\bw:id="(\d+)"([^>]*)>/g;
  while (m = re.exec(docXml)) {
    const n = m[1];
    if (/^_GoBack$/.test(n) || /^_Toc/.test(n) || seen[n]) continue;
    seen[n] = true;
    names.push(n);
  }
  if (!names.length) {
    const re2 = /<w:bookmarkStart\b[^>]*\bw:id="(\d+)"[^>]*\bw:name="([^"]+)"([^>]*)>/g;
    while (m = re2.exec(docXml)) {
      const n2 = m[2];
      if (/^_GoBack$/.test(n2) || /^_Toc/.test(n2) || seen[n2]) continue;
      seen[n2] = true;
      names.push(n2);
    }
  }
  return names;
}
function labelBeforeBookmark(docXml, name) {
  const bmIdx = docXml.indexOf('w:name="' + name + '"');
  if (bmIdx < 0) return "";
  let lastOpen = -1;
  let mm;
  const openRe = /<w:(tc|p)\b[^>]*>/g;
  while (mm = openRe.exec(docXml)) {
    if (mm.index < bmIdx) lastOpen = mm.index;
    else break;
  }
  if (lastOpen < 0) return "";
  const seg = docXml.slice(lastOpen, bmIdx);
  let txt = "";
  let tm;
  const tre = /<w:t\b[^>]*>([\s\S]*?)<\/w:t>/g;
  while (tm = tre.exec(seg)) txt += tm[1];
  return txt.replace(/\s+/g, " ").replace(/[：:，。、\s]+$/, "").trim();
}
function extractSubtableHeaders(docXml, childBm) {
  const bmIdx = docXml.indexOf('w:name="' + childBm + '"');
  if (bmIdx < 0) return [];
  let tOpen = -1;
  let tm;
  const tre = /<w:tbl\b[^>]*>/g;
  while (tm = tre.exec(docXml)) {
    if (tm.index < bmIdx) tOpen = tm.index;
    else break;
  }
  const tEnd = docXml.indexOf("</w:tbl>", bmIdx);
  if (tOpen < 0 || tEnd < 0) return [];
  const tbl = docXml.slice(tOpen, tEnd + "</w:tbl>".length);
  const rMatch = /<w:tr\b[^>]*>([\s\S]*?)<\/w:tr>/.exec(tbl);
  if (!rMatch) return [];
  const row = rMatch[0];
  const cells = [];
  let cm;
  const cRe = /<w:tc\b[^>]*>([\s\S]*?)<\/w:tc>/g;
  while (cm = cRe.exec(row)) {
    let txt = "";
    let tRe;
    const tRe2 = /<w:t\b[^>]*>([\s\S]*?)<\/w:t>/g;
    while (tRe = tRe2.exec(cm[1])) txt += tRe[1];
    txt = txt.replace(/\s+/g, " ").replace(/[：:，。、\s]+$/, "").trim();
    if (txt) cells.push({ chinese: txt });
  }
  return cells;
}

// src/core/word/designer.ts
var SEED_FIELD_DICT = {
  \u5DE5\u7A0B\u540D\u79F0: "project_name",
  \u7F16\u53F7: "number",
  \u8868\u5355\u53F7: "bdh",
  \u81F4: "zhi",
  \u8D77\u8349\u5355\u4F4D: "qcdw",
  \u5355\u4F4D\u540D\u79F0: "organization_name",
  \u5355\u4F4D\u4EE3\u7801: "company_code",
  \u5408\u540C\u540D\u79F0: "contract_name",
  \u5408\u540C\u7F16\u53F7: "contract_number",
  \u8868\u5355\u540D\u79F0: "bdmc",
  \u662F\u5426\u8D85\u5371\u5927: "sfcwd",
  \u7ECF\u529E\u4EBA: "jbr_name",
  \u9879\u76EE\u7ECF\u7406: "xmjl_name",
  \u7ECF\u529E\u4EBA\u65E5\u671F: "jbrrq",
  \u4E13\u4E1A\u76D1\u7406\u5DE5\u7A0B\u5E08\u610F\u89C1: "zyjlyj",
  \u4E13\u4E1A\u76D1\u7406\u5DE5\u7A0B\u5E08: "zyjlgcs_name",
  \u5B89\u5168\u76D1\u7406\u5DE5\u7A0B\u5E08: "aqjlgcs_name",
  \u603B\u76D1\u7406\u5DE5\u7A0B\u5E08: "fzjlgcs_name",
  \u603B\u76D1\u7406\u5DE5\u7A0B\u5E08\u65E5\u671F: "fzjlgcsrq",
  \u9879\u76EE\u76D1\u7406\u673A\u6784\u5BA1\u67E5\u610F\u89C1: "xmjljgscyj",
  \u76D1\u7406\u65E5\u671F: "jlrq",
  \u5DE5\u7A0B\u90E8\u5BA1\u6838\u610F\u89C1: "gcbshyj",
  \u5DE5\u7A0B\u90E8\u4E13\u4E1A\u5DE5\u7A0B\u5E08: "gcbzygcs_name",
  \u5DE5\u7A0B\u90E8\u90E8\u95E8\u8D1F\u8D23\u4EBA: "gcbbmfzr_name",
  \u5B89\u5065\u73AF\u90E8\u5BA1\u6838\u610F\u89C1: "ajhbshyj",
  \u5B89\u5065\u73AF\u90E8\u4E13\u4E1A\u5DE5\u7A0B\u5E08: "ajhbzygcs_name",
  \u5B89\u5065\u73AF\u90E8\u90E8\u95E8\u8D1F\u8D23\u4EBA: "ajhbbmfzr_name",
  \u5B89\u5065\u73AF\u90E8\u65E5\u671F: "ajhbrq",
  \u5EFA\u8BBE\u5355\u4F4D\u5BA1\u6279\u610F\u89C1: "jsdwspyj",
  \u5EFA\u8BBE\u5355\u4F4D\u4EE3\u8868: "jsdwdb_name",
  \u5EFA\u8BBE\u5355\u4F4D\u65E5\u671F: "jsdwrq",
  \u4E13\u4E1A\u5DE5\u7A0B\u5E08: "zygcs",
  \u5DE5\u7A0B\u90E8\u4E3B\u4EFB: "gcbfzr",
  \u5B89\u8D28\u90E8\u4E13\u4E1A\u5DE5\u7A0B\u5E08: "ajhbzygcs",
  \u5B89\u8D28\u90E8\u4E3B\u4EFB: "ajhbbmfzr"
};
var SEED_TABLE_DICT = {
  \u5371\u5927\u5DE5\u7A0B\u4E13\u9879\u65BD\u5DE5\u65B9\u6848\u62A5\u5BA1\u8868: "wdgczxsgbsb",
  \u5371\u5927\u5DE5\u7A0B\u6E05\u5355\u62A5\u5BA1\u8868: "wdgcqdbsb"
};
var TECH_FIELDS = [
  { english: "id", label: "\u4E3B\u952EID", type: "input", length: 32, lock: true },
  { english: "sys_createtime", label: "\u521B\u5EFA\u65F6\u95F4", type: "input", length: null, lock: true }
];
var GEN_START = [
  { english: "specialty", label: "\u4E13\u4E1A", type: "input", length: 50 },
  { english: "unit", label: "\u673A\u7EC4", type: "input", length: 50 },
  { english: "project_name", label: "\u5DE5\u7A0B\u540D\u79F0", type: "input", length: 50 },
  { english: "number", label: "\u7F16\u53F7", type: "input", length: 50 },
  { english: "bdh", label: "\u8868\u5355\u53F7", type: "input", length: 50 },
  { english: "zhi", label: "\u81F4", type: "input", length: 50 },
  { english: "qcdw", label: "\u8D77\u8349\u5355\u4F4D", type: "input", length: 50 },
  { english: "organization_name", label: "\u5355\u4F4D\u540D\u79F0", type: "input", length: 50 },
  { english: "company_code", label: "\u5355\u4F4D\u4EE3\u7801", type: "input", length: 50 },
  { english: "contract_name", label: "\u5408\u540C\u540D\u79F0", type: "input", length: 50 },
  { english: "contract_number", label: "\u5408\u540C\u7F16\u53F7", type: "input", length: 50 }
];
var EXTRA_BZ = { english: "bz", label: "\u5907\u6CE8", type: "textarea", length: null };
var GEN_END = [
  { english: "fdd_dzqz_file_id", label: "\u7B7E\u7AE0\u6587\u4EF6id", type: "input", length: null },
  { english: "fdd_dzqz_status", label: "\u7B7E\u7AE0\u72B6\u6001", type: "input", length: null },
  { english: "flow_instance_id", label: "\u6D41\u7A0B\u5B9E\u4F8BID", type: "input", length: null },
  { english: "flow_id", label: "\u6D41\u7A0B\u7F16\u53F7", type: "input", length: null },
  { english: "flow_startflag", label: "\u6D41\u7A0B\u72B6\u6001flag", type: "input", length: null },
  { english: "flow_bizstate", label: "\u6D41\u7A0B\u4E1A\u52A1\u72B6\u6001", type: "select", length: null }
];
var BASE_FIELDS = [...TECH_FIELDS, ...GEN_START, EXTRA_BZ, ...GEN_END];
function isValidEn(s) {
  return /^[a-z_][a-z0-9_]*$/i.test(s);
}
function sanitizeEn(s) {
  let out = String(s).toLowerCase().replace(/[^a-z0-9_]/g, "_").replace(/_+/g, "_").replace(/^_+|_+$/g, "");
  if (/^\d/.test(out)) out = "f_" + out;
  return out || "field";
}
function buildTableName2(cn, naming) {
  const mapped = SEED_TABLE_DICT[cn.trim()];
  const body = mapped || toAcronym(cn) || "custom_table";
  return naming.tablePrefix + body;
}
function parse(opts) {
  const docXml = opts.docXml || "";
  const text = opts.text || "";
  const naming = opts.naming;
  const dict = { ...SEED_FIELD_DICT, ...opts.translationDict || {} };
  const mainEn0 = buildTableName2(opts.tableNameCn, naming);
  let mainEn = mainEn0;
  const names = docXml ? extractBookmarks(docXml) : [];
  const childBm = names.find((n) => /_child$/.test(n)) || null;
  let subEn = mainEn + "zb";
  if (childBm) {
    const derived = childBm.replace(/_child$/, "");
    subEn = derived;
    if (/zb$/.test(derived) && derived !== mainEn) mainEn = derived.replace(/zb$/, "");
  }
  const used = /* @__PURE__ */ new Set();
  for (const n of names) {
    if (/_child$/.test(n)) continue;
    const en = isValidEn(n) ? sanitizeEn(n) : sanitizeEn(resolveEnglishName(n, used, naming, dict, []).name);
    used.add(en);
  }
  const fields2 = [];
  for (const f of BASE_FIELDS) {
    if (used.has(f.english)) continue;
    used.add(f.english);
    fields2.push({ kind: "base", english: f.english, label: f.label, type: f.type, length: f.length, lock: f.lock });
  }
  for (const n of names) {
    if (/_child$/.test(n)) continue;
    const label = labelBeforeBookmark(docXml, n) || n;
    let en = isValidEn(n) ? sanitizeEn(n) : sanitizeEn(resolveEnglishName(n, used, naming, dict, []).name);
    used.add(en);
    const inf = inferTypeFromEnglish(en);
    fields2.push({ kind: "main", english: en, label, type: inf.type, length: inf.length });
  }
  for (const piece of splitTextFields(text)) {
    let en = isValidEn(piece) ? sanitizeEn(piece) : sanitizeEn(resolveEnglishName(piece, used, naming, dict, []).name);
    if (used.has(en)) {
      let i = 2;
      while (used.has(`${en}_${i}`)) i++;
      en = `${en}_${i}`;
    }
    used.add(en);
    const inf = inferTypeFromChinese(piece);
    fields2.push({ kind: "main", english: en, label: piece, type: inf.type, length: inf.length });
  }
  if (childBm) {
    const headers = extractSubtableHeaders(docXml, childBm);
    for (const h of headers) {
      if (INDEX_COLUMN_PATTERNS.test(h.chinese.trim())) continue;
      const en = sanitizeEn(resolveEnglishName(h.chinese, used, naming, dict, []).name);
      used.add(en);
      const inf = inferTypeFromChinese(h.chinese);
      fields2.push({ kind: "sub", english: en, label: h.chinese, type: inf.type, length: inf.length });
    }
  }
  return { mainEn, subEn, fields: fields2, warnings: [] };
}

// src/stores/builder.ts
var import_vue2 = require("vue");

// src/stores/config.ts
var import_vue = require("vue");

// src/config/baseline.ts
var SCHEMA_VERSION = 1;
var DEFAULT_ROLE_DEFAULTS = {
  personId: { type: "VARCHAR", length: 50, scale: null, nullable: true, defaultValue: "", comment: "" },
  personName: { type: "VARCHAR", length: 100, scale: null, nullable: true, defaultValue: "", comment: "" },
  opinion: { type: "TEXT", length: null, scale: null, nullable: true, defaultValue: "", comment: "" },
  date: { type: "DATE", length: null, scale: null, nullable: true, defaultValue: "", comment: "" },
  text: { type: "VARCHAR", length: 50, scale: null, nullable: true, defaultValue: "", comment: "" },
  amount: { type: "DECIMAL", length: 18, scale: 2, nullable: true, defaultValue: "", comment: "" },
  serial: { type: "INT", length: null, scale: null, nullable: true, defaultValue: "", comment: "" },
  foreignKey: { type: "VARCHAR", length: 50, scale: null, nullable: true, defaultValue: "", comment: "" }
};
function node(id, name, group, fields2) {
  return {
    id,
    name,
    group,
    fields: fields2.map(([fname, role, isPerson]) => ({
      name: fname,
      role,
      isPerson: isPerson === true
    }))
  };
}
var P = true;
var DEFAULT_NODES = [
  node("sgdw", "\u65BD\u5DE5\u5355\u4F4D", "\u53C2\u5EFA\u5355\u4F4D", [
    ["\u7ECF\u529E\u4EBA", "personId", P],
    ["\u9879\u76EE\u6280\u672F\u8D1F\u8D23\u4EBA", "personId", P],
    ["\u9879\u76EE\u7ECF\u7406", "personId", P],
    ["\u7ECF\u529E\u4EBA\u65E5\u671F", "date"]
  ]),
  node("jldw", "\u76D1\u7406\u5355\u4F4D", "\u53C2\u5EFA\u5355\u4F4D", [
    ["\u603B\u76D1\u610F\u89C1", "opinion"],
    ["\u4E13\u4E1A\u76D1\u7406\u5DE5\u7A0B\u5E08\u610F\u89C1", "opinion"],
    ["\u4E13\u4E1A\u76D1\u7406\u5DE5\u7A0B\u5E08", "personId", P],
    ["\u5B89\u5168\u76D1\u7406\u5DE5\u7A0B\u5E08", "personId", P],
    ["\u603B\u76D1\u7406\u5DE5\u7A0B\u5E08", "personId", P],
    ["\u76D1\u7406\u65E5\u671F", "date"]
  ]),
  node("sjdw", "\u8BBE\u8BA1\u5355\u4F4D", "\u53C2\u5EFA\u5355\u4F4D", [
    ["\u8BBE\u8BA1\u5355\u4F4D\u610F\u89C1", "opinion"],
    ["\u8BBE\u8BA1\u4EE3\u8868", "personId", P],
    ["\u8BBE\u8BA1\u5355\u4F4D\u65E5\u671F", "date"]
  ]),
  node("zjzxdw", "\u9020\u4EF7\u54A8\u8BE2\u5355\u4F4D", "\u53C2\u5EFA\u5355\u4F4D", [
    ["\u9020\u4EF7\u54A8\u8BE2\u5355\u4F4D\u610F\u89C1", "opinion"],
    ["\u4E13\u4E1A\u9020\u4EF7\u5DE5\u7A0B\u5E08", "personId", P],
    ["\u9020\u4EF7\u54A8\u8BE2\u5355\u4F4D\u8D1F\u8D23\u4EBA", "personId", P],
    ["\u9020\u4EF7\u54A8\u8BE2\u5355\u4F4D\u65E5\u671F", "date"]
  ]),
  node("dbgdw", "\u4EE3\u4FDD\u7BA1\u5355\u4F4D", "\u53C2\u5EFA\u5355\u4F4D", [
    ["\u4EE3\u4FDD\u7BA1\u5355\u4F4D\u610F\u89C1", "opinion"],
    ["\u4EE3\u4FDD\u7BA1\u5355\u4F4D\u8D1F\u8D23\u4EBA", "personId", P],
    ["\u4EE3\u4FDD\u7BA1\u5355\u4F4D\u65E5\u671F", "date"]
  ]),
  node("gcb", "\u5DE5\u7A0B\u90E8", "\u5EFA\u8BBE\u5355\u4F4D\u90E8\u95E8", [
    ["\u5DE5\u7A0B\u90E8\u5BA1\u6838\u610F\u89C1", "opinion"],
    ["\u5DE5\u7A0B\u90E8\u4E13\u4E1A\u5DE5\u7A0B\u5E08", "personId", P],
    ["\u5DE5\u7A0B\u90E8\u90E8\u95E8\u8D1F\u8D23\u4EBA", "personId", P],
    ["\u5DE5\u7A0B\u90E8\u65E5\u671F", "date"]
  ]),
  node("azb", "\u5B89\u8D28\u90E8", "\u5EFA\u8BBE\u5355\u4F4D\u90E8\u95E8", [
    ["\u5B89\u8D28\u90E8\u5BA1\u6838\u610F\u89C1", "opinion"],
    ["\u5B89\u8D28\u90E8\u4E13\u4E1A\u5DE5\u7A0B\u5E08", "personId", P],
    ["\u5B89\u8D28\u90E8\u90E8\u95E8\u8D1F\u8D23\u4EBA", "personId", P],
    ["\u5B89\u8D28\u90E8\u65E5\u671F", "date"]
  ]),
  node("ajhb", "\u5B89\u5065\u73AF\u90E8", "\u5EFA\u8BBE\u5355\u4F4D\u90E8\u95E8", [
    ["\u5B89\u5065\u73AF\u90E8\u5BA1\u6838\u610F\u89C1", "opinion"],
    ["\u5B89\u5065\u73AF\u90E8\u4E13\u4E1A\u5DE5\u7A0B\u5E08", "personId", P],
    ["\u5B89\u5065\u73AF\u90E8\u90E8\u95E8\u8D1F\u8D23\u4EBA", "personId", P],
    ["\u5B89\u5065\u73AF\u90E8\u65E5\u671F", "date"]
  ]),
  node("jhb", "\u8BA1\u5212\u90E8", "\u5EFA\u8BBE\u5355\u4F4D\u90E8\u95E8", [
    ["\u8BA1\u5212\u90E8\u5BA1\u6838\u610F\u89C1", "opinion"],
    ["\u8BA1\u5212\u90E8\u4E13\u4E1A\u5DE5\u7A0B\u5E08", "personId", P],
    ["\u8BA1\u5212\u90E8\u90E8\u95E8\u8D1F\u8D23\u4EBA", "personId", P],
    ["\u8BA1\u5212\u90E8\u65E5\u671F", "date"]
  ]),
  node("dab", "\u6863\u6848\u90E8", "\u5EFA\u8BBE\u5355\u4F4D\u90E8\u95E8", [
    ["\u6863\u6848\u90E8\u5BA1\u6838\u610F\u89C1", "opinion"],
    ["\u6863\u6848\u90E8\u4E13\u4E1A\u5DE5\u7A0B\u5E08", "personId", P],
    ["\u6863\u6848\u90E8\u90E8\u95E8\u8D1F\u8D23\u4EBA", "personId", P],
    ["\u6863\u6848\u90E8\u65E5\u671F", "date"]
  ]),
  node("wzb", "\u7269\u8D44\u90E8", "\u5EFA\u8BBE\u5355\u4F4D\u90E8\u95E8", [
    ["\u5EFA\u8BBE\u5355\u4F4D\u7269\u8D44\u90E8\u610F\u89C1", "opinion"],
    ["\u7269\u8D44\u90E8\u4E13\u4E1A\u5DE5\u7A0B\u5E08", "personId", P],
    ["\u7269\u8D44\u90E8\u4E3B\u4EFB", "personId", P],
    ["\u7269\u8D44\u90E8\u65E5\u671F", "date"]
  ]),
  node("jsdw", "\u5EFA\u8BBE\u5355\u4F4D", "\u5EFA\u8BBE\u5355\u4F4D", [
    ["\u5EFA\u8BBE\u5355\u4F4D\u5BA1\u6279\u610F\u89C1", "opinion"],
    ["\u5EFA\u8BBE\u5355\u4F4D\u4EE3\u8868", "personId", P],
    ["\u5EFA\u8BBE\u5355\u4F4D\u65E5\u671F", "date"]
  ]),
  node("jsdwznbm", "\u5EFA\u8BBE\u5355\u4F4D\u804C\u80FD\u90E8\u95E8", "\u5EFA\u8BBE\u5355\u4F4D", [
    ["\u5EFA\u8BBE\u5355\u4F4D\u804C\u80FD\u90E8\u95E8\u5BA1\u6838\u610F\u89C1", "opinion"],
    ["\u804C\u80FD\u90E8\u95E8\u4E13\u4E1A\u5DE5\u7A0B\u5E08", "personId", P],
    ["\u804C\u80FD\u90E8\u95E8\u8D1F\u8D23\u4EBA", "personId", P],
    ["\u804C\u80FD\u90E8\u95E8\u65E5\u671F", "date"]
  ])
];
var DEFAULT_CONFIG = {
  schemaVersion: SCHEMA_VERSION,
  naming: {
    opinionSuffix: "_yj",
    nameSuffix: "_name",
    dateSuffix: "_date",
    fallbackToFullPinyin: true,
    tablePrefix: "tud_",
    dialect: "postgresql",
    maxIdentifierLength: null
  },
  roleDefaults: DEFAULT_ROLE_DEFAULTS,
  nodes: DEFAULT_NODES,
  baseFieldsStart: [
    { english: "specialty", chinese: "\u4E13\u4E1A", role: "text" },
    { english: "unit", chinese: "\u673A\u7EC4", role: "text" },
    { english: "project_name", chinese: "\u5DE5\u7A0B\u540D\u79F0", role: "text" },
    { english: "number", chinese: "\u7F16\u53F7", role: "text" },
    { english: "bdh", chinese: "\u8868\u5355\u53F7", role: "text" },
    { english: "zhi", chinese: "\u81F4", role: "text" },
    { english: "qcdw", chinese: "\u8D77\u8349\u5355\u4F4D", role: "text" },
    { english: "organization_name", chinese: "\u5355\u4F4D\u540D\u79F0", role: "text" },
    { english: "company_code", chinese: "\u5355\u4F4D\u4EE3\u7801", role: "text" },
    { english: "contract_name", chinese: "\u5408\u540C\u540D\u79F0", role: "text" },
    { english: "contract_number", chinese: "\u5408\u540C\u7F16\u53F7", role: "text" }
  ],
  baseFieldsEnd: [
    { english: "fdd_dzqz_file_id", chinese: "\u7B7E\u7AE0\u6587\u4EF6id", role: "text" },
    { english: "fdd_dzqz_status", chinese: "\u7B7E\u7AE0\u72B6\u6001", role: "text" },
    { english: "flow_instance_id", chinese: "\u6D41\u7A0B\u5B9E\u4F8BID", role: "text" },
    { english: "flow_id", chinese: "\u6D41\u7A0B\u7F16\u53F7", role: "text" },
    { english: "flow_startflag", chinese: "\u6D41\u7A0B\u72B6\u6001", role: "text" },
    { english: "flow_bizstate", chinese: "\u6D41\u7A0B\u4E1A\u52A1\u72B6\u6001", role: "text" }
  ],
  subTableFields: [
    { english: "ay_serial", chinese: "\u5E8F\u53F7", role: "serial" },
    { english: "zb_id", chinese: "\u4E3B\u8868_id", role: "foreignKey" }
  ],
  excludedNames: ["\u6CE8", "\u81F4", "\u9644", "\uFF1A"],
  translationDict: {}
};

// src/stores/config.ts
var STORAGE_KEY = "zdscq:config-diff:v1";
function deepClone(v) {
  return JSON.parse(JSON.stringify(v));
}
function loadDiff() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { baseSchemaVersion: SCHEMA_VERSION };
    const parsed = JSON.parse(raw);
    if (typeof parsed !== "object" || parsed === null) {
      return { baseSchemaVersion: SCHEMA_VERSION };
    }
    return { ...parsed, baseSchemaVersion: parsed.baseSchemaVersion ?? SCHEMA_VERSION };
  } catch {
    return { baseSchemaVersion: SCHEMA_VERSION };
  }
}
var diff = (0, import_vue.reactive)(loadDiff());
var baselineUpdated = (0, import_vue.ref)(diff.baseSchemaVersion < SCHEMA_VERSION);
var persistEnabled = true;
(0, import_vue.watch)(
  () => deepClone(diff),
  (v) => {
    if (!persistEnabled) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(v));
    } catch (e) {
      console.warn("\u914D\u7F6E\u4FDD\u5B58\u5931\u8D25", e);
    }
  },
  { deep: true }
);
var config = (0, import_vue.computed)(() => {
  const base = DEFAULT_CONFIG;
  const naming = { ...base.naming, ...diff.naming ?? {} };
  const roleDefaults = {};
  for (const key of Object.keys(base.roleDefaults)) {
    roleDefaults[key] = { ...base.roleDefaults[key], ...diff.roleDefaults?.[key] ?? {} };
  }
  const removed = new Set(diff.nodesRemoved ?? []);
  const nodes = base.nodes.filter((n) => !removed.has(n.id)).map((n) => diff.nodesOverride?.[n.id] ?? n).concat((diff.nodesAdded ?? []).filter((n) => !removed.has(n.id)));
  return {
    schemaVersion: SCHEMA_VERSION,
    naming,
    roleDefaults,
    nodes,
    baseFieldsStart: diff.baseFieldsStart ?? base.baseFieldsStart,
    baseFieldsEnd: diff.baseFieldsEnd ?? base.baseFieldsEnd,
    subTableFields: diff.subTableFields ?? base.subTableFields,
    excludedNames: diff.excludedNames ?? base.excludedNames,
    translationDict: { ...base.translationDict, ...diff.translationDict ?? {} }
  };
});
var overrideCount = (0, import_vue.computed)(() => {
  let n = 0;
  if (diff.naming && Object.keys(diff.naming).length) n += Object.keys(diff.naming).length;
  if (diff.roleDefaults) n += Object.keys(diff.roleDefaults).length;
  if (diff.nodesOverride) n += Object.keys(diff.nodesOverride).length;
  if (diff.nodesAdded?.length) n += diff.nodesAdded.length;
  if (diff.nodesRemoved?.length) n += diff.nodesRemoved.length;
  if (diff.baseFieldsStart) n += 1;
  if (diff.baseFieldsEnd) n += 1;
  if (diff.subTableFields) n += 1;
  if (diff.excludedNames) n += 1;
  if (diff.translationDict && Object.keys(diff.translationDict).length) {
    n += Object.keys(diff.translationDict).length;
  }
  return n;
});

// src/core/generator.ts
function normalize(attrs) {
  const out = { ...attrs };
  if (TYPES_WITHOUT_LENGTH.has(out.type)) out.length = null;
  else if (out.length == null || out.length <= 0) out.length = 50;
  if (!TYPES_WITH_SCALE.has(out.type)) out.scale = null;
  else if (out.scale == null || out.scale < 0) out.scale = 2;
  return out;
}
function resolveAttrs(config2, role, override) {
  const base = config2.roleDefaults[role] ?? config2.roleDefaults.text;
  return normalize({ ...base, ...override ?? {} });
}
function push(ctx, params) {
  const attrs = resolveAttrs(ctx.config, params.role, params.override);
  const warnings = (params.warnings ?? []).map((m) => ({ level: "warn", message: m }));
  if (params.english.length > ctx.max) {
    warnings.push({
      level: "error",
      message: `\u5B57\u6BB5\u540D ${params.english.length} \u5B57\u7B26\uFF0C\u8D85\u51FA\u4E0A\u9650 ${ctx.max}\uFF0C\u5BFC\u5165\u6570\u636E\u5E93\u4F1A\u5931\u8D25`
    });
  }
  if (ctx.used.has(params.english)) {
    warnings.push({ level: "error", message: `\u5B57\u6BB5\u540D\u91CD\u590D\uFF1A${params.english}` });
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
    warnings
  });
}
function pushFixed(ctx, defs, originLabel) {
  for (const def of defs) {
    const warnings = [];
    let english = def.english.trim();
    if (!english) continue;
    if (ctx.used.has(english)) {
      let i = 2;
      while (ctx.used.has(`${english}_${i}`)) i++;
      warnings.push(`\u56FA\u5B9A\u5B57\u6BB5 ${english} \u4E0E\u524D\u9762\u7684\u5B57\u6BB5\u91CD\u540D\uFF0C\u5DF2\u6539\u4E3A ${english}_${i}\uFF0C\u8BF7\u68C0\u67E5\u914D\u7F6E`);
      english = `${english}_${i}`;
    }
    push(ctx, {
      english,
      chinese: def.chinese,
      role: def.role,
      override: def.override,
      origin: "system",
      originLabel,
      warnings
    });
  }
}
function pushPerson(ctx, params) {
  const { naming } = ctx.config;
  if (params.withOpinion) {
    push(ctx, {
      english: params.base + naming.opinionSuffix,
      chinese: params.chinese + "\u610F\u89C1",
      role: "opinion",
      override: params.opinionOverride,
      origin: params.origin,
      originLabel: params.originLabel
    });
  }
  push(ctx, {
    english: params.base,
    chinese: params.chinese,
    role: "personId",
    override: params.idOverride,
    origin: params.origin,
    originLabel: params.originLabel,
    warnings: params.warnings
  });
  push(ctx, {
    english: params.base + naming.nameSuffix,
    chinese: params.chinese + "\u59D3\u540D",
    role: "personName",
    override: params.nameOverride,
    origin: params.origin,
    originLabel: params.originLabel
  });
  if (params.withDate) {
    push(ctx, {
      english: params.base + naming.dateSuffix,
      chinese: params.chinese + "\u65E5\u671F",
      role: "date",
      origin: params.origin,
      originLabel: params.originLabel
    });
  }
}
function buildNode(ctx, node2) {
  const { naming, translationDict, excludedNames } = ctx.config;
  const nonPerson = [];
  const persons = [];
  for (const field of node2.fields) {
    const chinese = cleanChineseName(field.name);
    if (!chinese || excludedNames.includes(chinese)) continue;
    const suffixes = field.isPerson ? [naming.nameSuffix] : [];
    const taken = /* @__PURE__ */ new Set([...ctx.used, ...ctx.reserved]);
    const { name, warnings } = resolveEnglishName(chinese, taken, naming, translationDict, suffixes);
    if (field.isPerson) {
      ctx.reserved.add(name);
      ctx.reserved.add(name + naming.nameSuffix);
      persons.push(
        () => pushPerson(ctx, {
          base: name,
          chinese: field.name,
          origin: `node:${node2.id}`,
          originLabel: node2.name,
          warnings,
          idOverride: field.override,
          nameOverride: field.override
        })
      );
    } else {
      ctx.reserved.add(name);
      nonPerson.push(
        () => push(ctx, {
          english: name,
          chinese: field.name,
          role: field.role,
          override: field.override,
          origin: `node:${node2.id}`,
          originLabel: node2.name,
          warnings
        })
      );
    }
  }
  for (const fn of nonPerson) fn();
  for (const fn of persons) fn();
}
function buildCustom(ctx, fields2) {
  const { naming, translationDict, excludedNames } = ctx.config;
  const nonPerson = [];
  const persons = [];
  for (const cf of fields2) {
    const chinese = cleanChineseName(cf.chineseName);
    if (!chinese || excludedNames.includes(chinese)) continue;
    const needsDate = cf.hasDate && cf.type !== "DATE" && cf.type !== "DATETIME" && cf.type !== "TIMESTAMP";
    const suffixes = [];
    if (cf.isPerson) suffixes.push(naming.nameSuffix);
    if (cf.hasOpinion) suffixes.push(naming.opinionSuffix);
    if (needsDate) suffixes.push(naming.dateSuffix);
    let name;
    let warnings = [];
    const taken = /* @__PURE__ */ new Set([...ctx.used, ...ctx.reserved]);
    if (cf.englishName.trim()) {
      name = cf.englishName.trim().toLowerCase();
      if (taken.has(name)) warnings.push(`\u624B\u586B\u82F1\u6587\u540D ${name} \u5DF2\u88AB\u5360\u7528`);
    } else {
      const r = resolveEnglishName(chinese, taken, naming, translationDict, suffixes);
      name = r.name;
      warnings = r.warnings;
    }
    ctx.reserved.add(name);
    for (const sfx of suffixes) ctx.reserved.add(name + sfx);
    const origin = `custom:${cf.uid}`;
    const typeOverride = { type: cf.type, length: cf.length, scale: cf.scale };
    if (cf.isPerson) {
      persons.push(
        () => pushPerson(ctx, {
          base: name,
          chinese: cf.chineseName,
          origin,
          originLabel: "\u81EA\u5B9A\u4E49",
          warnings,
          // 人员字段的类型/长度输入作用于姓名字段；ID 走全局 personId 默认
          nameOverride: typeOverride,
          withOpinion: cf.hasOpinion,
          withDate: needsDate
        })
      );
    } else {
      nonPerson.push(() => {
        push(ctx, {
          english: name,
          chinese: cf.chineseName,
          role: cf.type === "DECIMAL" ? "amount" : cf.type === "DATE" ? "date" : "text",
          override: typeOverride,
          origin,
          originLabel: "\u81EA\u5B9A\u4E49",
          warnings
        });
        if (cf.hasOpinion) {
          push(ctx, {
            english: name + naming.opinionSuffix,
            chinese: cf.chineseName + "\u610F\u89C1",
            role: "opinion",
            origin,
            originLabel: "\u81EA\u5B9A\u4E49"
          });
        }
        if (needsDate) {
          push(ctx, {
            english: name + naming.dateSuffix,
            chinese: cf.chineseName + "\u65E5\u671F",
            role: "date",
            origin,
            originLabel: "\u81EA\u5B9A\u4E49"
          });
        }
      });
    }
  }
  for (const fn of nonPerson) fn();
  for (const fn of persons) fn();
}
function generateFields(input) {
  const { config: config2, tableMode, selectedNodeIds, customFields } = input;
  const ctx = {
    config: config2,
    used: /* @__PURE__ */ new Set(),
    reserved: /* @__PURE__ */ new Set(),
    out: [],
    max: effectiveMaxLength(config2.naming),
    seq: 0
  };
  if (tableMode === "main") {
    pushFixed(ctx, config2.baseFieldsStart, "\u57FA\u7840\u5B57\u6BB5");
  } else {
    pushFixed(ctx, config2.subTableFields, "\u5B50\u8868\u5B57\u6BB5");
  }
  buildCustom(ctx, customFields);
  if (tableMode === "main") {
    const byId = new Map(config2.nodes.map((n) => [n.id, n]));
    for (const id of selectedNodeIds) {
      const node2 = byId.get(id);
      if (node2) buildNode(ctx, node2);
    }
    pushFixed(ctx, config2.baseFieldsEnd, "\u57FA\u7840\u5B57\u6BB5");
  }
  return ctx.out;
}

// src/stores/builder.ts
var SESSION_KEY = "zdscq:session:v1";
function defaultSession() {
  return {
    tableMode: "main",
    tableChineseName: "",
    dataLinkName: "",
    tableComment: "",
    selectedNodeIds: [],
    customFields: [],
    edits: {},
    manualOrder: []
  };
}
function loadSession() {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    if (!raw) return defaultSession();
    return { ...defaultSession(), ...JSON.parse(raw) };
  } catch {
    return defaultSession();
  }
}
var session = (0, import_vue2.reactive)(loadSession());
(0, import_vue2.watch)(
  () => JSON.parse(JSON.stringify(session)),
  (v) => {
    try {
      localStorage.setItem(SESSION_KEY, JSON.stringify(v));
    } catch (e) {
      console.warn("\u4F1A\u8BDD\u4FDD\u5B58\u5931\u8D25", e);
    }
  },
  { deep: true }
);
var recentlyAdded = (0, import_vue2.ref)(/* @__PURE__ */ new Set());
var uidCounter = 0;
function newUid() {
  return `cf${Date.now().toString(36)}${(uidCounter++).toString(36)}`;
}
function addCustomField(partial) {
  const field = {
    uid: newUid(),
    chineseName: "",
    englishName: "",
    type: "VARCHAR",
    length: 50,
    scale: null,
    isPerson: false,
    hasDate: false,
    hasOpinion: false,
    ...partial
  };
  session.customFields.push(field);
  return field;
}
var DESIGNER_TO_DB = {
  input: { type: "VARCHAR", length: 50 },
  textarea: { type: "TEXT", length: null },
  date: { type: "DATE", length: null },
  checkbox: { type: "VARCHAR", length: 50 },
  select: { type: "VARCHAR", length: 50 },
  radio: { type: "VARCHAR", length: 50 }
};
function addFieldsFromWord(items) {
  const existing = new Set(session.customFields.map((f) => f.englishName));
  const reserved = /* @__PURE__ */ new Set([
    ...config.value.baseFieldsStart.map((f) => f.english),
    ...config.value.baseFieldsEnd.map((f) => f.english)
  ]);
  const added2 = [];
  for (const it of items) {
    if (existing.has(it.english) || reserved.has(it.english)) continue;
    const m = DESIGNER_TO_DB[it.type] ?? DESIGNER_TO_DB.input;
    const f = addCustomField({
      chineseName: it.label,
      englishName: it.english,
      type: m.type,
      length: m.length,
      scale: null,
      isPerson: it.english.endsWith("_name"),
      hasDate: /_(rq|date)$/.test(it.english),
      hasOpinion: /_yj$/.test(it.english)
    });
    existing.add(f.englishName);
    added2.push(f.englishName);
  }
  if (!existing.has("bz") && !reserved.has("bz")) {
    const f = addCustomField({
      chineseName: "\u5907\u6CE8",
      englishName: "bz",
      type: "TEXT",
      length: null,
      scale: null,
      isPerson: false,
      hasDate: false,
      hasOpinion: false
    });
    added2.push(f.englishName);
  }
  return added2;
}
var fields = (0, import_vue2.computed)(() => {
  const generated = generateFields({
    config: config.value,
    tableMode: session.tableMode,
    selectedNodeIds: session.selectedNodeIds,
    customFields: session.customFields
  });
  const merged = generated.map((f) => {
    const edit = session.edits[f.english];
    if (!edit) return f;
    const touched = Object.keys(edit);
    return { ...f, ...edit, touched };
  });
  if (!session.manualOrder.length) return merged;
  const pos = new Map(session.manualOrder.map((name, i) => [name, i]));
  const known = [];
  const fresh = [];
  for (const f of merged) {
    if (pos.has(f.english)) known.push(f);
    else fresh.push(f);
  }
  known.sort((a, b) => (pos.get(a.english) ?? 0) - (pos.get(b.english) ?? 0));
  return [...known, ...fresh];
});
var fullTableName = (0, import_vue2.computed)(
  () => buildTableName(session.tableChineseName, config.value.naming)
);
var problemCount = (0, import_vue2.computed)(() => {
  let errors = 0;
  let warns = 0;
  for (const f of fields.value) {
    for (const w of f.warnings) {
      if (w.level === "error") errors++;
      else warns++;
    }
  }
  return { errors, warns };
});
function resetSession() {
  Object.assign(session, defaultSession());
}
if (typeof window !== "undefined") {
  Object.defineProperty(window, "__builder", {
    get: () => ({
      fields: fields.value,
      problemCount: problemCount.value,
      fullTableName: fullTableName.value,
      session,
      nodeIds: config.value.nodes.map((n) => n.id),
      setNodes: (ids) => {
        session.selectedNodeIds = ids;
      }
    })
  });
}

// word_test3.ts
var import_node_fs = __toESM(require("node:fs"), 1);
resetSession();
session.tableChineseName = "\u6D4B\u8BD5\u8868";
var xml = import_node_fs.default.readFileSync("D:/zyt/tools/wordtojson/word-form-autobookmark/doc_b037.xml", "utf8");
var res = parse({
  docXml: xml,
  tableNameCn: "\u5371\u5927\u5DE5\u7A0B\u6E05\u5355\u62A5\u5BA1\u8868",
  naming: config.value.naming,
  translationDict: config.value.translationDict
});
var mainFields = res.fields.filter((f) => f.kind === "main");
console.log("\u4E66\u7B7E\u89E3\u6790\u51FA\u7684\u4E3B\u8868\u5B57\u6BB5\u6570:", mainFields.length);
var added = addFieldsFromWord(mainFields.map((f) => ({ english: f.english, label: f.label, type: f.type })));
console.log("\u5B9E\u9645\u52A0\u5165\u751F\u6210\u5668\u4E3B\u8868\u6570:", added.length, added.join(","));
var all = fields.value;
var dups = {};
for (const f of all) dups[f.english] = (dups[f.english] || 0) + 1;
var dupNames = Object.entries(dups).filter(([, c]) => c > 1).map(([n]) => n);
console.log("\u751F\u6210\u5668\u603B\u5B57\u6BB5\u6570:", all.length);
console.log("\u91CD\u590D\u5B57\u6BB5:", dupNames.length ? dupNames.join(",") : "\u65E0\uFF08\u53BB\u91CD\u6210\u529F\uFF09");
for (const k of ["number", "project_name", "organization_name", "contract_number", "bz", "specialty", "unit", "id", "sys_createtime"]) {
  const c = all.filter((f) => f.english === k).length;
  console.log(`  ${k}: ${c} \u4E2A` + (c > 1 ? "  <-- \u91CD\u590D!" : ""));
}
