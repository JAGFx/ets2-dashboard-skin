export const enum UserPreferenceTarget {
  Application = 'application',
  Game = 'game'
}

export type UserPreference = {
  id: string;
  target: UserPreferenceTarget;
  value: string | boolean | number;
};
