import { translate } from '@/jagfx/core/application/translator/translate.js';

import { useTranslator } from '@/jagfx/application/components/shared/translator/useTranslator.js';

export default {
  install: (app) => {
    const { currentLocale } = useTranslator();
    app.config.globalProperties.$t = (target) =>
      translate(target, currentLocale.value);
  }
};
