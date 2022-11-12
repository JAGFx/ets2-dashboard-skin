import userPreferenceDev from './user-preference.dev.json';
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
  userPreferences: UserPreferenceCollection,
  useFakeData = false
): Promise<UserPreference> => {
  const existing = findUserPreference(id, userPreferences);

  existing.value = value;

  if (useFakeData) {
    return new Promise<UserPreference>((resolve) => {
      setTimeout(() => {
        resolve(existing);
      }, 1000);
    });
  }

  // TODO use useFetch to call server
  return new Promise<UserPreference>((resolve) => {
    resolve(existing);
  });
};

export const getUserPreferences = (useFakeData = false) => {
  if (useFakeData) {
    return new Promise<UserPreferenceCollection>((resolve) => {
      resolve(UserPreferenceCollection.fromArray(userPreferenceDev));
    });
  }

  // TODO use useFetch to call server
  return new Promise<UserPreferenceCollection>((resolve) => {
    resolve(UserPreferenceCollection.fromArray([]));
  });
};
