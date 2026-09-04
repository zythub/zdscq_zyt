<script setup lang="ts">
import { computed, ref } from 'vue';
import {
  NAlert,
  NButton,
  NCheckbox,
  NDrawer,
  NDrawerContent,
  NInput,
  NInputNumber,
  NPopconfirm,
  NSelect,
  NSpace,
  NSwitch,
  NTabPane,
  NTabs,
  NTag,
  NText,
  useMessage,
} from 'naive-ui';
import {
  baseConfig,
  config,
  configDiff,
  exportConfigJson,
  forgetTranslation,
  importConfigJson,
  overrideCount,
  removeNode,
  resetAll,
  resetNode,
  setFixedFields,
  setNaming,
  setRoleDefault,
  upsertNode,
} from '@/stores/config';
import { FIELD_TYPES } from '@/stores/builder';
import {
  DIALECT_MAX_IDENTIFIER,
  FIELD_ROLE_LABEL,
  type Dialect,
  type FieldRole,
  type FieldType,
  type FixedFieldDef,
  type NodeDef,
  type RoleDefault,
} from '@/types';
import { dialectLabel, effectiveMaxLength } from '@/core/identifier';

const show = defineModel<boolean>('show', { required: true });
const message = useMessage();

const typeOptions = FIELD_TYPES.map((t) => ({ label: t, value: t }));
const roleOptions = (Object.keys(FIELD_ROLE_LABEL) as FieldRole[]).map((r) => ({
  label: FIELD_ROLE_LABEL[r],
  value: r,
}));
const dialectOptions: Array<{ label: string; value: Dialect }> = (
  ['postgresql', 'mysql', 'dameng'] as Dialect[]
).map((d) => ({ label: `${dialectLabel(d)}（${DIALECT_MAX_IDENTIFIER[d]} 字符）`, value: d }));

const roles = Object.keys(FIELD_ROLE_LABEL) as FieldRole[];
const maxLen = computed(() => effectiveMaxLength(config.value.naming));

function isRoleOverridden(role: FieldRole, key: keyof RoleDefault): boolean {
  return configDiff.roleDefaults?.[role]?.[key] !== undefined;
}

/* ---------- 节点编辑 ---------- */
const editingNode = ref<NodeDef | null>(null);

function startEdit(node: NodeDef): void {
  editingNode.value = JSON.parse(JSON.stringify(node)) as NodeDef;
}

function startCreate(): void {
  editingNode.value = {
    id: `custom_${Date.now().toString(36)}`,
    name: '',
    group: '自定义',
    fields: [],
  };
}

function saveNode(): void {
  const n = editingNode.value;
  if (!n) return;
  if (!n.name.trim()) {
    message.warning('请填写节点名称');
    return;
  }
  if (config.value.nodes.some((x) => x.id !== n.id && x.name === n.name.trim())) {
    message.warning('已存在同名节点');
    return;
  }
  upsertNode({ ...n, name: n.name.trim(), group: n.group.trim() || '自定义' });
  message.success(`已保存节点「${n.name}」`);
  editingNode.value = null;
}

function addNodeField(): void {
  editingNode.value?.fields.push({ name: '', role: 'opinion', isPerson: false });
}

function removeNodeField(i: number): void {
  editingNode.value?.fields.splice(i, 1);
}

function isBaselineNode(id: string): boolean {
  return baseConfig.value.nodes.some((n) => n.id === id);
}

function isNodeOverridden(id: string): boolean {
  return configDiff.nodesOverride?.[id] !== undefined;
}

/* ---------- 固定字段编辑 ---------- */
type FixedKey = 'baseFieldsStart' | 'baseFieldsEnd' | 'subTableFields';

function updateFixed(which: FixedKey, i: number, patch: Partial<FixedFieldDef>): void {
  const list = config.value[which].map((f, idx) => (idx === i ? { ...f, ...patch } : f));
  setFixedFields(which, list);
}

function addFixed(which: FixedKey): void {
  setFixedFields(which, [...config.value[which], { english: '', chinese: '', role: 'text' }]);
}

function removeFixed(which: FixedKey, i: number): void {
  setFixedFields(
    which,
    config.value[which].filter((_, idx) => idx !== i)
  );
}

/* ---------- 导入导出 ---------- */
const fileInput = ref<HTMLInputElement | null>(null);

function doExport(): void {
  const blob = new Blob([exportConfigJson()], { type: 'application/json' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = '字段生成器配置.json';
  a.click();
  URL.revokeObjectURL(a.href);
  message.success('配置已导出');
}

function pickFile(): void {
  fileInput.value?.click();
}

function onFile(e: Event): void {
  const file = (e.target as HTMLInputElement).files?.[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    const result = importConfigJson(String(reader.result));
    if (result.ok) message.success(result.message);
    else message.error(result.message);
  };
  reader.readAsText(file);
  (e.target as HTMLInputElement).value = '';
}

function doResetAll(): void {
  resetAll();
  message.success('已恢复全部默认配置');
}

const dictEntries = computed(() => Object.entries(config.value.translationDict));
</script>

<template>
  <NDrawer v-model:show="show" :width="760" placement="right">
    <NDrawerContent title="配置中心" closable>
      <template #header>
        <div style="display: flex; align-items: center; gap: 10px; width: 100%">
          <span>配置中心</span>
          <NTag v-if="overrideCount" size="small" type="info" :bordered="false">
            {{ overrideCount }} 项个人覆盖
          </NTag>
          <div style="flex: 1"></div>
          <NButton size="tiny" @click="doExport">导出 JSON</NButton>
          <NButton size="tiny" @click="pickFile">导入 JSON</NButton>
          <NPopconfirm @positive-click="doResetAll">
            <template #trigger>
              <NButton size="tiny" type="error" quaternary>恢复默认</NButton>
            </template>
            将清空你的全部个人配置，恢复到团队基线，确定吗？
          </NPopconfirm>
          <input
            ref="fileInput"
            type="file"
            accept="application/json,.json"
            style="display: none"
            @change="onFile"
          />
        </div>
      </template>

      <NTabs type="line" animated>
        <!-- 全局默认 -->
        <NTabPane name="roles" tab="字段默认值">
          <NAlert type="info" :bordered="false" style="margin-bottom: 12px">
            这里改的是<b>全局默认值</b>，一处改处处生效。单个字段要特殊处理，直接在右侧字段表格里改那一行。
          </NAlert>

          <div
            style="
              display: grid;
              grid-template-columns: 100px 108px 84px 78px 64px 1fr 40px;
              gap: 6px;
              align-items: center;
              font-size: 12px;
              opacity: 0.6;
              padding: 0 2px 6px;
            "
          >
            <div>角色</div>
            <div>类型</div>
            <div>长度</div>
            <div>小数位</div>
            <div>可空</div>
            <div>默认值</div>
            <div></div>
          </div>

          <div
            v-for="role in roles"
            :key="role"
            style="
              display: grid;
              grid-template-columns: 100px 108px 84px 78px 64px 1fr 40px;
              gap: 6px;
              align-items: center;
              padding: 3px 2px;
            "
          >
            <div style="font-size: 13px">{{ FIELD_ROLE_LABEL[role] }}</div>
            <NSelect
              :value="config.roleDefaults[role].type"
              :options="typeOptions"
              size="tiny"
              @update:value="(v: FieldType) => setRoleDefault(role, 'type', v)"
            />
            <NInputNumber
              :value="config.roleDefaults[role].length"
              size="tiny"
              :min="1"
              :max="65535"
              :show-button="false"
              placeholder="—"
              :status="isRoleOverridden(role, 'length') ? 'success' : undefined"
              @update:value="(v: number | null) => setRoleDefault(role, 'length', v)"
            />
            <NInputNumber
              :value="config.roleDefaults[role].scale"
              size="tiny"
              :min="0"
              :max="30"
              :show-button="false"
              placeholder="—"
              @update:value="(v: number | null) => setRoleDefault(role, 'scale', v)"
            />
            <NSwitch
              :value="config.roleDefaults[role].nullable"
              size="small"
              @update:value="(v: boolean) => setRoleDefault(role, 'nullable', v)"
            />
            <NInput
              :value="config.roleDefaults[role].defaultValue"
              size="tiny"
              placeholder="—"
              @update:value="(v: string) => setRoleDefault(role, 'defaultValue', v)"
            />
            <NButton
              v-if="configDiff.roleDefaults?.[role]"
              size="tiny"
              quaternary
              title="恢复该行默认"
              @click="
                (Object.keys(configDiff.roleDefaults?.[role] ?? {}) as (keyof RoleDefault)[]).forEach(
                  (k) => setRoleDefault(role, k, baseConfig.roleDefaults[role][k] as never)
                )
              "
            >
              ↺
            </NButton>
          </div>
        </NTabPane>

        <!-- 命名规则 -->
        <NTabPane name="naming" tab="命名与方言">
          <NSpace vertical :size="14">
            <div>
              <div style="font-size: 13px; margin-bottom: 4px">目标数据库</div>
              <NSelect
                :value="config.naming.dialect"
                :options="dialectOptions"
                size="small"
                style="max-width: 320px"
                @update:value="(v: Dialect) => setNaming('dialect', v)"
              />
              <NText depth="3" style="font-size: 12px; display: block; margin-top: 4px">
                当前标识符上限 {{ maxLen }} 字符，超出的字段名会在表格里标红
              </NText>
            </div>

            <div>
              <div style="font-size: 13px; margin-bottom: 4px">标识符长度上限（留空跟随方言）</div>
              <NInputNumber
                :value="config.naming.maxIdentifierLength"
                size="small"
                :min="8"
                :max="256"
                placeholder="跟随方言"
                style="max-width: 200px"
                @update:value="(v: number | null) => setNaming('maxIdentifierLength', v)"
              />
            </div>

            <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; max-width: 620px">
              <div>
                <div style="font-size: 13px; margin-bottom: 4px">表名前缀</div>
                <NInput
                  :value="config.naming.tablePrefix"
                  size="small"
                  @update:value="(v: string) => setNaming('tablePrefix', v)"
                />
              </div>
              <div>
                <div style="font-size: 13px; margin-bottom: 4px">意见后缀</div>
                <NInput
                  :value="config.naming.opinionSuffix"
                  size="small"
                  @update:value="(v: string) => setNaming('opinionSuffix', v)"
                />
              </div>
              <div>
                <div style="font-size: 13px; margin-bottom: 4px">姓名后缀</div>
                <NInput
                  :value="config.naming.nameSuffix"
                  size="small"
                  @update:value="(v: string) => setNaming('nameSuffix', v)"
                />
              </div>
              <div>
                <div style="font-size: 13px; margin-bottom: 4px">日期后缀</div>
                <NInput
                  :value="config.naming.dateSuffix"
                  size="small"
                  @update:value="(v: string) => setNaming('dateSuffix', v)"
                />
              </div>
            </div>

            <NCheckbox
              :checked="config.naming.fallbackToFullPinyin"
              @update:checked="(v: boolean) => setNaming('fallbackToFullPinyin', v)"
            >
              <span style="font-size: 13px">拼音首字母撞名时，自动降级为全拼</span>
            </NCheckbox>

            <div v-if="dictEntries.length">
              <div style="font-size: 13px; margin-bottom: 6px">
                中文 → 英文 手工映射（在字段表格里改英文名会自动记录）
              </div>
              <div style="display: flex; flex-wrap: wrap; gap: 6px">
                <NTag
                  v-for="[cn, en] in dictEntries"
                  :key="cn"
                  size="small"
                  closable
                  @close="forgetTranslation(cn)"
                >
                  {{ cn }} → <span class="mono">{{ en }}</span>
                </NTag>
              </div>
            </div>
          </NSpace>
        </NTabPane>

        <!-- 审批节点 -->
        <NTabPane name="nodes" tab="审批节点">
          <div v-if="!editingNode">
            <NSpace style="margin-bottom: 10px">
              <NButton size="small" type="primary" @click="startCreate">新建节点</NButton>
              <NText depth="3" style="font-size: 12px; line-height: 28px">
                共 {{ config.nodes.length }} 个节点
              </NText>
            </NSpace>

            <div
              v-for="node in config.nodes"
              :key="node.id"
              class="hoverable node-card"
              style="
                display: flex;
                align-items: center;
                gap: 8px;
                padding: 7px 10px;
                border-radius: var(--r-sm);
                margin-bottom: 4px;
                background: var(--surface-2);
              "
            >
              <div style="flex: 1; min-width: 0">
                <div style="font-size: 13px">
                  {{ node.name }}
                  <NTag size="tiny" :bordered="false" style="margin-left: 6px">{{ node.group }}</NTag>
                  <NTag
                    v-if="isNodeOverridden(node.id)"
                    size="tiny"
                    type="info"
                    :bordered="false"
                    style="margin-left: 4px"
                  >
                    已改
                  </NTag>
                  <NTag
                    v-else-if="!isBaselineNode(node.id)"
                    size="tiny"
                    type="success"
                    :bordered="false"
                    style="margin-left: 4px"
                  >
                    自建
                  </NTag>
                </div>
                <div style="font-size: 11px; opacity: 0.55">
                  {{ node.fields.length }} 项定义 ·
                  {{
                    node.fields.reduce(
                      (s, f) => s + (f.isPerson ? config.personTemplate.length : 1),
                      0
                    )
                  }}
                  个物理字段
                </div>
              </div>
              <NButton size="tiny" quaternary @click="startEdit(node)">编辑</NButton>
              <NButton
                v-if="isNodeOverridden(node.id)"
                size="tiny"
                quaternary
                @click="resetNode(node.id)"
              >
                还原
              </NButton>
              <NPopconfirm @positive-click="removeNode(node.id)">
                <template #trigger>
                  <NButton size="tiny" quaternary type="error">删除</NButton>
                </template>
                删除节点「{{ node.name }}」？可随时用「恢复默认」找回基线节点。
              </NPopconfirm>
            </div>
          </div>

          <div v-else>
            <NSpace style="margin-bottom: 12px" align="center">
              <NInput
                v-model:value="editingNode.name"
                size="small"
                placeholder="节点名称"
                style="width: 200px"
              />
              <NInput
                v-model:value="editingNode.group"
                size="small"
                placeholder="分组"
                style="width: 140px"
              />
              <NButton size="small" type="primary" @click="saveNode">保存</NButton>
              <NButton size="small" @click="editingNode = null">取消</NButton>
            </NSpace>

            <div
              style="
                display: grid;
                grid-template-columns: 1fr 120px 76px 40px;
                gap: 6px;
                font-size: 12px;
                opacity: 0.6;
                padding: 0 2px 6px;
              "
            >
              <div>字段中文名</div>
              <div>角色</div>
              <div>人员</div>
              <div></div>
            </div>

            <div
              v-for="(f, i) in editingNode.fields"
              :key="i"
              style="
                display: grid;
                grid-template-columns: 1fr 120px 76px 40px;
                gap: 6px;
                align-items: center;
                padding: 3px 2px;
              "
            >
              <NInput v-model:value="f.name" size="tiny" placeholder="如：工程部审核意见" />
              <NSelect v-model:value="f.role" :options="roleOptions" size="tiny" />
              <NSwitch v-model:value="f.isPerson" size="small" />
              <NButton size="tiny" quaternary type="error" @click="removeNodeField(i)">删</NButton>
            </div>

            <NButton size="tiny" dashed block style="margin-top: 8px" @click="addNodeField">
              + 添加字段定义
            </NButton>
          </div>
        </NTabPane>

        <!-- 固定字段 -->
        <NTabPane name="fixed" tab="固定字段">
          <NTabs type="segment" size="small">
            <NTabPane
              v-for="pair in [
                { key: 'baseFieldsStart' as FixedKey, tab: '主表·前置' },
                { key: 'baseFieldsEnd' as FixedKey, tab: '主表·后置' },
                { key: 'subTableFields' as FixedKey, tab: '子表默认' },
              ]"
              :key="pair.key"
              :name="pair.key"
              :tab="pair.tab"
            >
              <div
                style="
                  display: grid;
                  grid-template-columns: 1fr 1fr 120px 40px;
                  gap: 6px;
                  font-size: 12px;
                  opacity: 0.6;
                  padding: 6px 2px;
                "
              >
                <div>英文名</div>
                <div>中文名</div>
                <div>角色</div>
                <div></div>
              </div>
              <div
                v-for="(f, i) in config[pair.key]"
                :key="i"
                style="
                  display: grid;
                  grid-template-columns: 1fr 1fr 120px 40px;
                  gap: 6px;
                  align-items: center;
                  padding: 3px 2px;
                "
              >
                <NInput
                  :value="f.english"
                  size="tiny"
                  class="mono"
                  @update:value="(v: string) => updateFixed(pair.key, i, { english: v })"
                />
                <NInput
                  :value="f.chinese"
                  size="tiny"
                  @update:value="(v: string) => updateFixed(pair.key, i, { chinese: v })"
                />
                <NSelect
                  :value="f.role"
                  :options="roleOptions"
                  size="tiny"
                  @update:value="(v: FieldRole) => updateFixed(pair.key, i, { role: v })"
                />
                <NButton size="tiny" quaternary type="error" @click="removeFixed(pair.key, i)">
                  删
                </NButton>
              </div>
              <NButton size="tiny" dashed block style="margin-top: 8px" @click="addFixed(pair.key)">
                + 添加字段
              </NButton>
            </NTabPane>
          </NTabs>
        </NTabPane>
      </NTabs>
    </NDrawerContent>
  </NDrawer>
</template>

<style scoped>
.node-card:hover {
  background: var(--surface-3);
}
</style>
