import { computed, reactive, readonly } from 'vue';

import { createLine } from '@/jagfx/core/application/logger';
import { LogLevel } from '@/jagfx/core/application/logger.type';

type LoggerState = {
  logs: string[];
};

const state: LoggerState = reactive({
  logs: []
});

const getters = {
  logs: computed<string[]>(() => state.logs)
};

const actions = {
  pushLog: (
    message: string,
    zone: string,
    level: LogLevel = LogLevel.INFO
  ): void => {
    state.logs.push(createLine(message, zone, level));
  }
};

export const useLogger = () => ({
  state: readonly(state),
  ...getters,
  ...actions
});
