export const loadPreferenceEntryValues = (preferenceEntry) => {
  if (
    Array.isArray(preferenceEntry) ||
    preferenceEntry === null ||
    typeof preferenceEntry !== 'object' ||
    !Array.isArray(preferenceEntry.values) ||
    !Object.hasOwnProperty.call(preferenceEntry, 'values') ||
    preferenceEntry.values === null
  ) {
    return null;
  }

  if (
    Array.isArray(preferenceEntry.values) &&
    preferenceEntry.values.length > 0
  ) {
    return preferenceEntry.values;
  }

  if (
    Array.isArray(preferenceEntry.values) &&
    preferenceEntry.values.length === 0
  ) {
    // TODO Return loaded value
    return [];
  }

  return null;
};

// TODO Add test for it + tast to check all entry on map.json file
