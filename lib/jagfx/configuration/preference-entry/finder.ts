import list from './list.json';
import {
  PreferenceEntry,
  PreferenceEntryCollection,
  PreferenceEntryId
} from './preference-entry.type';

const jsonAsPreferenceEntryCollection = (): PreferenceEntryCollection => {
  const collection = new PreferenceEntryCollection();

  list.map((preferenceEntry: PreferenceEntry) =>
    collection.set(preferenceEntry.id, preferenceEntry)
  );

  return collection;
};

const preferenceEntryCollection = jsonAsPreferenceEntryCollection();

export const findPreferenceEntryById = (
  preferenceEntryId: PreferenceEntryId
): PreferenceEntry => {
  if (!preferenceEntryCollection.has(preferenceEntryId))
    throw new Error(
      `Unable to find ${preferenceEntryId} on preference entries list`
    );

  return preferenceEntryCollection.get(preferenceEntryId) as PreferenceEntry;
};
