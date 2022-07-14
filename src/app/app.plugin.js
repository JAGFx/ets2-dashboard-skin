import { translate } from '@/translator/i18n.util';

export default {
  install: (app) => {
    app.config.globalProperties.$t = translate;
  }
};
