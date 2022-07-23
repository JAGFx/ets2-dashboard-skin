import { availableLocale, changeLocale } from '@/domain/translator/locale.js';

describe('Translator locale test', () => {
  it.each(availableLocale)(
    'Change the locale successfully with valid locale',
    (locale) => {
      expect(changeLocale(locale)).toStrictEqual(locale);
    }
  );

  const invalidLocale = ['fr-fr', 'it-IT'];
  it.each(invalidLocale)(
    'Change the locale must thrown an exception with invalid locale',
    (invalidLocale) => {
      expect(() => changeLocale(invalidLocale)).toThrow(
        `Unsupported locale: ${invalidLocale}`
      );
    }
  );
});
