// yaml-jest: npm i && npm run build
import {
  invalidTarget,
  locale,
  mockedFrTranslations,
  targetLocale,
  translatedTarget
} from './translate.mock';

import {
  getTranslationToGivenLocale,
  translate,
  translations
} from './translate';

describe('Translator translate', () => {
  beforeEach(() => {
    translations[locale] = mockedFrTranslations;
  });

  it('Translation must be return to a supported locale successfully', () => {
    expect(getTranslationToGivenLocale(locale)).toBe(mockedFrTranslations);
  });

  it('A valid translation target must be return the translated string into locale', () => {
    expect(translate(targetLocale, locale)).toStrictEqual(translatedTarget);
  });

  it('An unknown translation must return it without any translation', () => {
    expect(translate(invalidTarget, locale)).toStrictEqual(invalidTarget);
  });
});
