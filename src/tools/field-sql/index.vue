<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue';
import {
  NForm,
  NFormItem,
  NInput,
  NSelect,
  NInputNumber,
  NButton,
  NAlert,
  NScrollbar,
  useMessage,
} from 'naive-ui';
import { config } from '@/stores/config';
import { resolveEnglishName } from '@/core/identifier';
import { splitTextFields, inferTypeFromChinese, type DesignerFieldType } from '@/core/word/infer';

const message = useMessage();

interface FieldRow {
  tableName: string; // 表名
  fieldName: string; // 字段名（英文）
  fieldDesc: string; // 字段描述（中文）
  dbType: string; // 字段类型（dy_table_field 第 5 列）
  length: number | null; // 字段长度（第 6 列；TEXT/DATE/BOOLEAN/INT 为 NULL）
  sort: number; // 排序
  id: string; // 主键 id
  warn: string; // 命名告警
}

const TYPE_OPTIONS = [
  { label: 'VARCHAR', value: 'VARCHAR' },
  { label: 'INT', value: 'INT' },
  { label: 'TEXT', value: 'TEXT' },
  { label: 'DATE', value: 'DATE' },
  { label: 'BOOLEAN', value: 'BOOLEAN' },
  { label: 'DECIMAL', value: 'DECIMAL' },
];

const NO_LEN_TYPES = new Set(['TEXT', 'DATE', 'BOOLEAN', 'INT']);

// ── 顶部公共表名 + 批量粘贴 ──
const globalTable = ref(''); // 应用到新解析行的表名
const batchText = ref(''); // 用户一次性粘贴的多个字段

// ── 字段信息表格（可在表格内直接改）──
const rows = ref<FieldRow[]>([]);

// 打开页面时初始化一次时间
const genTime = ref('');

function randId(): string {
  const hex = '0123456789abcdef';
  let s = '';
  const buf = new Uint8Array(32);
  if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
    crypto.getRandomValues(buf);
    for (let i = 0; i < 32; i++) s += hex[buf[i] % 16];
  } else {
    for (let i = 0; i < 32; i++) s += hex[Math.floor(Math.random() * 16)];
  }
  return s;
}

function nowStamp(): string {
  const d = new Date();
  const p = (n: number, l = 2) => String(n).padStart(l, '0');
  return (
    `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())} ` +
    `${p(d.getHours())}:${p(d.getMinutes())}:${p(d.getSeconds())}.${p(d.getMilliseconds(), 3)}`
  );
}

// 设计器组件类型 → SQL 字段类型 + 默认长度
function mapDesignerToDb(d: DesignerFieldType, len: number | null): { dbType: string; length: number | null } {
  switch (d) {
    case 'textarea':
      return { dbType: 'TEXT', length: null };
    case 'date':
      return { dbType: 'DATE', length: null };
    case 'checkbox':
      return { dbType: 'BOOLEAN', length: null };
    case 'select':
    case 'radio':
      return { dbType: 'VARCHAR', length: len ?? 100 };
    case 'input':
    default:
      return { dbType: 'VARCHAR', length: len ?? 100 };
  }
}

// ALTER 列类型（跟随字段类型 + 长度）
function alterType(dbType: string, len: number | null): string {
  switch (dbType) {
    case 'VARCHAR':
      return `varchar(${len ?? 255})`;
    case 'INT':
      return 'integer';
    case 'TEXT':
      return 'text';
    case 'DATE':
      return 'date';
    case 'BOOLEAN':
      return 'boolean';
    case 'DECIMAL':
      return 'numeric(18,2)';
    default:
      return 'varchar(255)';
  }
}

function isLenless(t: string): boolean {
  return NO_LEN_TYPES.has(t);
}

// 新增行的默认排序号：取当前最大 + 1，起步 50（第一条 50、第二条 51…不重复）
function nextSort(): number {
  if (!rows.value.length) return 50;
  const max = Math.max(...rows.value.map((r) => r.sort));
  return Math.max(max, 49) + 1;
}

// ── 批量解析：粘贴的中文 → 自动出英文 + 类型 + 表格 ──
function parseBatch(): void {
  const labels = splitTextFields(batchText.value);
  if (!labels.length) {
    message.warning('请输入至少一个字段');
    return;
  }
  const used = new Set<string>();
  const base = globalTable.value.trim() || 'tud_table';
  let sortSeed = nextSort();
  const newRows: FieldRow[] = labels.map((label) => {
    const r = resolveEnglishName(label, used, config.value.naming, config.value.translationDict, ['_name', '_yj', '_date']);
    used.add(r.name);
    const inf = inferTypeFromChinese(label);
    const db = mapDesignerToDb(inf.type, inf.length);
    return {
      tableName: base,
      fieldName: r.name,
      fieldDesc: label,
      dbType: db.dbType,
      length: db.length,
      sort: sortSeed++,
      id: randId(),
      warn: r.warnings.join('；'),
    };
  });
  rows.value = newRows;
  genTime.value = nowStamp();
  message.success(`已解析 ${newRows.length} 个字段，可在表格内修改后再生成 SQL`);
}

// 手动新增一行
function addRow(): void {
  rows.value.push({
    tableName: globalTable.value.trim() || 'tud_table',
    fieldName: '',
    fieldDesc: '',
    dbType: 'VARCHAR',
    length: 255,
    sort: nextSort(),
    id: randId(),
    warn: '',
  });
  genTime.value = genTime.value || nowStamp();
}

function removeRow(i: number): void {
  rows.value.splice(i, 1);
}

// 重新生成时间 + 每行主键 id
function regen(): void {
  genTime.value = nowStamp();
  rows.value.forEach((r) => (r.id = randId()));
  message.info('已重新生成 主键ID 与 当前时间');
}

const warnRows = computed(() => rows.value.filter((r) => r.warn));

// ── 生成 SQL（其余字段保持模板原值：table_id / 创建人等）──
const sqlText = computed(() => {
  if (!rows.value.length || !genTime.value) return '';
  const time = genTime.value;
  return rows.value
    .map((r) => {
      const len = r.length != null ? r.length : 'NULL';
      return (
        `INSERT INTO "dy_table_field" VALUES (\n` +
        `  '${r.id}', (select id from dy_table where name = '${r.tableName}'),\n` +
        `  '${r.fieldName}',\n` +
        `  '${r.fieldDesc}',\n` +
        `  '${r.dbType}', ${len}, NULL, 1, NULL,\n` +
        `  ${r.sort},\n` +
        `  NULL, '${time}', '857c179f6afb2920cafe02f9891d6476', '${time}', '857c179f6afb2920cafe02f9891d6476', FALSE);\n\n` +
        `ALTER TABLE "${r.tableName}" ADD COLUMN "${r.fieldName}" ${alterType(r.dbType, r.length)};\n` +
        `COMMENT ON COLUMN "${r.tableName}"."${r.fieldName}" IS '${r.fieldDesc}';`
      );
    })
    .join('\n\n');
});

const missing = computed(() => !rows.value.length);

watch(
  () => rows.value.length,
  () => {
    if (!genTime.value) genTime.value = nowStamp();
  }
);

onMounted(() => {
  genTime.value = nowStamp();
});

async function copySql(): Promise<void> {
  if (missing.value) {
    message.warning('请先解析 / 添加字段');
    return;
  }
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(sqlText.value);
    } else {
      const ta = document.createElement('textarea');
      ta.value = sqlText.value;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
    }
    message.success(`已复制 ${rows.value.length} 条 SQL 到剪贴板`);
  } catch {
    message.error('复制失败，请手动选择文本复制');
  }
}
</script>

<template>
  <div class="page">
    <div class="page-head">
      <h2>生成新增字段 SQL</h2>
      <p>批量粘贴字段 → 自动出英文与类型 → 在表格内核对 → 一键生成 INSERT / ALTER / COMMENT SQL。</p>
    </div>

    <div class="wrap">
      <NForm :show-feedback="false" label-placement="top">
        <NFormItem label="表名（应用到新行）">
          <NInput
            v-model:value="globalTable"
            placeholder="如 tud_b07new（解析 / 新增的行默认带这个表名，可在表格内逐行改）"
            clearable
          />
        </NFormItem>
      </NForm>

      <div class="batch">
        <div class="batch-head">
          <span class="lbl">批量粘贴字段（逗号 / 换行 / 顿号分隔）</span>
          <NButton size="small" type="primary" @click="parseBatch">解析生成字段</NButton>
        </div>
        <NInput
          v-model:value="batchText"
          type="textarea"
          :rows="3"
          placeholder="如：专业监理工程师姓名，安全监理工程师姓名，总监理工程师姓名"
        />
      </div>

      <div class="tbl-head">
        <span class="lbl">字段信息（可直接在表格内修改，改完再生成 SQL）</span>
        <NButton size="small" secondary @click="addRow">+ 新增一行</NButton>
      </div>

      <!-- 原生滚动容器：横竖都可滚，列再多 / 屏再窄也不会被裁掉 -->
      <div class="tbl-scroll">
        <table class="ft" v-if="rows.length">
          <thead>
            <tr>
              <th class="c-idx">序号</th>
              <th class="c-table">表名</th>
              <th class="c-field">字段名（英文）</th>
              <th class="c-desc">字段描述（中文）</th>
              <th class="c-type">类型</th>
              <th class="c-len">长度</th>
              <th class="c-sort">排序</th>
              <th class="c-act"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(r, i) in rows" :key="i">
              <td class="idx">{{ i + 1 }}</td>
              <td><NInput v-model:value="r.tableName" size="small" /></td>
              <td><NInput v-model:value="r.fieldName" size="small" /></td>
              <td><NInput v-model:value="r.fieldDesc" size="small" /></td>
              <td><NSelect v-model:value="r.dbType" :options="TYPE_OPTIONS" size="small" /></td>
              <td>
                <NInputNumber
                  v-model:value="r.length"
                  size="small"
                  :min="0"
                  :max="4000"
                  :disabled="isLenless(r.dbType)"
                  style="width: 100%"
                />
              </td>
              <td><NInputNumber v-model:value="r.sort" size="small" :min="0" :max="9999" style="width: 100%" /></td>
              <td><NButton size="small" text type="error" @click="removeRow(i)">删除</NButton></td>
            </tr>
          </tbody>
        </table>
        <div class="empty" v-else>粘贴字段并点击「解析生成字段」，或点「新增一行」手动添加…</div>
      </div>

      <div class="warn-list" v-if="warnRows.length">
        <div class="warn-item" v-for="(r, i) in warnRows" :key="i">⚠ {{ r.fieldDesc }}：{{ r.warn }}</div>
      </div>

      <NAlert type="warning" :show-icon="true" style="margin: 12px 0">
        排序号（默认 <b>50</b>）请按目标表结构调整；table_id 已改为按「表名」动态查 (select id from dy_table where name = '表名')，请确保该表名在 dy_table 中存在。
        创建人/时间保持模板原值；ALTER 列类型已按字段类型自动生成（varchar / text / date …），如需修改请手动调整。
      </NAlert>

      <div class="out-head">
        <span class="lbl">生成的 SQL（{{ rows.length }} 条）</span>
        <div class="ops">
          <NButton size="small" secondary :disabled="missing" @click="regen">重新生成 时间/ID</NButton>
          <NButton size="small" type="primary" :disabled="missing" @click="copySql">复制 SQL</NButton>
        </div>
      </div>
      <NScrollbar style="max-height: 320px">
        <pre class="sql" v-if="!missing">{{ sqlText }}</pre>
      </NScrollbar>
    </div>
  </div>
</template>

<style scoped>
.page {
  max-width: 1180px;
  margin: 0 auto;
}
.page-head {
  margin-bottom: 16px;
}
.page-head h2 {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
}
.page-head p {
  margin: 6px 0 0;
  font-size: 13px;
  color: var(--text-3);
  line-height: 1.5;
}
.wrap {
  display: flex;
  flex-direction: column;
}
.batch {
  margin-bottom: 14px;
}
.batch-head,
.tbl-head,
.out-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
}
.batch-head .lbl,
.tbl-head .lbl,
.out-head .lbl {
  font-size: 13px;
  font-weight: 600;
  color: var(--text-2);
}

/* 表格滚动容器：横竖双向滚动，确保列再多 / 屏再窄也能完整查看与横向滚动 */
.tbl-scroll {
  max-height: 360px;
  overflow: auto;
  border: 1px solid var(--border);
  border-radius: 10px;
  background: var(--surface-1);
}
.ft {
  width: 100%;
  min-width: 960px; /* 保证数据列（表名/字段名/字段描述）有足够宽度，不够则横向滚动 */
  border-collapse: collapse;
  font-size: 12.5px;
}
.ft th,
.ft td {
  border: 1px solid var(--border);
  padding: 5px 6px;
  text-align: left;
  vertical-align: middle;
}
.ft th {
  background: var(--surface-2);
  color: var(--text-2);
  font-weight: 600;
  white-space: nowrap;
  position: sticky;
  top: 0;
  z-index: 1;
}
/* 列宽：序号 / 类型 / 长度 / 排序 / 操作 固定较窄；数据列自动撑开 */
.ft .c-idx { width: 48px; min-width: 48px; }
.ft .c-type { width: 150px; min-width: 150px; }
.ft .c-len { width: 92px; min-width: 92px; }
.ft .c-sort { width: 92px; min-width: 92px; }
.ft .c-act { width: 60px; min-width: 60px; }
.ft .c-table { min-width: 150px; }
.ft .c-field { min-width: 170px; }
.ft .c-desc { min-width: 200px; }
.ft .idx {
  text-align: center;
  color: var(--text-3);
}
.empty {
  padding: 26px 16px;
  text-align: center;
  color: var(--text-3);
  font-size: 13px;
}
.warn-list {
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.warn-item {
  font-size: 12px;
  color: var(--warning, #b88230);
  background: color-mix(in srgb, var(--warning, #b88230) 8%, transparent);
  border: 1px solid color-mix(in srgb, var(--warning, #b88230) 30%, transparent);
  border-radius: 8px;
  padding: 5px 10px;
}
.ops {
  display: flex;
  gap: 8px;
}
.sql {
  margin: 0;
  padding: 14px 16px;
  background: var(--surface-2);
  border: 1px solid var(--border);
  border-radius: 10px;
  font-family: var(--font-mono, 'SFMono-Regular', Consolas, monospace);
  font-size: 12.5px;
  line-height: 1.65;
  color: var(--text-1);
  white-space: pre-wrap;
  word-break: break-all;
}
</style>
