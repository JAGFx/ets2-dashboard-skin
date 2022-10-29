import {
  findUserPreference,
  updateUserPreference
} from 'ets2-dashboard-lib/jagfx/configuration/user-preference/user-preference';
import {
  UserPreference,
  UserPreferenceCollection,
  UserPreferenceId,
  UserPreferenceValue
} from 'ets2-dashboard-lib/jagfx/configuration/user-preference/user-preference.type';
import { reactive } from 'vue';

type UseUserPreferenceState = {
  preferences: UserPreferenceCollection;
};

const state = reactive<UseUserPreferenceState>({
  preferences: new UserPreferenceCollection()
});

const getters = {
  find: (id: UserPreferenceId): UserPreference =>
    findUserPreference(id, state.preferences)
};

const actions = {
  update: (id: UserPreferenceId, value: UserPreferenceValue) => {
    state.preferences.set(
      id,
      updateUserPreference(id, value, state.preferences)
    );
  },
  load: (userPreferences: UserPreferenceCollection) => {
    state.preferences = new UserPreferenceCollection(userPreferences);
  }
};

export const useUserPreference = () => ({
  ...getters,
  ...actions
});
