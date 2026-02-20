import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/',
  build: {
    rollupOptions: {
      input: {
        main: new URL('./index.html', import.meta.url).pathname,
        en: new URL('./en/index.html', import.meta.url).pathname,
        zh: new URL('./zh/index.html', import.meta.url).pathname,
      },
    },
  },
});
