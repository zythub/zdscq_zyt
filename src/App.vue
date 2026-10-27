<script setup lang="ts">
import { computed, provide, ref, type Ref } from 'vue';
import {
  NConfigProvider,
  NDialogProvider,
  NMessageProvider,
  darkTheme,
  dateZhCN,
  zhCN,
} from 'naive-ui';
import type { GlobalThemeOverrides } from 'naive-ui';
import ToolLayout from '@/layouts/ToolLayout.vue';

/**
 * 深浅色状态。与「自定义表单知识库」手册站共用同一个 localStorage key
 * （handbook.theme），两个站切换后互相保持一致 —— 手册站和工具页是同一个站。
 * 旧的 zdscq:theme 作为回退保留（升级前的老用户不丢偏好）。
 */
const THEME_KEY = 'handbook.theme';
const LEGACY_THEME_KEY = 'zdscq:theme';

function readTheme(): 'dark' | 'light' {
  try {
    const v = localStorage.getItem(THEME_KEY) || localStorage.getItem(LEGACY_THEME_KEY);
    // 都没存过时默认深色（与手册站一致）
    return v === 'light' ? 'light' : 'dark';
  } catch {
    return 'dark';
  }
}

const isDark = ref(readTheme() === 'dark');
const theme = computed(() => (isDark.value ? darkTheme : null));

// 启动即落盘：手册站（dist/index.html）读同一个 key，两边深浅色始终一致
try {
  localStorage.setItem(THEME_KEY, isDark.value ? 'dark' : 'light');
} catch {
  /* 忽略 */
}

function toggleTheme(): void {
  isDark.value = !isDark.value;
  try {
    localStorage.setItem(THEME_KEY, isDark.value ? 'dark' : 'light');
  } catch {
    /* 忽略 */
  }
  document.documentElement.classList.toggle('dark', isDark.value);
}

document.documentElement.classList.toggle('dark', isDark.value);

/* 把主题状态暴露给任意组件（手册等"无外壳"页面需要自带深浅色切换） */
interface AppThemeApi {
  isDark: Ref<boolean>;
  toggle: () => void;
}
provide<AppThemeApi>('appTheme', { isDark, toggle: toggleTheme });

/* 与 tokens.css / 全局保持一致（Naive UI 主题覆盖与 CSS 变量同一套值） */
const lightOverrides: GlobalThemeOverrides = {
  common: {
    primaryColor: '#1d4ed8',
    primaryColorHover: '#4f7ff0',
    primaryColorPressed: '#1e40af',
    primaryColorSuppl: '#4f7ff0',
    borderRadius: '8px',
    borderColor: '#e3e8ef',
    dividerColor: '#e3e8ef',
    cardColor: '#ffffff',
    modalColor: '#ffffff',
    bodyColor: '#f4f6f9',
    inputColor: '#ffffff',
    actionColor: '#f1f5f9',
    hoverColor: 'rgba(29, 78, 216, 0.06)',
    textColorBase: '#0f172a',
    textColor1: '#0f172a',
    textColor2: '#4b5b6f',
    textColor3: '#94a3b8',
    placeholderColor: '#cbd5e1',
    fontWeightStrong: '600',
    fontFamily:
      "'Segoe UI', -apple-system, BlinkMacSystemFont, 'PingFang SC', 'Microsoft YaHei', sans-serif",
    // 整体放大一档，使 tiny/small 控件更易读
    fontSize: '18px',
    fontSizeTiny: '16px',
    fontSizeSmall: '17px',
    fontSizeMedium: '18px',
    fontSizeLarge: '18px',
    fontSizeHuge: '22px',
    lineHeight: '1.5',
  },
  Card: { borderRadius: '12px' },
  Dialog: { borderRadius: '12px' },
  Drawer: { borderRadius: '12px' },
};

const darkOverrides: GlobalThemeOverrides = {
  common: {
    primaryColor: '#72a0ff',
    primaryColorHover: '#93b4ff',
    primaryColorPressed: '#4f7ff0',
    primaryColorSuppl: '#93b4ff',
    borderRadius: '8px',
    borderColor: '#1e2a3f',
    dividerColor: '#1e2a3f',
    cardColor: '#111a2b',
    modalColor: '#111a2b',
    bodyColor: '#0b1220',
    inputColor: '#111a2b',
    actionColor: '#1c2536',
    hoverColor: 'rgba(114, 160, 255, 0.12)',
    textColorBase: '#e6edf7',
    textColor1: '#e6edf7',
    textColor2: '#a3b2c7',
    textColor3: '#6b7c93',
    placeholderColor: '#4a5a70',
    fontWeightStrong: '600',
    fontFamily:
      "'Segoe UI', -apple-system, BlinkMacSystemFont, 'PingFang SC', 'Microsoft YaHei', sans-serif",
    // 整体放大一档，使 tiny/small 控件更易读
    fontSize: '15px',
    fontSizeTiny: '13px',
    fontSizeSmall: '14px',
    fontSizeMedium: '15px',
    fontSizeLarge: '17px',
    fontSizeHuge: '20px',
    lineHeight: '1.5',
  },
  Card: { borderRadius: '12px' },
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
          <div style="flex: 1; min-height: 0">
            <ToolLayout :is-dark="isDark" @toggle-theme="toggleTheme" />
          </div>
        </div>
      </NDialogProvider>
    </NMessageProvider>
  </NConfigProvider>
</template>
