import {
  UserPreference,
  UserPreferenceCollection,
  UserPreferenceId,
  UserPreferenceValue,
  createToastMessage,
  findUserPreference,
  updateUserPreference,
  uploadUserPreferenceFile
} from 'ets2-dashboard-skin-lib';
import { reactive } from 'vue';

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
        state.preferences.set(id, userPreference);

        const toast = createToastMessage(
          'User preference successfully updated'
        );
        pushToast(toast);
      }
    );
  },
  load: (userPreferences: UserPreferenceCollection) => {
    state.preferences = new UserPreferenceCollection(userPreferences);
  },
  upload: (fileList: FileList): Promise<void> => {
    if (fileList.item(0) === null) {
      return new Promise((resolve) => resolve());
    }

    const file: File = fileList.item(0) as File;

    return uploadUserPreferenceFile(file, useFakeData).then(
      (userPreferences: UserPreferenceCollection) => {
        state.preferences = userPreferences;

        const toast = createToastMessage(
          'User preference successfully updated'
        );
        pushToast(toast);
      }
    );
  }
};

export const useUserPreference = () => ({
  ...getters,
  ...actions
});
