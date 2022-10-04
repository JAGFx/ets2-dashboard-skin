import { App } from 'vue';

import { translate } from '@/jagfx/core/application/translator/translate';

import { useTranslator } from '@/jagfx/application/components/shared/translator/useTranslator';

export default {
  install: (app: App) => {
    const { currentLocale } = useTranslator();
    app.config.globalProperties.$t = (target: string) =>
      translate(target, currentLocale.value);
  }
};
