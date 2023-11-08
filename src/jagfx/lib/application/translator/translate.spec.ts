import {
  invalidTarget,
  locale,
  mockedTranslations,
  targetLocale,
  translatedTarget
} from './translate.mock';

import { translate } from './translate';

describe('Translator translate', () => {
  it('A valid translation target must be return the translated string into locale', () => {
    expect(translate(targetLocale, locale, mockedTranslations)).toStrictEqual(
      translatedTarget
    );
  });

  it('An unknown translation must return it without any translation', () => {
    expect(translate(invalidTarget, locale, mockedTranslations)).toStrictEqual(
      invalidTarget
    );
  });
});
