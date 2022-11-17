import { reactive } from 'vue';

import { createToastMessage } from 'ets2-dashboard-core/src/application/toast/toast.factory.js';
import {
  findUserPreference,
  updateUserPreference
} from 'ets2-dashboard-core/src/configuration/user-preference/user-preference';
import {
  UserPreference,
  UserPreferenceCollection,
  UserPreferenceId,
  UserPreferenceValue
} from 'ets2-dashboard-core/src/configuration/user-preference/user-preference.type';

import { useToast } from '@/jagfx/components/shared/toast/useToast';
import { useApplicationState } from '@/jagfx/components/useApplicationState';

type UseUserPreferenceState = {
  preferences: UserPreferenceCollection;
};

const { useFakeData } = useApplicationState();
const { pushToast } = useToast();

const state = reactive<UseUserPreferenceState>({
  preferences: new UserPreferenceCollection()
});

const getters = {
  find: (id: UserPreferenceId): UserPreference =>
    findUserPreference(id, state.preferences)
};

const actions = {
  update: (id: UserPreferenceId, value: UserPreferenceValue) => {
    updateUserPreference(id, value, state.preferences, useFakeData).then(
      (userPreference: UserPreference) => {
        const toast = createToastMessage(
          'User preference successfully updated'
        );
        pushToast(toast);

        state.preferences.set(id, userPreference);
      }
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
