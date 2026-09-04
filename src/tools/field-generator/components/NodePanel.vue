<script setup lang="ts">
import { computed } from 'vue';
import { NBadge, NButton, NCollapse, NCollapseItem, NEmpty, NSpace, NTag } from 'naive-ui';
import { config } from '@/stores/config';
import { session, toggleNode } from '@/stores/builder';
import type { NodeDef } from '@/types';

const props = defineProps<{ disabled?: boolean }>();

const groups = computed(() => {
  const map = new Map<string, NodeDef[]>();
  for (const n of config.value.nodes) {
    const list = map.get(n.group) ?? [];
    list.push(n);
    map.set(n.group, list);
  }
  return [...map.entries()].map(([name, nodes]) => ({ name, nodes }));
});

const selected = computed(() => new Set(session.selectedNodeIds));

function selectedInGroup(nodes: NodeDef[]): number {
  return nodes.filter((n) => selected.value.has(n.id)).length;
}

/** 节点下面包含哪些人（人员字段的中文名），用于行内展示 */
function personNames(node: NodeDef): string[] {
  return node.fields.filter((f) => f.isPerson).map((f) => f.name);
}

function selectAll(): void {
  session.selectedNodeIds = config.value.nodes.map((n) => n.id);
}

function clearAll(): void {
  session.selectedNodeIds = [];
}
</script>

<template>
  <div style="display: flex; flex-direction: column; flex: 1; min-height: 0">
    <div class="panel-head">
      <span class="panel-title">审批节点</span>
      <NBadge
        v-if="session.selectedNodeIds.length"
        :value="session.selectedNodeIds.length"
        type="success"
      />
      <div style="flex: 1"></div>
      <NSpace :size="2">
        <NButton size="tiny" quaternary :disabled="props.disabled" @click="selectAll">全选</NButton>
        <NButton
          size="tiny"
          quaternary
          :disabled="props.disabled || !session.selectedNodeIds.length"
          @click="clearAll"
        >
          清空
        </NButton>
      </NSpace>
    </div>

    <div v-if="props.disabled" style="padding: 12px 4px">
      <NEmpty size="small" description="子表不涉及审批节点，只需添加字段" />
    </div>

    <div v-else class="scroll-y" style="flex: 1; min-height: 0; padding-right: 4px">
      <NCollapse :default-expanded-names="groups.map((g) => g.name)">
        <NCollapseItem v-for="g in groups" :key="g.name" :name="g.name">
          <template #header>
            <span style="font-size: 13px; font-weight: 500">{{ g.name }}</span>
            <NTag
              v-if="selectedInGroup(g.nodes)"
              size="tiny"
              type="success"
              :bordered="false"
              style="margin-left: 6px"
            >
              {{ selectedInGroup(g.nodes) }}/{{ g.nodes.length }}
            </NTag>
          </template>
          <div style="display: flex; flex-direction: column; gap: 4px">
            <button
              v-for="node in g.nodes"
              :key="node.id"
              type="button"
              class="node-row"
              :class="{ 'node-row--on': selected.has(node.id) }"
              @click="toggleNode(node.id)"
            >
              <span class="node-rail" aria-hidden="true"></span>
              <span class="node-main">
                <span class="node-name">{{ node.name }}</span>
                <span v-if="personNames(node).length" class="node-people">{{
                  personNames(node).join('、')
                }}</span>
              </span>
            </button>
          </div>
        </NCollapseItem>
      </NCollapse>
    </div>
  </div>
</template>

<style scoped>
/* 节点行：无勾选框，用彩色背景 + 左侧色条标示选中 */
.node-row {
  position: relative;
  display: flex;
  align-items: flex-start;
  gap: 8px;
  width: 100%;
  text-align: left;
  font: inherit;
  color: var(--text-1);
  background: transparent;
  border: 1px solid transparent;
  border-radius: var(--r-sm);
  padding: 6px 10px 6px 6px;
  cursor: pointer;
  overflow: hidden;
  transition: background var(--dur-fast) var(--ease-out-quart),
    border-color var(--dur-fast) var(--ease-out-quart),
    box-shadow var(--dur-fast) var(--ease-out-quart);
}
.node-row:hover {
  background: var(--surface-2);
}
/* 左侧选中色条（选中时高亮） */
.node-rail {
  position: absolute;
  left: 0;
  top: 6px;
  bottom: 6px;
  width: 3px;
  border-radius: 0 3px 3px 0;
  background: transparent;
  transition: background var(--dur-fast) var(--ease-out-quart);
}
/* 选中态：蓝底 + 左侧色条 */
.node-row--on {
  background: var(--primary-soft);
  border-color: color-mix(in srgb, var(--primary) 28%, transparent);
}
.node-row--on:hover {
  background: color-mix(in srgb, var(--accent-50) 55%, var(--surface-2));
}
.node-row--on .node-rail {
  background: var(--primary);
}
.node-row--on .node-name {
  color: var(--primary);
}
.node-main {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 1px;
  padding-left: 6px;
}
.node-name {
  font-size: 13px;
  font-weight: 500;
  line-height: 1.4;
  transition: color var(--dur-fast) var(--ease-out-quart);
}
.node-people {
  font-size: 11px;
  line-height: 1.4;
  color: var(--text-3);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.node-row--on .node-people {
  color: color-mix(in srgb, var(--text-3) 82%, var(--primary));
}
</style>
