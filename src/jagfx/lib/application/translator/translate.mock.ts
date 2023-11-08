import { Translation, TranslationLocale, Translations } from './translate.type';

export const mockedFrTranslations: Translation = {
  'English target': 'Cible français'
};
export const mockedTranslations: Translations = {
  [TranslationLocale.FR_FR]: mockedFrTranslations,
  [TranslationLocale.PT_PT]: {},
  [TranslationLocale.RU_RU]: {},
  [TranslationLocale.CN_CN]: {}
};

export const locale: TranslationLocale = TranslationLocale.FR_FR;

export const invalidTarget = 'Unicorn powa';

export const targetLocale: string = Object.keys(mockedFrTranslations).at(
  0
) as string;
export const translatedTarget: string = Object.values(mockedFrTranslations).at(
  0
) as string;
