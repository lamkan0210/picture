
import { defineConfig } from 'vite';

export default defineConfig({
  base: './', // 确保在子目录下也能正常运行
  build: {
    outDir: 'dist',
    minify: 'terser',
    sourcemap: false
  }
});
