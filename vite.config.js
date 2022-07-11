import { resolve }      from "path";
//import vue              from "@vue/compat";
import ViteYaml from '@modyfi/vite-plugin-yaml';
import vue from '@vitejs/plugin-vue';
import { defineConfig } from "vite";

export default defineConfig({
  resolve: {
    alias: {
      vue: '@vue/compat',
      '@': resolve(__dirname, './src')
    }
  },
  plugins: [
    vue({
      template: {
        compilerOptions: {
          compatConfig: {
            MODE: 2
          }
        }
      }
    }),
    ViteYaml()
  ]
})