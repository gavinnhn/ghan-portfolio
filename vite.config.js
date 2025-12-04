import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        bauhaus: resolve(__dirname, 'project-bauhaus.html'),
        metalica: resolve(__dirname, 'project-metalica.html'),
        fff: resolve(__dirname, 'project-fff.html'),
        dada: resolve(__dirname, 'project-dada.html'),
      },
    },
  },
});

