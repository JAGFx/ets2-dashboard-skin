import { LogLevel, createLine } from 'ets2-dashboard-skin-lib';
import { computed, reactive, readonly } from 'vue';

type LoggerState = {
  logs: string[];
};

const state = reactive<LoggerState>({
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
