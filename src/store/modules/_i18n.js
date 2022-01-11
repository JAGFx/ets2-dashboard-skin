/**
 * @author:	Emmanuel SMITH <hey@emmanuel-smith.me>
 * project:	ets2-dashboard-skin
 * file: 	_i18n.js
 * Date: 	16/09/2021
 * Time: 	13:17
 */
import { fallbackLocale } from '@/utils/_i18n';

// initial state
const state = () => ({
  locale: fallbackLocale
});

// getters
const getters = {
  locale: (state) => state.locale
};

// actions
const actions = {};

// mutations
const mutations = {
  setLocale(state, payload) {
    state.locale = payload;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
