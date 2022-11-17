import {
  mockPreferenceEntry,
  preferenceEntry
} from '@core/configuration/preference-entry/test/loader.mock';

import { loadPreferenceEntryValues } from '@core/configuration/preference-entry/loader';
import { PreferenceEntry } from '@core/configuration/preference-entry/preference-entry.type';

describe('Preference entries finder', () => {
  // Array not empty > Return this array
  // Array empty  > Perform external request
  // Null         > No value, return null
  it('Should return the same array if preference entry value is an array not empty', () => {
    expect(loadPreferenceEntryValues(preferenceEntry)).toBe(
      preferenceEntry.values
    );
  });

  const invalidPreferenceEntries: PreferenceEntry[] = [
    mockPreferenceEntry(null)
  ];
  it.each(invalidPreferenceEntries)(
    'Should return null with invalid preferenceEntry',
    (invalidPreferenceEntry: PreferenceEntry) => {
      expect(loadPreferenceEntryValues(invalidPreferenceEntry)).toBeNull();
    }
  );
});
