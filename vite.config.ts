import { defineConfig } from 'vite';
import { tanstackStart } from '@tanstack/react-start/plugin/vite';
import viteReact from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  server: {
    port: 1995,
  },
  plugins: [
    tailwindcss(),
    tsconfigPaths({
      projects: ['./tsconfig.json'],
      ignoreConfigErrors: true,
    }),
    tanstackStart({
      srcDirectory: '.',
      router: {
        routesDirectory: 'app',
      },
      server: {
        preset: 'netlify',
      },
    }),
    viteReact(),
  ],
  ssr: {
    noExternal: ['@tanstack/router-core'],
  },
});
