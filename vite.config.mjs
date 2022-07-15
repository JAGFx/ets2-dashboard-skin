//import vue              from "@vue/compat";
import ViteYaml         from "@modyfi/vite-plugin-yaml";
import vue              from "@vitejs/plugin-vue";
import { defineConfig } from "vite";
import { fileURLToPath, URL } from "url";

export default defineConfig({
  resolve: {
    alias: {
      vue: '@vue/compat',
      "@": fileURLToPath(new URL("./src", import.meta.url)),
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