import { switchFullscreen } from '@/domain/fullscreen.js';
import { computed, reactive, readonly } from 'vue';

const state = reactive({
  fullscreen: false
});

const getters = {
  fullscreenIsEnabled: computed(() => state.fullscreen)
};

const actions = {
  switchFullscreen: () => {
    try {
      switchFullscreen(state.fullscreen);
      state.fullscreen = !state.fullscreen;
    } catch (e) {
      if (state.fullscreen) {
        // Todo: Disable vueInsomnia
      } else {
        // Todo: Enable vueInsomnia
      }
    }
  }
};

export const useFullscreen = () => ({
  state: readonly(state),
  ...getters,
  ...actions
});
