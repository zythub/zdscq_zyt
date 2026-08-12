const esbuild = require('esbuild');
const path = require('path');

esbuild
  .build({
    entryPoints: ['word_test3.ts'],
    bundle: true,
    platform: 'node',
    format: 'cjs',
    outfile: 'dist_word_test3/test.cjs',
    alias: { '@': path.resolve('src') },
    external: ['jszip', 'pinyin-pro', 'vue'],
    logLevel: 'warning',
  })
  .then(() => {
    require('./dist_word_test3/test.cjs');
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
