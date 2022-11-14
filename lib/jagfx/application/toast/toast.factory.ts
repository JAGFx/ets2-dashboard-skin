import { ToastMessage } from './toast-message.type.js';

export const createToastMessage = (message: string): ToastMessage => {
  return new ToastMessage(message);
};
