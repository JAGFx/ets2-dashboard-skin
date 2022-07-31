import { useTranslator } from '@/jagfx/translator/useTranslator.js';
import { translate } from '@/jagfx/translator/core/translate.js';

export default {
  install: (app) => {
    const { currentLocale } = useTranslator();
    app.config.globalProperties.$t = (target) =>
      translate(target, currentLocale.value);
  }
};
