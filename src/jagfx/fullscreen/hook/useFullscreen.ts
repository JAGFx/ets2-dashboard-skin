import { computed, reactive } from 'vue';

// import { useVueInsomnia } from 'vue-insomnia';
import { switchFullscreen } from '@/jagfx/fullscreen/fullscreen';

// Find alternatvie

// const { enableVueInsomnia, disableVueInsomnia } = useVueInsomnia();

type FullscreenStateType = {
  fullscreen: boolean;
};

const state = reactive<FullscreenStateType>({
  fullscreen: false
});

const getters = {
  fullscreenIsEnabled: computed<boolean>(() => state.fullscreen)
};

const actions = {
  switchFullscreen: (): void => {
    try {
      switchFullscreen(state.fullscreen);
    } catch (e) {
      if (state.fullscreen) {
        // enableVueInsomnia();
      } else {
        // disableVueInsomnia();
      }
    } finally {
      state.fullscreen = !state.fullscreen;
    }
  }
};

export const useFullscreen = () => ({
  // state: readonly(state),
  ...getters,
  ...actions
});
