import { TranslationLocale } from 'ets2-dashboard-lib/jagfx/application/translator/translate.type';
import { computed, reactive, readonly } from 'vue';

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
  state: readonly(state),
  ...getters,
  ...actions
});
