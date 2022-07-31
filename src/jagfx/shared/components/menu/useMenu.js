import CompleteNavbar from '@/jagfx/shared/components/navbar/CompleteNavbar.vue';
import DiscreteNavbar from '@/jagfx/shared/components/navbar/DiscreteNavbar.vue';
import { computed, readonly, shallowReactive } from 'vue';

const state = shallowReactive({
  showMenu: false,
  mode: CompleteNavbar
});

const getters = {
  menuIsShown: computed(() => state.showMenu),
  mode: computed(() => state.mode)
};

const actions = {
  toggleMenuShow: () => (state.showMenu = !state.showMenu),
  switchToCompleteMode: () => (state.mode = CompleteNavbar),
  switchToDiscreteMode: () => (state.mode = DiscreteNavbar)
};

export const useMenu = () => ({
  state: readonly(state),
  ...getters,
  ...actions
});
