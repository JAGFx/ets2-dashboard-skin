import {
  findUserPreference,
  getTargetOfUserPreference
} from '@/jagfx/core/configuration/user-preference';

const targetUserPreferenceKey = 'something';
const userPreference = 'preference1';
const userPreferenceState = {
  application: {
    preference1: targetUserPreferenceKey
  },
  game: {
    preference1: 'stuff',
    preference2: 'otherStuff'
  }
};

describe('User preference state', () => {
  const unknownUserPreferenceStates = [
    [],
    {},
    '',
    'string',
    123,
    undefined,
    null,
    new Error(),
    { label: '' },
    { target: '' },
    { label: '', target: '' },
    { application: '' },
    { game: '' }
  ];

  it.each(unknownUserPreferenceStates)(
    'Invalid user preference state must throw an error',
    (userPreference) => {
      expect(() => findUserPreference(userPreference, null)).toThrow();
    }
  );
});

describe('User preference finder', () => {
  it('Existing user preference key must return associated value', () => {
    expect(
      findUserPreference(userPreferenceState, userPreference)
    ).toStrictEqual(targetUserPreferenceKey);
  });

  it('Non existing user preference key must return null', () => {
    expect(findUserPreference(userPreferenceState, 'otherStuff')).toBeNull();
  });
});

describe('User preference target', () => {
  const preferences = [
    { target: 'application', preference: userPreference },
    { target: 'game', preference: 'preference2' }
  ];

  it.each(preferences)(
    'Get target of existing user preference return the associated one',
    (preference) => {
      expect(
        getTargetOfUserPreference(userPreferenceState, preference.preference)
      ).toStrictEqual(preference.target);
    }
  );

  it('An non existing user preference must return null target', () => {
    expect(
      getTargetOfUserPreference(userPreferenceState, 'otherStuff')
    ).toBeNull();
  });
});
