import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import autoprefixer from 'autoprefixer';
import tailwindcss from '@tailwindcss/postcss'; // Import the PostCSS plugin

export default defineConfig({
  plugins: [react()],
  base: '/',
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false,
      },
    },
  },
  define: {
    'process.env': {}
  },
  css: {
    postcss: {
      plugins: [
        tailwindcss(), // Use the imported PostCSS plugin
        autoprefixer(),
      ],
    },
  },
});