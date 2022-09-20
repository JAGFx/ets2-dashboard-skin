import { arrayEqual } from '@/jagfx/core/application/array';
import { objectKeyValueOrNull } from '@/jagfx/core/application/object';

export const validateUserPreferenceState = (state, errorMessage) => {
  if (!arrayEqual(Object.keys(state), ['application', 'game'])) {
    throw new Error(errorMessage);
  }
};

export const findUserPreference = (state, userPreferenceKey) => {
  validateUserPreferenceState(
    state,
    'The given state was not valid to find a user preference'
  );

  let userPreference = null;

  Object.keys(state).forEach((stateKey) => {
    if (userPreference === null) {
      userPreference = objectKeyValueOrNull(userPreferenceKey, state[stateKey]);
    }
  });

  return userPreference;
};

export const getTargetOfUserPreference = (state, userPreferenceKey) => {
  validateUserPreferenceState(
    state,
    'The given state was not valid to find target of user preference'
  );

  let target = null;
  let userPreference = null;

  Object.keys(state).forEach((stateKey) => {
    if (userPreference === null) {
      userPreference = objectKeyValueOrNull(userPreferenceKey, state[stateKey]);
      target = userPreference === null ? null : stateKey;
    }
  });

  return target;
};
