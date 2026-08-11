// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  devToolbar: {
    enabled: false,
  },
  server: {
    host: true,
    port: 4321,
  },
  vite: {
    plugins: [tailwindcss()],
    server: {
      allowedHosts: true,
      cors: true,
    },
    build: {
      sourcemap: false,
      minify: 'esbuild',
      cssMinify: true,
      // Reduce easy reconstruction of modules
      modulePreload: { polyfill: false },
    },
  },

  integrations: [react()],
});
