import { TranslationLocale, Translations } from 'ets2-dashboard-skin-lib';
import { computed, reactive } from 'vue';

import cn_cn from '@/jagfx/ui/translator/translations/cn-CN.yaml';
import fr_fr from '@/jagfx/ui/translator/translations/fr-FR.yaml';
import pt_pt from '@/jagfx/ui/translator/translations/pt-PT.yaml';
import ru_ru from '@/jagfx/ui/translator/translations/ru-RU.yaml';

export const translations: Translations = {
  'fr-FR': fr_fr,
  'cn-CN': cn_cn,
  'ru-RU': ru_ru,
  'pt-PT': pt_pt
};

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
