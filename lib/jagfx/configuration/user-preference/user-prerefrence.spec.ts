import {
  expectedUserPreference,
  userPreferenceId,
  userPreferences
} from './user-prerefrence.mock';

import { findUserPreference, updateUserPreference } from './user-preference';

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
    const givenUserPreference = updateUserPreference(
      userPreferenceId,
      'nope',
      userPreferences
    );

    expect(givenUserPreference.id).toStrictEqual(expectedUserPreference.id);
    expect(givenUserPreference.value).toStrictEqual('nope');
  });
});
