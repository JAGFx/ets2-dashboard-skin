import { PreferenceEntry, PreferenceEntryValue } from './preference-entry.type';

export const loadPreferenceEntryValues = (
  preferenceEntry: PreferenceEntry | null
): PreferenceEntryValue[] | null => preferenceEntry?.values ?? null;
