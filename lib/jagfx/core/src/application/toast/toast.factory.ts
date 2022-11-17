import { ToastMessage } from '@core/application/toast/toast-message.type';

export const createToastMessage = (message: string): ToastMessage => {
  return new ToastMessage(message);
};
