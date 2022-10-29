export type UserPreferenceId = string;

export const enum UserPreferenceTarget {
  Application = 'application',
  Game = 'game'
}

export type UserPreferenceValue = string | boolean | number;

export type UserPreference = {
  id: UserPreferenceId;
  target: UserPreferenceTarget;
  value: UserPreferenceValue;
};

export class UserPreferenceCollection extends Map<
  UserPreferenceId,
  UserPreference
> {}
