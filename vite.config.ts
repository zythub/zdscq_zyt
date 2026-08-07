import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// GitHub Pages 项目页部署在 /zdscq_zyt/ 子路径下，本地开发用 /
export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/zdscq_zyt/' : '/',
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
    outDir: 'dist',
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
