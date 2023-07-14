import {
  UserPreference,
  UserPreferenceCollection,
  UserPreferenceId,
  UserPreferenceValue,
  findUserPreference,
  validateUserPreferenceFileUploaded
} from 'ets2-dashboard-skin-lib';
import userPreferenceDev from 'ets2-dashboard-skin-lib/src/configuration/user-preference/user-preference.dev.json';

import { useApplicationState } from '@/jagfx/shared/hook/useApplicationState';

export const updateUserPreference = (
  id: UserPreferenceId,
  value: UserPreferenceValue,
  userPreferences: UserPreferenceCollection
): Promise<UserPreference> => {
  const existing = findUserPreference(id, userPreferences);
  const { useFakeData } = useApplicationState();

  existing.value = value;

  if (useFakeData) {
    return new Promise<UserPreference>((resolve) => {
      setTimeout(() => {
        resolve(existing);
      }, 1000);
    });
  }

  return new Promise<UserPreference>((resolve) => {
    // TODO: Make an api call.
    resolve(existing);
  });
};

export const getUserPreferences = (useFakeData = false) => {
  if (useFakeData) {
    return new Promise<UserPreferenceCollection>((resolve) => {
      resolve(UserPreferenceCollection.fromArray(userPreferenceDev));
    });
  }

  return new Promise<UserPreferenceCollection>((resolve) => {
    // TODO: Make an api call.
    resolve(UserPreferenceCollection.fromArray([]));
  });
};

export const uploadUserPreferenceFile = (
  file: File,
  useFakeData = false
): Promise<UserPreferenceCollection> => {
  if (useFakeData) {
    return new Promise<UserPreferenceCollection>((resolve) => {
      setTimeout(() => {
        validateUserPreferenceFileUploaded(file);

        resolve(UserPreferenceCollection.fromArray(userPreferenceDev));
      }, 1000);
    });
  }

  return new Promise<UserPreferenceCollection>((resolve) => {
    // TODO: Make an api call.
    resolve(new UserPreferenceCollection());
  });
};
