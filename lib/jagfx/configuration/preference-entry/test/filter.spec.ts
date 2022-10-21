import {
  anExistingConfiguratonEntry,
  unknownFilters,
  validFilters
} from './filter.mock';

import { TranslationLocale } from '../../../application/translator/translate.type';
import { preferenceEntryMatchWithFilter } from '../filter';
import { PreferenceEntryFilters } from '../filter.type';

describe('Preference entry filter', () => {
  it.each(unknownFilters)(
    'Preference entries must not have any differences with invalid filters',
    (filter: PreferenceEntryFilters) => {
      expect(
        preferenceEntryMatchWithFilter(
          anExistingConfiguratonEntry,
          filter,
          TranslationLocale.FR_FR
        )
      ).toBeFalsy();
    }
  );

  it.each(validFilters)(
    'A preference entry must be returned with matched filters',
    (filter: PreferenceEntryFilters) => {
      expect(
        preferenceEntryMatchWithFilter(
          anExistingConfiguratonEntry,
          filter,
          TranslationLocale.FR_FR
        )
      ).toBeTruthy();
    }
  );
});
