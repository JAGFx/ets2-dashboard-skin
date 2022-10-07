import { App } from 'vue';

import { translate } from '@/jagfx/core/application/translator/translate';

import { useTranslator } from '@/jagfx/application/components/shared/translator/useTranslator';

export default {
  install: (app: App): void => {
    const { currentLocale } = useTranslator();
    app.config.globalProperties.$t = (target: string): string =>
      translate(target, currentLocale.value);
  }
};
