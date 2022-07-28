import map from '@/domain/user-preferences/map.json';
import { PreferenceEntry } from '@/domain/user-preferences/PreferenceEntry.js';

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

export const applyFiltersToPreferenceEntriesList = (filters, list) => {
  return list.filter((preferenceEntry) => {
    const filterMatches = [true];

    if (Object.hasOwn(filters, 'label') && filters.label.length !== 0) {
      filterMatches.push(
        preferenceEntry.label
          .toLowerCase()
          .includes(filters.label.toLowerCase())
      );
    }

    if (Object.hasOwn(filters, 'target') && filters.target.length !== 0) {
      filterMatches.push(
        preferenceEntry.target.includes(filters.target.toLowerCase())
      );
    }

    return filterMatches.every((match) => match);
  });
};

export const convertJsonObjectToPreferenceEntry = (json) =>
  Object.assign(new PreferenceEntry(), json);
