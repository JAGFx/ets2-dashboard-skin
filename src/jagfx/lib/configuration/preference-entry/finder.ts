import {
  PreferenceEntry,
  PreferenceEntryCollection,
  PreferenceEntryId
} from './preference-entry.type';

export const findPreferenceEntryById = (
  preferenceEntryId: PreferenceEntryId,
  preferenceEntriesCollection: PreferenceEntryCollection
): PreferenceEntry => {
  if (!preferenceEntriesCollection.has(preferenceEntryId))
    throw new Error(
      `Unable to find ${preferenceEntryId} on preference entries list`
    );

  return preferenceEntriesCollection.get(preferenceEntryId) as PreferenceEntry;
};
