declare module '*.vue' {
  import { defineComponent } from 'vue';
  const Component: ReturnType<typeof defineComponent>;
  export default Component;
}

interface ImportMetaEnv {
  readonly VITE_USE_FAKE_DATA: string;
  MODE: 'development' | 'production';
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
