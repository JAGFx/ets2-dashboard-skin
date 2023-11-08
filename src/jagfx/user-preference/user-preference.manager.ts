import {
  UserPreference,
  UserPreferenceCollection,
  UserPreferenceId,
  UserPreferenceValue,
  findUserPreference,
  userPreferencesRoutes,
  validateUserPreferenceFileUploaded
} from '@/jagfx/lib';
import userPreferenceDev from '@/jagfx/lib/configuration/user-preference/user-preference.dev.json';
import { call } from '@/jagfx/shared/fetch';
import { useApplicationState } from '@/jagfx/shared/hook/useApplicationState';

export const getUserPreferences = (useFakeData = false) => {
  if (useFakeData) {
    return new Promise<UserPreferenceCollection>((resolve) => {
      setTimeout(
        () => resolve(UserPreferenceCollection.fromArray(userPreferenceDev)),
        1000
      );
    });
  }

  return new Promise<UserPreferenceCollection>((resolve) => {
    call(userPreferencesRoutes.list)
      .then((data) => UserPreferenceCollection.fromArray(data.value))
      .then((userPreferences) => resolve(userPreferences));
  });
};

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

// TODO: Continue here
