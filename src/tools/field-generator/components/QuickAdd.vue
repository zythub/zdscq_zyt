<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import {
  NButton,
  NCheckbox,
  NInput,
  NInputNumber,
  NSelect,
  NSpace,
  NTooltip,
  useMessage,
} from 'naive-ui';
import { TYPES_WITHOUT_LENGTH, TYPES_WITH_SCALE, type CustomFieldInput, type FieldType } from '@/types';
import { addCustomField, FIELD_TYPES, markRecentlyAdded, removeCustomField, session } from '@/stores/builder';
import { config } from '@/stores/config';
import { cleanChineseName, toAcronym } from '@/core/identifier';

const message = useMessage();

const draft = ref<Omit<CustomFieldInput, 'uid'>>({
  chineseName: '',
  englishName: '',
  type: 'VARCHAR',
  length: 50,
  scale: null,
  isPerson: false,
  hasDate: false,
  hasOpinion: false,
});

const typeOptions = FIELD_TYPES.map((t) => ({ label: t, value: t }));

const needsLength = computed(() => !TYPES_WITHOUT_LENGTH.has(draft.value.type));
const needsScale = computed(() => TYPES_WITH_SCALE.has(draft.value.type));

/** 实时预览这个字段会展开成哪些物理字段 */
const expansion = computed<string[]>(() => {
  const cn = cleanChineseName(draft.value.chineseName);
  if (!cn) return [];
  const base = draft.value.englishName.trim() || toAcronym(cn) || 'field';
  const { opinionSuffix, nameSuffix, dateSuffix } = config.value.naming;
  const out: string[] = [];
  const needsDate =
    draft.value.hasDate && !['DATE', 'DATETIME', 'TIMESTAMP'].includes(draft.value.type);

  if (draft.value.isPerson) {
    if (draft.value.hasOpinion) out.push(base + opinionSuffix);
    out.push(base);
    out.push(base + nameSuffix);
    if (needsDate) out.push(base + dateSuffix);
  } else {
    out.push(base);
    if (draft.value.hasOpinion) out.push(base + opinionSuffix);
    if (needsDate) out.push(base + dateSuffix);
  }
  return out;
});

function onTypeChange(t: FieldType): void {
  draft.value.type = t;
  if (TYPES_WITHOUT_LENGTH.has(t)) draft.value.length = null;
  else if (draft.value.length == null) draft.value.length = 50;
  if (TYPES_WITH_SCALE.has(t)) {
    if (draft.value.scale == null) draft.value.scale = 2;
    if (draft.value.length == null) draft.value.length = 18;
  } else {
    draft.value.scale = null;
  }
}

function submit(): void {
  const cn = draft.value.chineseName.trim();
  if (!cn) {
    message.warning('请填写中文名称');
    return;
  }
  if (config.value.excludedNames.includes(cleanChineseName(cn))) {
    message.warning(`「${cn}」在排除列表中，不会生成字段`);
    return;
  }
  const added = addCustomField({ ...draft.value });
  markRecentlyAdded(expansion.value);
  message.success(`已添加 ${expansion.value.length} 个字段`);
  draft.value = {
    chineseName: '',
    englishName: '',
    type: draft.value.type,
    length: draft.value.length,
    scale: draft.value.scale,
    isPerson: false,
    hasDate: false,
    hasOpinion: false,
  };
  void added;
}

/** 自动识别人员/意见/日期：输入中文名即自动勾选对应开关（识别到人时三项全勾，沿用原生成器逻辑） */
function autoDetect(cn: string): void {
  const person = /(姓名|人员|签字|签名|经理|负责人|经办|填报|审核人|批准人|总监|代表|联系人|经办人|申报人|代理人)/.test(cn);
  const opinion = /(意见|审核|审批|批准|结论|会签|签署)/.test(cn);
  const date = /(日期|时间|年月日|签收|签定|签订)/.test(cn);
  if (person) {
    draft.value.isPerson = true;
    draft.value.hasOpinion = true;
    draft.value.hasDate = true;
  } else {
    draft.value.isPerson = false;
    draft.value.hasOpinion = opinion;
    draft.value.hasDate = date;
  }
}
watch(
  () => draft.value.chineseName,
  (v) => {
    if (v && v.trim()) autoDetect(v.trim());
  }
);

function summarize(f: CustomFieldInput): string {
  const parts: string[] = [f.type];
  if (f.length != null) parts.push(f.scale != null ? `${f.length},${f.scale}` : String(f.length));
  if (f.isPerson) parts.push('人员');
  if (f.hasOpinion) parts.push('意见');
  if (f.hasDate) parts.push('日期');
  return parts.join(' · ');
}
</script>

<template>
  <div style="display: flex; flex-direction: column; flex: 1; min-height: 0; gap: 10px">
    <div class="panel-head">
      <span class="panel-title">快速添加字段</span>
    </div>

    <NInput
      v-model:value="draft.chineseName"
      placeholder="中文名称，如：审批人"
      size="small"
      clearable
      @keyup.enter="submit"
    />

    <NTooltip trigger="hover" placement="right">
      <template #trigger>
        <NInput
          v-model:value="draft.englishName"
          placeholder="英文名（留空自动生成拼音）"
          size="small"
          clearable
        />
      </template>
      留空则按拼音首字母生成，撞名自动降级为全拼
    </NTooltip>

    <NSelect
      :value="draft.type"
      :options="typeOptions"
      size="small"
      @update:value="onTypeChange"
    />

    <NSpace :size="6" :wrap="false">
      <NInputNumber
        v-if="needsLength"
        v-model:value="draft.length"
        size="small"
        :min="1"
        :max="65535"
        placeholder="长度"
        style="flex: 1"
      />
      <NInputNumber
        v-if="needsScale"
        v-model:value="draft.scale"
        size="small"
        :min="0"
        :max="30"
        placeholder="小数位"
        style="width: 92px"
      />
    </NSpace>

    <div style="display: flex; flex-direction: column; gap: 6px; padding: 2px">
      <NCheckbox v-model:checked="draft.isPerson" size="small">
        <span style="font-size: 13px">人员字段（展开 ID + 姓名）</span>
      </NCheckbox>
      <NCheckbox v-model:checked="draft.hasOpinion" size="small">
        <span style="font-size: 13px">附带意见（{{ config.naming.opinionSuffix }}）</span>
      </NCheckbox>
      <NCheckbox v-model:checked="draft.hasDate" size="small">
        <span style="font-size: 13px">附带日期（{{ config.naming.dateSuffix }}）</span>
      </NCheckbox>
    </div>

    <div v-if="expansion.length" class="preview-box mono">
      <div v-for="name in expansion" :key="name">{{ name }}</div>
    </div>

    <NButton type="primary" size="small" block @click="submit">
      添加（{{ expansion.length || 0 }} 个字段）
    </NButton>

    <div v-if="session.customFields.length" style="display: flex; flex-direction: column; min-height: 0; flex: 1">
      <div class="muted" style="font-size: 13px; padding: 6px 2px">
        已添加 {{ session.customFields.length }} 组
      </div>
      <div class="scroll-y" style="flex: 1; min-height: 0; display: flex; flex-direction: column; gap: 4px">
        <div
          v-for="f in session.customFields"
          :key="f.uid"
          class="hoverable added-row"
          style="display: flex; align-items: center; gap: 6px; padding: 6px 8px; border-radius: var(--r-sm)"
        >
          <div style="flex: 1; min-width: 0">
            <div style="font-size: 13px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap">
              {{ f.chineseName }}
            </div>
            <div class="muted" style="font-size: 11px">{{ summarize(f) }}</div>
          </div>
          <NButton size="tiny" quaternary type="error" @click="removeCustomField(f.uid)">删除</NButton>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.preview-box {
  font-size: 12px;
  line-height: 1.7;
  padding: 8px 10px;
  border-radius: var(--r-sm);
  background: var(--surface-2);
  border: 1px solid var(--border);
  word-break: break-all;
}
.added-row {
  background: var(--surface-2);
}
</style>
