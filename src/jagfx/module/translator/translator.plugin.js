import { translate } from '@/jagfx/module/translator/core/translate.js';
import { useTranslator } from '@/jagfx/module/translator/useTranslator.js';

export default {
  install: (app) => {
    const { currentLocale } = useTranslator();
    app.config.globalProperties.$t = (target) =>
      translate(target, currentLocale.value);
  }
};
