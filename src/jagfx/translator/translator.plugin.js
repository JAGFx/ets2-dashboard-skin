import { translate } from '@/jagfx/translator/core/translate.js';
import { useTranslator } from '@/jagfx/translator/useTranslator.js';

export default {
  install: (app) => {
    const { currentLocale } = useTranslator();
    app.config.globalProperties.$t = (target) =>
      translate(target, currentLocale.value);
  }
};
