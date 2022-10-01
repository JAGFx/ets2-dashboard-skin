import {
  expectedUserPreference,
  nonExistingUserPreferenceId,
  userPreferenceId,
  userPreferences
} from '@/jagfx/core/configuration/user-prerefrence.mock';

import {
  findUserPreference,
  getTargetOfUserPreference
} from '@/jagfx/core/configuration/user-preference';
import { UserPreference } from '@/jagfx/core/configuration/user-preference.type';

describe('User preference finder', () => {
  it('Existing user preference ID must return associated value', () => {
    expect(findUserPreference(userPreferences, userPreferenceId)).toStrictEqual(
      expectedUserPreference
    );
  });

  it('Non existing user preference ID must return null', () => {
    expect(
      findUserPreference(userPreferences, nonExistingUserPreferenceId)
    ).toBeNull();
  });
});

describe('User preference target', () => {
  it.each(userPreferences)(
    'Get target of existing user preference return the associated one',
    (userPreference: UserPreference) => {
      expect(
        getTargetOfUserPreference(userPreferences, userPreference.id)
      ).toStrictEqual(userPreference.target);
    }
  );

  it('An non existing user preference must return null target', () => {
    expect(
      getTargetOfUserPreference(userPreferences, nonExistingUserPreferenceId)
    ).toBeNull();
  });
});
