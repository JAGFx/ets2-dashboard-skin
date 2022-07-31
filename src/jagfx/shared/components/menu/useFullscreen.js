import { switchFullscreen } from '@/jagfx/shared/core/fullscreen.js';
import { useVueInsomnia } from 'vue-insomnia';
import { computed, reactive, readonly } from 'vue';

const { enableVueInsomnia, disableVueInsomnia } = useVueInsomnia();

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
    } catch (e) {
      if (state.fullscreen) {
        enableVueInsomnia();
      } else {
        disableVueInsomnia();
      }
    } finally {
      state.fullscreen = !state.fullscreen;
    }
  }
};

export const useFullscreen = () => ({
  state: readonly(state),
  ...getters,
  ...actions
});
