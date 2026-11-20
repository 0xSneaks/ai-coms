import { defineConfig } from 'vite';

const frameAncestors =
  "frame-ancestors 'self' https://chat.cherry.fun https://cherry.fun https://*.cherry.fun";

export default defineConfig({
  server: {
    port: 5173,
    strictPort: true,
    host: '127.0.0.1',
    headers: { 'Content-Security-Policy': frameAncestors },
  },
  preview: {
    port: 4173,
    host: '127.0.0.1',
    headers: { 'Content-Security-Policy': frameAncestors },
  },
});
