import { PreferenceEntry } from '@/jagfx/core/configuration/preference-entry/PreferenceEntry.js';
import map from '@/jagfx/core/configuration/preference-entry/map.json';

export const findPreferenceEntryById = (preferenceEntryId) => {
  const matches = map.filter(
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
