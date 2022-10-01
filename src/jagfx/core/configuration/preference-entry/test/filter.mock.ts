import { PreferenceEntryFilters } from '@/jagfx/core/configuration/preference-entry/filter.type';
import { PreferenceEntryInterface } from '@/jagfx/core/configuration/preference-entry/preference-entry.type';

export const existingConfiguration: PreferenceEntryInterface[] = [
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

export const unknownFilters: PreferenceEntryFilters[] = [
  { label: '', target: '' }
];

export const validFilters: PreferenceEntryFilters[] = [
  { label: 'Unicorn label 2' },
  { label: 'unicorn label 2' },
  { label: 'uni', target: 'app' },
  { label: 'uni', target: 'application' }
];
