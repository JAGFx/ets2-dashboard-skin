import { loadPreferenceEntryValues } from '@/jagfx/core/configuration/preference-entry/loader';

const mockPreferenceEntry = (values) => ({
  values
});

describe('Preference entries finder', () => {
  // Array not empty > Return this array
  // Array empty  > Perform external request
  // Null         > No value, return null
  it('Should return the same array if preference entry value is an array not empty', () => {
    const preferenceEntry = mockPreferenceEntry(['some', 'stuff']);

    expect(loadPreferenceEntryValues(preferenceEntry)).toBe(
      preferenceEntry.values
    );
  });

  const invalidPreferenceEntries = [
    {},
    '',
    'string',
    123,
    undefined,
    null,
    new Event(''),
    { label: '' },
    mockPreferenceEntry(null)
  ];
  it.each(invalidPreferenceEntries)(
    'Should return null with invalid preferenceEntry',
    (invalidPreferenceEntry) => {
      expect(loadPreferenceEntryValues(invalidPreferenceEntry)).toBeNull();
    }
  );
});
