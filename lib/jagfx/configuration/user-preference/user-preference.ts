import {
  UserPreference,
  UserPreferenceCollection,
  UserPreferenceId,
  UserPreferenceValue
} from './user-preference.type';

export const findUserPreference = (
  id: UserPreferenceId,
  userPreferences: UserPreferenceCollection
): UserPreference => {
  if (!userPreferences.has(id)) {
    throw new Error(
      `Unable to find the given "${id}" user preference: Not found`
    );
  }

  return userPreferences.get(id) as UserPreference;
};

export const updateUserPreference = (
  id: UserPreferenceId,
  value: UserPreferenceValue,
  userPreferences: UserPreferenceCollection
): UserPreference => {
  const existing = findUserPreference(id, userPreferences);

  existing.value = value;

  return existing;
};
