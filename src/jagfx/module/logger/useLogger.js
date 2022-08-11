import { computed, reactive, readonly } from 'vue';

import { LOG_LEVEL, createLine } from '@/jagfx/module/logger/core/logger.js';

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
