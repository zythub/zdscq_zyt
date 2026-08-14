<script setup lang="ts">
import { computed, ref } from 'vue';
import {
  NButton,
  NConfigProvider,
  NDialogProvider,
  NMessageProvider,
  darkTheme,
  dateZhCN,
  zhCN,
} from 'naive-ui';
import type { GlobalThemeOverrides } from 'naive-ui';
import ToolLayout from '@/layouts/ToolLayout.vue';
import { acknowledgeBaseline, baselineUpdated, overrideCount } from '@/stores/config';

const isDark = ref(localStorage.getItem('zdscq:theme') === 'dark');
const theme = computed(() => (isDark.value ? darkTheme : null));

function toggleTheme(): void {
  isDark.value = !isDark.value;
  localStorage.setItem('zdscq:theme', isDark.value ? 'dark' : 'light');
  document.documentElement.classList.toggle('dark', isDark.value);
}

document.documentElement.classList.toggle('dark', isDark.value);

/* 与 tokens.css 对齐的 Naive UI 主题覆盖（明暗两套）。
   原语色用 hex 提供，避免 Naive 内部颜色运算对 oklch 的兼容问题。 */
const lightOverrides: GlobalThemeOverrides = {
  common: {
    primaryColor: '#0f6f8f',
    primaryColorHover: '#0c5e7a',
    primaryColorPressed: '#0a4f67',
    primaryColorSuppl: '#0c5e7a',
    borderRadius: '7px',
    borderColor: '#e2e8ee',
    dividerColor: '#e2e8ee',
    cardColor: '#ffffff',
    modalColor: '#ffffff',
    bodyColor: '#f7f9fb',
    inputColor: '#ffffff',
    actionColor: '#eef2f6',
    hoverColor: 'rgba(31, 42, 55, 0.05)',
    textColorBase: '#1f2a37',
    textColor1: '#1f2a37',
    textColor2: '#4a5868',
    textColor3: '#8a98a8',
    placeholderColor: '#8a98a8',
    fontWeightStrong: '600',
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Microsoft YaHei", sans-serif',
    // 整体放大一档，使 tiny/small 控件更易读
    fontSize: '18px',
    fontSizeTiny: '16px',
    fontSizeSmall: '17px',
    fontSizeMedium: '18px',
    fontSizeLarge: '18px',
    fontSizeHuge: '22px',
    lineHeight: '1.5',
  },
  Card: { borderRadius: '10px' },
  Dialog: { borderRadius: '12px' },
  Drawer: { borderRadius: '12px' },
};

const darkOverrides: GlobalThemeOverrides = {
  common: {
    primaryColor: '#38b3d4',
    primaryColorHover: '#2da3c4',
    primaryColorPressed: '#1f8aa8',
    primaryColorSuppl: '#2da3c4',
    borderRadius: '7px',
    borderColor: '#28323c',
    dividerColor: '#28323c',
    cardColor: '#151b22',
    modalColor: '#151b22',
    bodyColor: '#0a0e12',
    inputColor: '#1c242d',
    actionColor: '#1c242d',
    hoverColor: 'rgba(255, 255, 255, 0.06)',
    textColorBase: '#eef2f6',
    textColor1: '#eef2f6',
    textColor2: '#aab6c3',
    textColor3: '#6f7e8c',
    placeholderColor: '#6f7e8c',
    fontWeightStrong: '600',
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Microsoft YaHei", sans-serif',
    // 整体放大一档，使 tiny/small 控件更易读
    fontSize: '15px',
    fontSizeTiny: '13px',
    fontSizeSmall: '14px',
    fontSizeMedium: '15px',
    fontSizeLarge: '17px',
    fontSizeHuge: '20px',
    lineHeight: '1.5',
  },
  Card: { borderRadius: '10px' },
  Dialog: { borderRadius: '12px' },
  Drawer: { borderRadius: '12px' },
};

const themeOverrides = computed<GlobalThemeOverrides>(() =>
  isDark.value ? darkOverrides : lightOverrides,
);
</script>

<template>
  <NConfigProvider :theme="theme" :theme-overrides="themeOverrides" :locale="zhCN" :date-locale="dateZhCN">
    <NMessageProvider>
      <NDialogProvider>
        <div style="height: 100vh; display: flex; flex-direction: column; overflow: hidden">
          <div
            v-if="baselineUpdated"
            style="
              display: flex;
              align-items: center;
              gap: 10px;
              padding: 6px 14px;
              font-size: 14px;
              background: var(--primary-soft);
              color: var(--text-1);
              flex-shrink: 0;
            "
          >
            <span>
              团队配置基线已更新，你有 {{ overrideCount }} 项个人覆盖仍然生效
            </span>
            <NButton size="tiny" @click="acknowledgeBaseline">知道了</NButton>
          </div>
          <div style="flex: 1; min-height: 0">
            <ToolLayout :is-dark="isDark" @toggle-theme="toggleTheme" />
          </div>
        </div>
      </NDialogProvider>
    </NMessageProvider>
  </NConfigProvider>
</template>
