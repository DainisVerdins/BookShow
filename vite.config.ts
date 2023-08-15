/// <reference types="vitest" />
import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      "@components": fileURLToPath(new URL('./src/components', import.meta.url)),
      "@interfaces": fileURLToPath(new URL('./src/interfaces', import.meta.url)),
      "@services": fileURLToPath(new URL('./src/services', import.meta.url)),
      "@views":  fileURLToPath(new URL('./src/views', import.meta.url)),
    }
  },
  test: {
    environment: 'happy-dom',
    include: ['./tests/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
  },
  // TODO: this stuff must be putted in settings.json or something
  server: {
    port: 5173,
    host: 'localhost',
  },
})
