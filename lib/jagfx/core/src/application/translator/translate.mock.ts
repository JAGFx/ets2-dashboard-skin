import {
  Translation,
  TranslationLocale
} from '@core/application/translator/translate.type';

export const mockedFrTranslations: Translation = {
  'English target': 'Cible français'
};
export const locale = TranslationLocale.FR_FR;

export const invalidTarget = 'Unicorn powa';

export const targetLocale: string = Object.keys(mockedFrTranslations).at(
  0
) as string;
export const translatedTarget: string = Object.values(mockedFrTranslations).at(
  0
) as string;
