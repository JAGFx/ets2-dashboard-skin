import {
  PreferenceEntry,
  PreferenceEntryValue
} from '@/jagfx/core/configuration/preference-entry/preference-entry.type';

export const loadPreferenceEntryValues = (
  preferenceEntry: PreferenceEntry | null
): PreferenceEntryValue[] | null => preferenceEntry?.values ?? null;
