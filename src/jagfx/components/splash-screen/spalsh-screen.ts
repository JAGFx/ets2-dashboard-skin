import { getUserPreferences } from 'ets2-dashboard-lib/jagfx/configuration/user-preference/loader';
import { UserPreferenceCollection } from 'ets2-dashboard-lib/jagfx/configuration/user-preference/user-preference.type';

import { createToastMessage } from '@/jagfx/components/shared/toast/toast.factory';
import { ToastMessage } from '@/jagfx/components/shared/toast/toast.type';
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
