import {
  PreferenceEntry,
  PreferenceEntryCategories,
  PreferenceEntryCollection
} from '../preference-entry.type';

export const existingConfiguration: PreferenceEntryCollection =
  new PreferenceEntryCollection([
    [
      'an_existing_configuration_id',
      {
        id: 'an_existing_configuration_id',
        categories: [PreferenceEntryCategories.Dashboard],
        label: 'Configuration 1',
        description: 'Description 1',
        values: [
          {
            label: 'Value 1',
            value: 'value1'
          }
        ]
      }
    ],
    [
      'another_existing_configuration_id',
      {
        id: 'another_existing_configuration_id',
        categories: [PreferenceEntryCategories.Dashboard],
        label: 'Unicorn label 2',
        description: 'Description 2',
        values: null
      }
    ]
  ]);

export const existingConfigurationId = 'an_existing_configuration_id';
export const expectedPreferenceEntry: PreferenceEntry =
  existingConfiguration.get('an_existing_configuration_id') as PreferenceEntry;

export const unknownPreferenceEntryId = 'an_unknown_preference_entry_id';
