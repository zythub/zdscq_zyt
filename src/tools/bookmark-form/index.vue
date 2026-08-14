<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import {
  NAlert,
  NButton,
  NCode,
  NInput,
  NSelect,
  NTabPane,
  NTabs,
  NTag,
  NText,
  useMessage,
} from 'naive-ui';
import { config } from '@/stores/config';
import { addFieldsFromWord, markRecentlyAdded } from '@/stores/builder';
import { readDocxDocumentXml } from '@/core/word/docx';
import { parse, generate, type DesignerFieldType, type EditableField } from '@/core/word/designer';

const message = useMessage();
const router = useRouter();

const tableNameCn = ref('');
const textInput = ref('');
const docXml = ref<string | null>(null);
const docName = ref('');
const parsed = ref<ReturnType<typeof parse> | null>(null);
const fields = ref<EditableField[]>([]);
const jsonText = ref('');
const busy = ref(false);
const step = ref<'source' | 'review' | 'export'>('source');
const dragOver = ref(false);
const fileInput = ref<HTMLInputElement | null>(null);

type StepKey = 'source' | 'review' | 'export';
const STEPS: Array<{ key: StepKey; label: string }> = [
  { key: 'source', label: '来源' },
  { key: 'review', label: '复核' },
  { key: 'export', label: '导出' },
];
const activeStepIdx = computed(() => STEPS.findIndex((s) => s.key === step.value));

const typeMeta: Record<DesignerFieldType, { label: string; color: string }> = {
  input: { label: '单行文本', color: 'var(--accent-400)' },
  textarea: { label: '多行文本', color: 'var(--info)' },
  date: { label: '日期', color: 'var(--success)' },
  checkbox: { label: '勾选', color: 'var(--warning)' },
  select: { label: '下拉', color: 'var(--accent-500)' },
  radio: { label: '单选', color: 'var(--accent-600)' },
};
const typeOptions = (Object.keys(typeMeta) as DesignerFieldType[]).map((t) => ({
  label: typeMeta[t].label,
  value: t,
}));

const baseFields = computed(() => fields.value.filter((f) => f.kind === 'base'));
const mainFields = computed(() => fields.value.filter((f) => f.kind === 'main'));
const subFields = computed(() => fields.value.filter((f) => f.kind === 'sub'));
const subNote = computed(
  () => subFields.value.length > 0 && '子表字段已完整包含在「设计器 JSON」中；加入生成器时仅导入主表字段。'
);

function pickFile(): void {
  fileInput.value?.click();
}

async function handleFile(file: File): Promise<void> {
  busy.value = true;
  try {
    const xml = await readDocxDocumentXml(file);
    docXml.value = xml;
    docName.value = file.name;
    // 表名默认取上传文件名（去掉 .docx 扩展名），可手动覆盖
    tableNameCn.value = file.name.replace(/\.(docx?|DOCX?)$/i, '');
    message.success(`已读取 ${file.name}`);
  } catch (err) {
    message.error('读取 Word 失败：' + (err as Error).message);
  } finally {
    busy.value = false;
  }
}

async function onFile(e: Event): Promise<void> {
  const file = (e.target as HTMLInputElement).files?.[0];
  if (file) await handleFile(file);
  (e.target as HTMLInputElement).value = '';
}

async function onDrop(e: DragEvent): Promise<void> {
  e.preventDefault();
  dragOver.value = false;
  const file = e.dataTransfer?.files?.[0];
  if (file) await handleFile(file);
}

function doParse(): void {
  if (!tableNameCn.value.trim() && !docXml.value && !textInput.value.trim()) {
    message.warning('请填写表中文名，或上传已打书签的 Word，或粘贴文字字段');
    return;
  }
  const res = parse({
    docXml: docXml.value || undefined,
    text: textInput.value || undefined,
    tableNameCn: tableNameCn.value || '自定义表',
    naming: config.value.naming,
    translationDict: config.value.translationDict,
  });
  parsed.value = res;
  fields.value = res.fields;
  jsonText.value = '';
  step.value = 'review';
  message.success(
    `解析完成：主表 ${mainFields.value.length} · 基础 ${baseFields.value.length} · 子表 ${subFields.value.length}`
  );
}

function doGenerate(): void {
  if (!parsed.value) return;
  const r = generate(fields.value, parsed.value.mainEn, parsed.value.subEn);
  jsonText.value = JSON.stringify(r.json, null, 2);
  step.value = 'export';
  message.success('已生成设计器 JSON');
}

function joinGenerator(): void {
  if (!parsed.value) return;
  const added = addFieldsFromWord(mainFields.value.map((f) => ({ english: f.english, label: f.label, type: f.type })));
  if (!added.length) {
    message.info('这些字段都已存在于主表，未重复导入');
    return;
  }
  markRecentlyAdded(added);
  message.success(`已加入 ${added.length} 个字段到主表，正在跳转到「字段生成器」…`);
  router.push('/field-generator');
}

function copyJson(): void {
  if (!jsonText.value) return;
  if (navigator.clipboard?.writeText) {
    navigator.clipboard.writeText(jsonText.value).then(
      () => message.success('已复制 JSON'),
      () => fallbackCopy()
    );
  } else {
    fallbackCopy();
  }
}
function fallbackCopy(): void {
  const ta = document.createElement('textarea');
  ta.value = jsonText.value;
  document.body.appendChild(ta);
  ta.select();
  try {
    document.execCommand('copy');
    message.success('已复制 JSON');
  } catch {
    message.error('复制失败，请手动选择文本');
  }
  document.body.removeChild(ta);
}
function downloadJson(): void {
  if (!jsonText.value || !parsed.value) return;
  const blob = new Blob([jsonText.value], { type: 'application/json' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `${parsed.value.mainEn}_designer.json`;
  a.click();
  URL.revokeObjectURL(a.href);
}

function resetAll(): void {
  docXml.value = null;
  docName.value = '';
  parsed.value = null;
  fields.value = [];
  jsonText.value = '';
  step.value = 'source';
}
</script>

<template>
  <div class="page">
    <!-- 标题区 -->
    <div class="hdr">
      <div class="hdr-title">
        <span class="hdr-mark" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <path d="M14 2v6h6" />
            <path d="M12 18v-6" />
            <path d="M9 15h6" />
          </svg>
        </span>
        <div>
          <div class="hdr-name">从 Word 导入</div>
          <div class="hdr-sub">提取书签 → 复用你的命名规则 → 生成字段 / 设计器 JSON</div>
        </div>
      </div>
      <NTag v-if="parsed" size="small" type="info" :bordered="false" class="mono">{{ parsed.mainEn }}</NTag>
    </div>

    <!-- 步骤条 -->
    <div class="steps">
      <template v-for="(s, i) in STEPS" :key="s.key">
        <div class="step" :class="{ active: i === activeStepIdx, done: i < activeStepIdx }">
          <span class="step-dot">{{ i < activeStepIdx ? '✓' : i + 1 }}</span>
          <span class="step-label">{{ s.label }}</span>
        </div>
        <div v-if="i < STEPS.length - 1" class="step-line" :class="{ done: i < activeStepIdx }"></div>
      </template>
    </div>

    <!-- ===== 步骤一：来源 ===== -->
    <section v-if="step === 'source'" class="rise-in">
      <div class="src-grid">
        <div class="field-block">
          <label class="lbl">表中文名</label>
          <NInput
            v-model:value="tableNameCn"
            placeholder="上传 Word 后自动取文件名，可手动修改"
            size="medium"
          />
        </div>

        <div
          class="drop"
          :class="{ over: dragOver }"
          @click="pickFile"
          @dragover.prevent="dragOver = true"
          @dragleave.prevent="dragOver = false"
          @drop="onDrop"
        >
          <input
            ref="fileInput"
            type="file"
            accept=".docx,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            style="display: none"
            @change="onFile"
          />
          <div class="drop-ico" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <path d="M7 10l5-5 5 5" />
              <path d="M12 5v12" />
            </svg>
          </div>
          <div class="drop-title">{{ docName || '拖入或点击上传已打书签的 .docx' }}</div>
          <div class="drop-sub">
            子表在「表头行最后一列」打一个 <code>xxx_child</code> 书签 · 自动滤掉 _GoBack / _Toc 噪音
          </div>
          <NButton v-if="docName" size="tiny" quaternary class="drop-clear" @click.stop="resetAll">移除</NButton>
        </div>
      </div>

      <div class="field-block" style="margin-top: var(--s-4)">
        <label class="lbl">
          文字字段 <span class="lbl-hint">（可选）逗号 / 、/ 换行分隔，自动判断类型</span>
        </label>
        <NInput
          v-model:value="textInput"
          type="textarea"
          size="medium"
          placeholder="如：工程名称，建设单位，开工日期，是否验收，合同金额，备注说明，项目经理"
          :autosize="{ minRows: 3, maxRows: 6 }"
        />
      </div>

      <NAlert type="info" :bordered="false" class="tip">
        上传、粘贴二选一即可，也可<strong>两者合并</strong>。解析后会在下一步让你逐字段核对中文标签与类型。
      </NAlert>

      <div class="actions">
        <NButton size="large" type="primary" :disabled="!tableNameCn.trim() && !docXml && !textInput.trim()" @click="doParse">
          解析书签 <span class="arr">→</span>
        </NButton>
      </div>
    </section>

    <!-- ===== 步骤二：复核 ===== -->
    <section v-else-if="step === 'review'" class="rise-in">
      <div class="stat-strip">
        <div class="stat">
          <span class="stat-n">{{ mainFields.length }}</span><span class="stat-l">主表字段</span>
        </div>
        <div class="stat">
          <span class="stat-n">{{ baseFields.length }}</span><span class="stat-l">基础字段</span>
        </div>
        <div class="stat">
          <span class="stat-n">{{ subFields.length }}</span><span class="stat-l">子表字段</span>
        </div>
        <div class="stat-flex">
          <span class="mono dim">表名 {{ parsed?.mainEn }}</span>
          <span class="mono dim">子表 {{ parsed?.subEn }}</span>
        </div>
      </div>

      <NTabs type="line" animated class="review-tabs">
        <NTabPane name="main" :tab="`表单字段 (${mainFields.length})`">
          <div v-if="!mainFields.length" class="empty-hint">主表无字段，检查书签或文字输入。</div>
          <div class="flist">
            <div v-for="(f, i) in mainFields" :key="f.english" class="frow hoverable">
              <span class="fidx">{{ i + 1 }}</span>
              <span class="dot" :style="{ background: typeMeta[f.type].color }"></span>
              <NTag size="small" :bordered="false" class="mono en">{{ f.english }}</NTag>
              <NInput v-model:value="f.label" size="small" placeholder="中文标签" class="lbl-in" />
              <NSelect v-model:value="f.type" :options="typeOptions" size="small" class="type-in" />
            </div>
          </div>
        </NTabPane>

        <NTabPane name="base" :tab="`基础字段 (${baseFields.length})`">
          <div class="flist">
            <div v-for="f in baseFields" :key="f.english" class="frow hoverable base">
              <span class="dot" :style="{ background: typeMeta[f.type].color }"></span>
              <NTag size="small" :bordered="false" class="mono en">{{ f.english }}</NTag>
              <NInput v-model:value="f.label" size="small" :disabled="f.lock" placeholder="中文标签" class="lbl-in" />
              <NSelect v-model:value="f.type" :options="typeOptions" size="small" :disabled="f.lock" class="type-in" />
            </div>
          </div>
        </NTabPane>

        <NTabPane name="sub" :tab="`子表字段 (${subFields.length})`">
          <NText v-if="!subFields.length" depth="3" class="sub-empty">
            未检测到子表。在 Word 表头行最后一列打 <code>xxx_child</code> 书签即可生成子表节点。
          </NText>
          <div v-else class="flist">
            <div v-for="(f, i) in subFields" :key="f.english" class="frow hoverable">
              <span class="fidx">{{ i + 1 }}</span>
              <span class="dot" :style="{ background: typeMeta[f.type].color }"></span>
              <NTag size="small" :bordered="false" class="mono en">{{ f.english }}</NTag>
              <NInput v-model:value="f.label" size="small" placeholder="中文标签" class="lbl-in" />
              <NSelect v-model:value="f.type" :options="typeOptions" size="small" class="type-in" />
            </div>
          </div>
        </NTabPane>
      </NTabs>

      <NAlert v-if="subNote" type="warning" :bordered="false" class="tip">{{ subNote }}</NAlert>

      <div class="actions">
        <NButton size="large" @click="step = 'source'">← 返回</NButton>
        <div class="spacer"></div>
        <NButton size="large" type="primary" @click="joinGenerator">加入生成器</NButton>
        <NButton size="large" @click="doGenerate">生成设计器 JSON →</NButton>
      </div>
    </section>

    <!-- ===== 步骤三：导出 ===== -->
    <section v-else class="rise-in">
      <div class="result-head">
        <div>
          <div class="result-title">表单设计器完整树 JSON</div>
          <div class="result-sub mono dim">
            {{ parsed?.mainEn }} · 主 {{ mainFields.length }} · 基 {{ baseFields.length }} · 子 {{ subFields.length }}
          </div>
        </div>
        <div class="result-btns">
          <NButton size="medium" @click="copyJson">复制</NButton>
          <NButton size="medium" type="primary" @click="downloadJson">下载 .json</NButton>
        </div>
      </div>
      <div class="code-wrap">
        <NCode :code="jsonText" language="json" :word-wrap="true" />
      </div>
      <div class="actions">
        <NButton size="large" @click="joinGenerator">也加入生成器主表</NButton>
        <div class="spacer"></div>
        <NButton size="large" @click="step = 'review'">← 返回复核</NButton>
      </div>
    </section>
  </div>
</template>

<style scoped>
.page {
  max-width: 1180px;
  margin: 0 auto;
}

/* ── 标题 ── */
.hdr {
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  justify-content: space-between;
  margin-bottom: var(--s-4);
}
.hdr-title {
  display: flex;
  align-items: center;
  gap: 10px;
}
.hdr-mark {
  width: 28px;
  height: 28px;
  border-radius: var(--r-sm);
  background: linear-gradient(140deg, var(--accent-400), var(--accent-600));
  color: #fff;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-shadow: var(--shadow-1);
  flex-shrink: 0;
}
.hdr-name {
  font-size: var(--fs-md);
  font-weight: 600;
  letter-spacing: 0.01em;
  line-height: 1.2;
}
.hdr-sub {
  font-size: 12px;
  color: var(--text-3);
  line-height: 1.3;
}

/* ── 步骤条 ── */
.steps {
  display: flex;
  align-items: center;
  gap: 0;
  margin: 4px 0 var(--s-5);
}
.step {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
}
.step-dot {
  width: 24px;
  height: 24px;
  border-radius: 999px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  font-weight: 600;
  background: var(--surface-2);
  color: var(--text-3);
  border: 1px solid var(--border);
  transition: all var(--dur-mid) var(--ease-out-quart);
}
.step-label {
  font-size: 13px;
  color: var(--text-3);
  transition: color var(--dur-mid) var(--ease-out-quart);
}
.step.active .step-dot {
  background: var(--primary);
  color: var(--primary-contrast);
  border-color: var(--primary);
  box-shadow: 0 0 0 4px var(--primary-soft);
}
.step.active .step-label {
  color: var(--text-1);
  font-weight: 600;
}
.step.done .step-dot {
  background: var(--primary-soft);
  color: var(--primary);
  border-color: var(--primary);
}
.step.done .step-label {
  color: var(--text-2);
}
.step-line {
  flex: 1;
  height: 2px;
  margin: 0 12px;
  background: var(--border);
  border-radius: 2px;
  transition: background var(--dur-mid) var(--ease-out-quart);
}
.step-line.done {
  background: var(--primary);
}

/* ── 来源区 ── */
.src-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--s-4);
}
.field-block {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.lbl {
  font-size: 13px;
  font-weight: 600;
  color: var(--text-2);
  letter-spacing: 0.01em;
}
.lbl-hint {
  font-weight: 400;
  color: var(--text-3);
  font-size: 12px;
}
.drop {
  border: 1.5px dashed var(--border-strong);
  border-radius: var(--r-lg);
  background: var(--surface-2);
  padding: var(--s-5) var(--s-4);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;
  cursor: pointer;
  text-align: center;
  transition: all var(--dur-mid) var(--ease-out-quart);
  min-height: 120px;
}
.drop:hover {
  border-color: var(--primary);
  background: var(--primary-soft);
}
.drop.over {
  border-color: var(--primary);
  background: var(--primary-soft);
  transform: scale(1.01);
}
.drop-ico {
  color: var(--primary);
  opacity: 0.85;
}
.drop-title {
  font-size: var(--fs-sm);
  font-weight: 600;
  color: var(--text-1);
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.drop-sub {
  font-size: 12px;
  color: var(--text-3);
  line-height: 1.5;
}
.drop-sub code,
.sub-empty code,
.tip code {
  font-family: var(--font-mono);
  background: var(--surface-3);
  padding: 1px 5px;
  border-radius: 4px;
  font-size: 11px;
  color: var(--text-2);
}
.drop-clear {
  margin-top: 2px;
}
.tip {
  margin: var(--s-5) 0 var(--s-3);
}

/* ── 统计条 ── */
.stat-strip {
  display: flex;
  align-items: center;
  gap: var(--s-5);
  padding: var(--s-3) var(--s-4);
  background: var(--surface-2);
  border: 1px solid var(--border);
  border-radius: var(--r-md);
  margin-bottom: var(--s-4);
}
.stat {
  display: flex;
  flex-direction: column;
  line-height: 1.1;
}
.stat-n {
  font-size: var(--fs-xl);
  font-weight: 700;
  color: var(--primary);
  font-variant-numeric: tabular-nums;
}
.stat-l {
  font-size: 12px;
  color: var(--text-3);
}
.stat-flex {
  margin-left: auto;
  display: flex;
  flex-direction: column;
  gap: 2px;
  align-items: flex-end;
  font-size: 12px;
}

/* ── 字段复核行 ── */
.review-tabs :deep(.n-tabs-tab-pane) {
  outline: none;
}
.flist {
  display: flex;
  flex-direction: column;
  gap: 6px;
  max-height: 44vh;
  overflow: auto;
  padding-right: 6px;
}
.frow {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 10px;
  border-radius: var(--r-sm);
  background: var(--surface-1);
  border: 1px solid var(--border);
  transition: all var(--dur-fast) var(--ease-out-quart);
}
.frow:hover {
  border-color: var(--border-strong);
  box-shadow: var(--shadow-1);
  transform: translateY(-1px);
}
.frow.base {
  background: var(--surface-2);
}
.fidx {
  width: 18px;
  text-align: center;
  font-size: 12px;
  color: var(--text-3);
  font-variant-numeric: tabular-nums;
  flex-shrink: 0;
}
.dot {
  width: 8px;
  height: 8px;
  border-radius: 999px;
  flex-shrink: 0;
}
.en {
  min-width: 132px;
  max-width: 200px;
  justify-content: flex-start;
}
.lbl-in {
  flex: 1;
  min-width: 0;
}
.type-in {
  width: 116px;
  flex-shrink: 0;
}
.sub-empty {
  display: block;
  padding: var(--s-6) var(--s-4);
  text-align: center;
}

/* ── 结果区 ── */
.result-head {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: var(--s-3);
}
.result-title {
  font-size: var(--fs-md);
  font-weight: 600;
}
.result-sub {
  font-size: 12px;
}
.result-btns {
  margin-left: auto;
  display: flex;
  gap: 8px;
}
.code-wrap {
  border: 1px solid var(--border);
  border-radius: var(--r-md);
  background: var(--surface-inset);
  max-height: 56vh;
  overflow: auto;
  box-shadow: var(--shadow-1);
}

/* ── 操作区 ── */
.actions {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: var(--s-5);
}
.actions .spacer {
  flex: 1;
}
.arr {
  margin-left: 4px;
  font-weight: 700;
}

.empty-hint {
  padding: var(--s-6) var(--s-4);
  text-align: center;
  color: var(--text-3);
  font-size: 13px;
}
</style>
