// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  server: {
    host: true,
    port: 4321,
  },
  vite: {
    plugins: [tailwindcss()],
    server: {
      // Allow LAN partners to open http://<your-ip>:4321
      allowedHosts: true,
      cors: true,
    },
  },

  integrations: [react()]
});
