import userPreferenceDev from './user-preference.dev.json';
import { UserPreferenceCollection } from './user-preference.type';

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
