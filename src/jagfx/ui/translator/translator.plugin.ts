import { translate } from 'ets2-dashboard-skin-lib';
import { App } from 'vue';

import {
  translations,
  useTranslator
} from '@/jagfx/ui/translator/hook/useTranslator';

export default {
  install: (app: App): void => {
    const { currentLocale } = useTranslator();
    app.config.globalProperties.$t = (target: string): string =>
      translate(target, currentLocale.value, translations);
  }
};
