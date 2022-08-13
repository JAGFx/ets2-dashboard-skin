import { computed, reactive, readonly } from 'vue';

import { changeLocale } from '@/jagfx/core/application/translator/locale.js';

const state = reactive({
  locale: 'fr-FR'
});

const getters = {
  currentLocale: computed(() => state.locale)
};
const actions = {
  changeLocale: (newLocale) => {
    changeLocale(newLocale);
    state.locale = newLocale;
  }
};

export const useTranslator = () => ({
  state: readonly(state),
  ...getters,
  ...actions
});
