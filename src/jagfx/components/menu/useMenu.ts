import { Component, computed, shallowReactive } from 'vue';

import CompleteNavbar from '@/jagfx/components/navbar/CompleteNavbar.vue';
import DiscreteNavbar from '@/jagfx/components/navbar/DiscreteNavbar.vue';

type MenuState = {
  showMenu: boolean;
  mode: Component;
};

const state = shallowReactive<MenuState>({
  showMenu: false,
  mode: CompleteNavbar
});

const getters = {
  menuIsShown: computed<boolean>(() => state.showMenu),
  mode: computed<Component>(() => state.mode)
};

const actions = {
  toggleMenuShow: (): boolean => (state.showMenu = !state.showMenu),
  switchToCompleteMode: (): void => (state.mode = CompleteNavbar),
  switchToDiscreteMode: (): void => (state.mode = DiscreteNavbar)
};

export const useMenu = () => ({
  // state: readonly( state ),
  ...getters,
  ...actions
});
