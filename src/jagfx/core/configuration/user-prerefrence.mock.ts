import {
  UserPreference,
  UserPreferenceTarget
} from '@/jagfx/core/configuration/user-preference.type';

export const userPreferenceId = 'preference1';
export const nonExistingUserPreferenceId = 'unicorn';
export const expectedUserPreference: UserPreference = {
  id: userPreferenceId,
  target: UserPreferenceTarget.Application,
  value: 'preference1'
};
export const userPreferences: UserPreference[] = [
  {
    id: 'preference3',
    target: UserPreferenceTarget.Game,
    value: 'stuff'
  },
  expectedUserPreference,
  {
    id: 'preference2',
    target: UserPreferenceTarget.Game,
    value: 'otherStuff'
  }
];
