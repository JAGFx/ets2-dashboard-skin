import { PreferenceEntry } from '@/jagfx/core/configuration/preference-entry/PreferenceEntry';
import {
  convertJsonObjectToPreferenceEntry,
  findPreferenceEntryById
} from '@/jagfx/core/configuration/preference-entry/finder';

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
  },
  {
    id: 'another_existing_configuration_id',
    target: 'application',
    label: 'Unicorn label 2',
    description: 'Description 2',
    values: null
  }
];

jest.mock(
  '@/jagfx/core/configuration/preference-entry/map.json',
  () => existingConfiguration
);

describe('Preference entries finder', () => {
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

  it('An object typed of PreferenceEntry must be returned by the converter successfully', () => {
    const anonymousObject = existingConfiguration.at(0);
    const convertedObject = convertJsonObjectToPreferenceEntry(anonymousObject);

    expect(convertedObject instanceof PreferenceEntry).toBeTruthy();
    expect(convertedObject).toMatchObject(
      new PreferenceEntry(
        anonymousObject.id,
        anonymousObject.target,
        anonymousObject.label,
        anonymousObject.description,
        anonymousObject.values
      )
    );
  });
});
