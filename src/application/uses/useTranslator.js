import { changeLocale } from '@/domain/translator/locale.js';
import { computed, reactive, readonly } from 'vue';

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
