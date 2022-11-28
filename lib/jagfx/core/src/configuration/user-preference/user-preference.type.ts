export type UserPreferenceId = string;
export const enum UserPreferenceTarget {
  Application = 'application',
  Game = 'game'
}

export type UserPreferenceValue = string | boolean | number | null;

export type UserPreference = {
  id: UserPreferenceId;
  value: UserPreferenceValue;
};

export class UserPreferenceCollection extends Map<
  UserPreferenceId,
  UserPreference
> {
  static fromArray(
    userPreferences: UserPreference[]
  ): UserPreferenceCollection {
    const collection = new this();

    userPreferences.map((userPreference: UserPreference) =>
      collection.set(userPreference.id, userPreference)
    );

    return collection;
  }
  
  public toJson(): UserPreference[] {
    return Array.from(this.values());
  }
}
