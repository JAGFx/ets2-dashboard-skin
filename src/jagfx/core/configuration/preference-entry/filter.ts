export const applyFiltersToPreferenceEntriesList = (filters, list) => {
  return list.filter((preferenceEntry) =>
    preferenceEntryMatchWithFilter(preferenceEntry, filters)
  );
};

export const preferenceEntryMatchWithFilter = (preferenceEntry, filters) => {
  const filterMatches = [true];

  if (typeof filters !== 'object' || filters === null) return true;

  if (Object.hasOwn(filters, 'label') && filters.label.length !== 0) {
    filterMatches.push(
      preferenceEntry.label.toLowerCase().includes(filters.label.toLowerCase())
    );
  }

  if (Object.hasOwn(filters, 'target') && filters.target.length !== 0) {
    filterMatches.push(
      preferenceEntry.target.includes(filters.target.toLowerCase())
    );
  }

  return filterMatches.every((match) => match);
};
