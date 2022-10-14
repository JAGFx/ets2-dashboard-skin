import vue from '@vitejs/plugin-vue';
import { fileURLToPath, URL } from 'url';
import { defineConfig } from 'vite';
import ViteYaml         from "@modyfi/vite-plugin-yaml";

export default defineConfig({
  plugins: [vue(), ViteYaml()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('../src', import.meta.url))
    }
  }
});