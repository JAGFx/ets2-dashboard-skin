import { useTranslator } from '@/application/uses/useTranslator.js';
import { translate } from '@/domain/translator/translate.js';

export default {
  install: (app) => {
    const { currentLocale } = useTranslator();
    app.config.globalProperties.$t = (target) =>
      translate(target, currentLocale.value);
  }
};
