import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ command }) => ({
  plugins: [react()],
  // GitHub Pages serves this site from /optshop/, not the domain root.
  base: command === 'build' ? '/optshop/' : '/',
  server: { port: 5173 },
}));
