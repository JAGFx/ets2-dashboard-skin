import { PreferenceEntryFilters } from '@/jagfx/core/configuration/preference-entry/filter.type';
import { PreferenceEntry } from '@/jagfx/core/configuration/preference-entry/preference-entry.type';

export const applyFiltersToPreferenceEntriesList = (
  filters: PreferenceEntryFilters,
  preferenceEntries: PreferenceEntry[]
): PreferenceEntry[] => {
  return preferenceEntries.filter((preferenceEntry: PreferenceEntry) =>
    preferenceEntryMatchWithFilter(preferenceEntry, filters)
  );
};

export const preferenceEntryMatchWithFilter = (
  preferenceEntry: PreferenceEntry,
  filters: PreferenceEntryFilters
): boolean => {
  const filterMatches: boolean[] = [true];

  if (filters.label.length !== 0) {
    filterMatches.push(
      preferenceEntry.label.toLowerCase().includes(filters.label.toLowerCase())
    );
  }

  if (filters.target !== undefined && filters.target.length !== 0) {
    filterMatches.push(
      preferenceEntry.target.includes(filters.target.toLowerCase())
    );
  }

  return filterMatches.every((match: boolean) => match);
};
