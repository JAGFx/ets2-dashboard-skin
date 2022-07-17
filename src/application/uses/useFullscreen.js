import { switchFullscreen } from '@/domain/fullscreen.js';
import { computed, reactive, readonly } from 'vue';

const state = reactive({
  fullscreen: false
});

const getters = {
  fullscreen: computed(() => state.fullscreen)
};

const actions = {
  switchFullscreen: () => {
    state.fullscreen = !state.fullscreen;
    switchFullscreen(state.fullscreen);
  }
};

export const useFullscreen = () => ({
  state: readonly(state),
  ...getters,
  ...actions
});
