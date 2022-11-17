import { App } from 'vue';

import { translate } from 'ets2-dashboard-core/src/application/translator/translate';

import { useTranslator } from '@/jagfx/components/shared/translator/useTranslator';

export default {
  install: (app: App): void => {
    const { currentLocale } = useTranslator();
    app.config.globalProperties.$t = (target: string): string =>
      translate(target, currentLocale.value);
  }
};
