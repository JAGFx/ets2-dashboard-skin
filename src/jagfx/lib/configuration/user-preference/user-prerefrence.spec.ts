import {
  expectedUserPreference,
  userPreferenceId,
  userPreferences
} from './user-prerefrence.mock';

import { findUserPreference } from './user-preference';

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
