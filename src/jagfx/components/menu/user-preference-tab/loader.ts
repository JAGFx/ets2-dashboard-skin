import { UserPreferenceCollection } from 'ets2-dashboard-lib/jagfx/configuration/user-preference/user-preference.type';

import userPreferenceDev from '@/jagfx/components/menu/user-preference-tab/user-preference.dev.json';
import { createToastMessage } from '@/jagfx/components/shared/toast/toast.factory';
import { ToastMessage } from '@/jagfx/components/shared/toast/toast.type';
import { useToast } from '@/jagfx/components/shared/toast/useToast';
import { useApplicationState } from '@/jagfx/components/useApplicationState';

const { useFakeData } = useApplicationState();
export const getUserPreferences = (): Promise<UserPreferenceCollection> => {
  if (useFakeData) {
    return new Promise<UserPreferenceCollection>((resolve) => {
      resolve(UserPreferenceCollection.fromArray(userPreferenceDev));
      pushSuccessfulUserPreferenceLoadToast();
    });
  }

  // TODO use useFetch to call server
  return new Promise<UserPreferenceCollection>((resolve) => {
    resolve(UserPreferenceCollection.fromArray([]));
    pushSuccessfulUserPreferenceLoadToast();
  });
};

const pushSuccessfulUserPreferenceLoadToast = () => {
  const toast: ToastMessage = createToastMessage(
    'User preferences successfully loaded'
  );
  const { pushToast } = useToast();

  pushToast(toast);
};
