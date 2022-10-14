import { mockPreferenceEntry, preferenceEntry } from './loader.mock';

import { loadPreferenceEntryValues } from '../loader';
import { PreferenceEntry } from '../preference-entry.type';

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
