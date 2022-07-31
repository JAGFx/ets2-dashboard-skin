// yaml-jest: npm i && npm run build

import {
  getTranslationToGivenLocale,
  translate,
  translations
} from '@/jagfx/translator/core/translate.js';

const mockedFrTranslations = {
  'English target': 'Cible français'
};
const locale = 'fr-FR';

describe('Translator translate', () => {
  beforeEach(() => {
    translations[locale] = mockedFrTranslations;
  });

  it('Translation must be return to a supported locale successfully', () => {
    expect(getTranslationToGivenLocale(locale)).toBe(mockedFrTranslations);
  });

  const unknownLocales = ['fr-fr', undefined, null, 123, {}, 'it-IT'];
  it.each(unknownLocales)(
    'Unknown locale translation must return an empty object',
    (unknownLocale) => {
      expect(getTranslationToGivenLocale(unknownLocale)).toStrictEqual({});
    }
  );

  //const getTranslationToGivenLocaleMock = jest.fn();
  it('A valid translation target must be return the translated string into locale', () => {
    const targetLocale = Object.keys(mockedFrTranslations).at(0);
    const translatedTarget = Object.values(mockedFrTranslations).at(0);

    expect(translate(targetLocale, locale)).toStrictEqual(translatedTarget);
  });

  it('An unknown translation must return it without any translation', () => {
    const invalidTarget = 'Unicorn powa';
    expect(translate(invalidTarget, locale)).toStrictEqual(invalidTarget);
  });
});
