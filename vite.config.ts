import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

/**
 * base 可通过环境变量覆盖，用于构建成「子应用」：
 *   BASE_PATH=/tools/ npm run build:only   → 产物可挂在手册站 dist/tools/ 下
 *   BASE_PATH=/zdscq_zyt/ npm run build:only → GitHub Pages 项目页（默认）
 *   不设 BASE_PATH 时，build 用 /zdscq_zyt/、dev 用 /（保持原有行为）
 */
const BASE_PATH = process.env.BASE_PATH;

export default defineConfig(({ command }) => ({
  base: BASE_PATH ?? (command === 'build' ? '/zdscq_zyt/' : '/'),
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  // 不让 vite 触碰 public/legacy，沙箱下 copyFileSync 偶发 EPERM。
  // public/legacy 由 build 脚本手动 cp 到 dist/legacy。
  publicDir: false,
  build: {
    outDir: process.env.OUT_DIR || 'dist',
    emptyOutDir: true,
    // public/legacy 会被原样拷贝到 dist/legacy
    chunkSizeWarningLimit: 1500,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['vue', 'naive-ui'],
          xlsx: ['xlsx'],
          pinyin: ['pinyin-pro'],
        },
      },
    },
  },
}));
