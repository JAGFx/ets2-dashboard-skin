import {
  expectedUserPreference,
  userPreferenceId,
  userPreferences
} from '@core/configuration/user-preference/user-prerefrence.mock';

import {
  findUserPreference,
  updateUserPreference
} from '@core/configuration/user-preference/user-preference';
import { UserPreference } from '@core/configuration/user-preference/user-preference.type';

describe('Find a user preference', () => {
  it("Throw an exception if the given user preference id doesn't exist", () => {
    expect(() => findUserPreference('not-found', userPreferences)).toThrow();
  });

  it('Return the right user preference matching with the user preference id', () => {
    const givenUserPreference = findUserPreference(
      userPreferenceId,
      userPreferences
    );

    expect(givenUserPreference).toStrictEqual(expectedUserPreference);
  });
});

describe('Update user preference', () => {
  it("Throw an exception if the given user preference id doesn't exist", () => {
    expect(() =>
      updateUserPreference('not-found', 'nope', userPreferences)
    ).toThrow();
  });

  it('Return the right user preference updated matching with the user preference id', () => {
    updateUserPreference(userPreferenceId, 'nope', userPreferences).then(
      (userPreference: UserPreference) => {
        expect(userPreference.id).toStrictEqual(expectedUserPreference.id);
        expect(userPreference.value).toStrictEqual('nope');
      }
    );
  });
});
