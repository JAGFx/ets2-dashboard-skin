import { reactive } from 'vue';

import {
  findUserPreference,
  getTargetOfUserPreference
} from '@/jagfx/core/configuration/user-preference';

const state = reactive({
  application: {
    general_refresh_rate: 500
  },
  game: {}
});

const getters = {
  getUserPreference: (identifier) => findUserPreference(state, identifier),
  setUserPreference: (identifier, value) => {
    if (findUserPreference(state, identifier) !== null) {
      const target = getTargetOfUserPreference(state, identifier);
      state[target][identifier] = value;
    }
  }
};

const actions = {
  load(target, userPreferences) {
    state[target] = userPreferences;
  }
};

export const useUserPreferences = () => ({
  ...getters,
  ...actions
});
