import list from './list.json';
import { PreferenceEntry } from './preference-entry.type';

export const findPreferenceEntryById = (
  preferenceEntryId: string
): PreferenceEntry => {
  const matches: PreferenceEntry[] = list.filter(
    (preferenceEntry: PreferenceEntry) =>
      preferenceEntry.id === preferenceEntryId
  );

  const preferenceEntry: PreferenceEntry = matches.at(0) as PreferenceEntry;

  if (matches.length !== 1)
    throw new Error(
      `Unable to find ${preferenceEntryId} on preference entries list`
    );

  return preferenceEntry;
};

export const convertJsonObjectToPreferenceEntry = (
  json: object
): PreferenceEntry => Object.assign(new PreferenceEntry(), json);
