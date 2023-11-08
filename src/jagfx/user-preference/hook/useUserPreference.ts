import { reactive } from 'vue';

import {
  ToastMessage,
  UserPreference,
  UserPreferenceCollection,
  UserPreferenceId,
  UserPreferenceValue,
  createToastMessage,
  findUserPreference
} from '@/jagfx/lib';
import { useApplicationState } from '@/jagfx/shared/hook/useApplicationState';
import { useToast } from '@/jagfx/ui/toast/hook/useToast';
import {
  getUserPreferences,
  updateUserPreference,
  uploadUserPreferenceFile
} from '@/jagfx/user-preference/user-preference.manager';

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
    findUserPreference(id, state.preferences),
  hasUserPreferenceLoaded: () => state.preferences.size > 0,
  preferences: state.preferences
};

const actions = {
  update: (id: UserPreferenceId, value: UserPreferenceValue) => {
    updateUserPreference(id, value, state.preferences).then(
      (userPreference: UserPreference) => {
        state.preferences.set(id, userPreference);

        const toast = createToastMessage(
          'User preference successfully updated'
        );
        pushToast(toast);
      }
    );
  },
  load: (): Promise<UserPreferenceCollection> => {
    return getUserPreferences(useFakeData).then(
      (userPreferences: UserPreferenceCollection) => {
        const toast: ToastMessage = createToastMessage(
          'User preferences successfully loaded'
        );
        pushToast(toast);
        state.preferences = userPreferences;

        return state.preferences;
      }
    );
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
