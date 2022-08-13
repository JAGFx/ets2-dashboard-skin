import { PreferenceEntry } from "@/jagfx/module/user-preferences/core/PreferenceEntry.js";
import map from "@/jagfx/module/user-preferences/core/map.json";

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
  return list.filter((preferenceEntry) =>
    preferenceEntryMatchWithFilter(preferenceEntry, filters)
  );
};

export const preferenceEntryMatchWithFilter = (preferenceEntry, filters) => {
  const filterMatches = [true];

  if (typeof filters !== "object" || filters === null) return true;

  if (Object.hasOwn(filters, "label") && filters.label.length !== 0) {
    filterMatches.push(
      preferenceEntry.label.toLowerCase().includes(filters.label.toLowerCase())
    );
  }

  if (Object.hasOwn(filters, "target") && filters.target.length !== 0) {
    filterMatches.push(
      preferenceEntry.target.includes(filters.target.toLowerCase())
    );
  }

  return filterMatches.every((match) => match);
};

export const convertJsonObjectToPreferenceEntry = (json) =>
  Object.assign(new PreferenceEntry(), json);
