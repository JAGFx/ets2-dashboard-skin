import {
  UserPreference,
  UserPreferenceCollection,
  UserPreferenceTarget
} from './user-preference.type';

export const userPreferenceId = 'preference1';
export const expectedUserPreference: UserPreference = {
  id: userPreferenceId,
  target: UserPreferenceTarget.Application,
  value: 'preference1'
};
export const userPreferences: UserPreferenceCollection =
  new UserPreferenceCollection([[userPreferenceId, expectedUserPreference]]);
