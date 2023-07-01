import {
  ToastMessage,
  UserPreferenceCollection,
  createToastMessage,
  getUserPreferences
} from 'ets2-dashboard-skin-lib';

import { useToast } from '@/jagfx/components/shared/toast/useToast';
import { useUserPreference } from '@/jagfx/components/shared/useUserPreference';
import { useApplicationState } from '@/jagfx/components/useApplicationState';

const { useFakeData } = useApplicationState();
const { load } = useUserPreference();
export const loadUserPreferences = () => {
  return getUserPreferences(useFakeData).then(
    (userPreferences: UserPreferenceCollection) => {
      const toast: ToastMessage = createToastMessage(
        'User preferences successfully loaded'
      );
      const { pushToast } = useToast();
      pushToast(toast);
      load(userPreferences);
      return userPreferences;
    }
  );
};
