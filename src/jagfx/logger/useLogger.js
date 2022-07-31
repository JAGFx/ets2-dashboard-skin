import { createLine, LOG_LEVEL } from '@/jagfx/logger/core/logger.js';
import { computed, reactive, readonly } from 'vue';

const state = reactive({
  logs: []
});

const getters = {
  logs: computed(() => state.logs)
};

const actions = {
  pushLog: (message, zone, level = LOG_LEVEL.INFO) => {
    state.logs.push(createLine(message, zone, level));
  }
};

export const useLogger = () => ({
  state: readonly(state),
  ...getters,
  ...actions
});
