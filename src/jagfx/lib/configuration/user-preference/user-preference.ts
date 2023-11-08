import {
  UserPreference,
  UserPreferenceCollection,
  UserPreferenceId
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

export const validateUserPreferenceFileUploaded = (file: File): void => {
  if (file.type !== 'application/json') {
    throw 'Invalid file type';
  }
};
