import {
  anExistingConfiguratonEntry,
  unknownFilters,
  validFilters
} from '@core/configuration/preference-entry/test/filter.mock';

import { TranslationLocale } from '@core/application/translator/translate.type';
import { preferenceEntryMatchWithFilter } from '@core/configuration/preference-entry/filter';
import { PreferenceEntryFilters } from '@core/configuration/preference-entry/filter.type';

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
