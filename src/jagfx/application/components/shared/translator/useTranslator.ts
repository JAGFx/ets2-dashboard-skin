import { computed, reactive, readonly } from 'vue';

import { TranslationLocale } from '@/jagfx/core/application/translator/translate.type';

type TranslatorState = {
  locale: TranslationLocale;
};

const state: TranslatorState = reactive({
  locale: TranslationLocale.FR_FR
});

const getters = {
  currentLocale: computed<TranslationLocale>(() => state.locale)
};
const actions = {
  changeLocale: (newLocale: TranslationLocale) => {
    state.locale = newLocale;
  }
};

export const useTranslator = () => ({
  state: readonly(state),
  ...getters,
  ...actions
});
