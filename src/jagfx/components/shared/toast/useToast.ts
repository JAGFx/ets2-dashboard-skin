import {
  Toast,
  ToastState
} from 'ets2-dashboard-lib/jagfx/application/toast/toast.type.js';
import { computed, reactive } from 'vue';

const state = reactive<ToastState>({
  queue: new Map<number, Toast>()
});

const getters = {
  toasts: computed<Map<number, Toast>>(() => state.queue)
};

const actions = {
  pushToast: (toast: Toast): void => {
    state.queue.set(toast.timestamp, toast);

    setTimeout(() => state.queue.delete(toast.timestamp), toast.delay);
  }
};

export const useToast = () => ({
  ...getters,
  ...actions
});
