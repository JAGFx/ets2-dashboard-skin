import { PreferenceEntry } from '@/jagfx/core/configuration/preference-entry/PreferenceEntry';
import list from '@/jagfx/core/configuration/preference-entry/list.json';

export const findPreferenceEntryById = (preferenceEntryId) => {
  const matches = list.filter(
    (preferenceEntry) => preferenceEntry.id === preferenceEntryId
  );

  if (matches.length !== 1)
    throw new Error(
      `Unable to find ${preferenceEntryId} on preference entries list`
    );

  return matches.at(0);
};

export const convertJsonObjectToPreferenceEntry = (json) =>
  Object.assign(new PreferenceEntry(), json);
