export const enum UserPreferenceTarget {
  Application = 'application',
  Game = 'game'
}

export type UserPreferenceValue = string | boolean | number;

export type UserPreference = {
  id: string;
  target: UserPreferenceTarget;
  value: UserPreferenceValue;
};
