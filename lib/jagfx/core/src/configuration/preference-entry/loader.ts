import {
  PreferenceEntry,
  PreferenceEntryValue
} from '@core/configuration/preference-entry/preference-entry.type';

export const loadPreferenceEntryValues = (
  preferenceEntry: PreferenceEntry | null
): PreferenceEntryValue[] | null => preferenceEntry?.values ?? null;
