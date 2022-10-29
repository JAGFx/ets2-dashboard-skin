import { ToastMessage } from '@/jagfx/components/shared/toast/toast.type';

export const createToastMessage = (message: string): ToastMessage => {
  return new ToastMessage(message);
};
