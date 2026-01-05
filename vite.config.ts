import { defineConfig } from 'vite';
import { tanstackStart } from '@tanstack/react-start/plugin/vite';
import viteReact from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import tailwindcss from '@tailwindcss/vite';
import netlify from '@netlify/vite-plugin-tanstack-start';

export default defineConfig({
  server: {
    port: 1995,
  },
  build: {
    manifest: true,
    rollupOptions: {
      input: './app/index.tsx',
    },
  },
  plugins: [
    tanstackStart({
      srcDirectory: '.',
      router: {
        routesDirectory: 'app',
      },
    }),
    tailwindcss(),
    tsconfigPaths({
      projects: ['./tsconfig.json'],
      ignoreConfigErrors: true,
    }),
    viteReact(),
    netlify(),
  ],
  ssr: {
    noExternal: ['@tanstack/router-core'],
  },
});
