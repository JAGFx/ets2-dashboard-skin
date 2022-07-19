import CompleteNavbar from '@/application/components/navbar/CompleteNavbar.vue';
import DiscreteNavbar from '@/application/components/navbar/DiscreteNavbar.vue';
import { computed, reactive, readonly } from 'vue';

const state = reactive({
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
