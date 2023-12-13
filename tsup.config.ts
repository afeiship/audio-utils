import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: [/*'cjs', 'esm',*/ 'iife'],
  splitting: true,
  cjsInterop: true,
  globalName: 'audioUtils',
  external: ['media-devices', 'howler'],
  dts: true,
  clean: true,
  sourcemap: true,
  outExtension({ format }) {
    return {
      js: `.${format}.js`,
    };
  },
});
