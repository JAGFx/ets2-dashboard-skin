import { PreferenceEntryFilters } from '@core/configuration/preference-entry/filter.type';
import {
  PreferenceEntry,
  PreferenceEntryCategories
} from '@core/configuration/preference-entry/preference-entry.type';

export const anExistingConfiguratonEntry = new PreferenceEntry(
  'an_existing_configuration_id',
  [PreferenceEntryCategories.Dashboard],
  'Existing Label 1',
  'Description 1',
  [
    {
      label: 'Value 1',
      value: 'value1'
    }
  ]
);

export const unknownFilters: PreferenceEntryFilters[] = [
  { search: 'Unicorn', categories: [] },
  {
    search: 'Unicorn',
    categories: [
      PreferenceEntryCategories.Dashboard,
      PreferenceEntryCategories.Elements
    ]
  },
  { search: 'Unicorn', categories: [PreferenceEntryCategories.Elements] }
];

export const validFilters: PreferenceEntryFilters[] = [
  { search: '', categories: [] },
  { search: 'Existing Label 1', categories: [] },
  { search: '', categories: [PreferenceEntryCategories.Dashboard] },
  { search: 'Description 1', categories: [] },
  { search: 'an_existing_', categories: [] },
  { search: 'sting', categories: [] },
  { search: '', categories: [PreferenceEntryCategories.Dashboard] },
  { search: 'scription 1', categories: [] },
  {
    search: 'Existing Label 1',
    categories: [PreferenceEntryCategories.Dashboard]
  }
];
