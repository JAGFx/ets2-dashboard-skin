import { DateTime } from 'luxon';
import { computed, reactive, readonly } from 'vue';

export const LOG_LEVEL = {
  DEBUG: 'DEBUG',
  INFO: 'INFO',
  WARNING: 'WARNING',
  ERROR: 'ERROR',
  CRITICAL: 'CRITICAL'
};

const state = reactive({
  logs: []
});

const getters = {
  logs: computed(() => state.logs)
};

const actions = {
  pushLog: (message, zone, level = LOG_LEVEL.INFO) => {
    const date = DateTime.now();
    const line = `[ ${date.toString()} ][ ${level} ][ ${zone} ] ${message}`;

    state.logs.push(line);
  }
};

export const useLogger = () => ({
  state: readonly(state),
  ...getters,
  ...actions
});
