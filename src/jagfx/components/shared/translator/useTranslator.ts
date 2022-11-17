import { computed, reactive } from 'vue';

import { TranslationLocale } from 'ets2-dashboard-core/src/application/translator/translate.type';

type TranslatorState = {
  locale: TranslationLocale;
};

const state = reactive<TranslatorState>({
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
  ...getters,
  ...actions
});
