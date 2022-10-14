import {
  convertJsonObjectToPreferenceEntry,
  findPreferenceEntryById
} from '../finder';
import { PreferenceEntry } from '../preference-entry.type';

export const existingConfiguration: PreferenceEntry[] = [
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

export const existingConfigurationId = 'an_existing_configuration_id';

export const preferenceEntry: PreferenceEntry = findPreferenceEntryById(
  existingConfigurationId
);
export const expectedPreferenceEntry: PreferenceEntry =
  existingConfiguration.at(0) as PreferenceEntry;

export const unknownPreferenceEntryId = 'an_unknown_preference_entry_id';

export const anonymousObject: PreferenceEntry = existingConfiguration.at(
  0
) as PreferenceEntry;
export const convertedObject: PreferenceEntry =
  convertJsonObjectToPreferenceEntry(anonymousObject);

export default () => {
  jest.mock(
    '@/jagfx/core/configuration/preference-entry/list.json',
    () => existingConfiguration,
    { virtual: true }
  );
};
