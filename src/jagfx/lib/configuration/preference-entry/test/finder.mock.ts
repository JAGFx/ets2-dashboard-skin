import {
  PreferenceEntry,
  PreferenceEntryCategories
} from '../preference-entry.type';

export const existingConfigurationId = 'general_port';
export const expectedPreferenceEntry: PreferenceEntry = new PreferenceEntry(
  'general_port',
  [PreferenceEntryCategories.General],
  'Port',
  'Port used by the server',
  null
);

export const unknownPreferenceEntryId = 'an_unknown_preference_entry_id';
