const existingConfigurationId = 'an_existing_configuration_id';
const existingConfiguration = [
  {
    id: 'an_existing_configuration_id',
    target: 'application',
    label: 'Configuration 1',
    description: 'Description 1',
    values: [
      {
        label: 'Value 1',
        value: 'value1'
      }
    ]
  }
];
jest.mock('@/domain/user-preferences/map.json', () => existingConfiguration);

import { findPreferenceEntryById } from '@/domain/user-preferences/preference-entry.util';

describe('Preference entries', () => {
  it('An existing preference entry must return data successfully', () => {
    const configuration = findPreferenceEntryById(existingConfigurationId);

    expect(configuration).toMatchObject(existingConfiguration.at(0));
  });

  it('An unknown preference entry must thrown an exception', () => {
    const unknownPreferenceEntryId = 'an_unknown_preference_entry_id';
    expect(() =>
      findPreferenceEntryById(unknownPreferenceEntryId)
    ).toThrowError(
      `Unable to find ${unknownPreferenceEntryId} on preference entries list`
    );
  });
});
