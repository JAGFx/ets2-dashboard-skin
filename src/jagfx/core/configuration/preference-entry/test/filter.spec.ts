import {
  existingConfiguration,
  unknownFilters,
  validFilters
} from '@/jagfx/core/configuration/preference-entry/test/filter.mock';

import { applyFiltersToPreferenceEntriesList } from '@/jagfx/core/configuration/preference-entry/filter';
import { PreferenceEntryFilters } from '@/jagfx/core/configuration/preference-entry/filter.type';

describe('Preference entry filter', () => {
  it.each(unknownFilters)(
    'Preference entries must not have any differences with invalid filters',
    (filter: PreferenceEntryFilters) => {
      expect(
        applyFiltersToPreferenceEntriesList(filter, existingConfiguration)
      ).toStrictEqual(existingConfiguration);
    }
  );

  it.each(validFilters)(
    'A preference entry must be returned with matched filters',
    (filter: PreferenceEntryFilters) => {
      expect(
        applyFiltersToPreferenceEntriesList(filter, existingConfiguration).at(0)
      ).toStrictEqual(existingConfiguration.at(1));
    }
  );
});
