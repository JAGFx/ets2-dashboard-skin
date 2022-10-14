import { findUserPreference } from 'ets2-dashboard-lib/jagfx/configuration/user-preference';
import {
  UserPreference,
  UserPreferenceValue
} from 'ets2-dashboard-lib/jagfx/configuration/user-preference.type';
import { reactive } from 'vue';

type UserPreferencesState = {
  preferences: UserPreference[];
};

const state = reactive<UserPreferencesState>({
  preferences: []
});

const getters = {
  getUserPreference: (userPreferenceId: string): UserPreference | null =>
    findUserPreference(state.preferences, userPreferenceId),
  setUserPreference: (
    userPreferenceId: string,
    value: UserPreferenceValue
  ): UserPreference | null => {
    const userPreference: UserPreference | null = findUserPreference(
      state.preferences,
      userPreferenceId
    );

    if (userPreference !== null) {
      // const target = getTargetOfUserPreference(
      //   state.preferences,
      //   userPreferenceId
      // );
      // state.preferences[userPreferenceId] = value;
      userPreference.value = value;
    }

    return userPreference;
  }
};

const actions = {
  load(userPreferences: UserPreference[]) {
    state.preferences.push(...userPreferences);
  }
};

export const useUserPreferences = () => ({
  ...getters,
  ...actions
});
