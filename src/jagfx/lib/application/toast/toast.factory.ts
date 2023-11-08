import { ToastMessage } from './toast-message.type';

export const createToastMessage = (message: string): ToastMessage => {
  return new ToastMessage(message);
};
