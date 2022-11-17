import {
  UserPreference,
  UserPreferenceCollection
} from '@core/configuration/user-preference/user-preference.type';

export const userPreferenceId = 'preference1';
export const expectedUserPreference: UserPreference = {
  id: userPreferenceId,
  value: 'preference1'
};
export const userPreferences: UserPreferenceCollection =
  new UserPreferenceCollection([[userPreferenceId, expectedUserPreference]]);
