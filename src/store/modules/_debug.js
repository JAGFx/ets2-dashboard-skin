/**
 * @author:	Emmanuel SMITH <hey@emmanuel-smith.me>
 * project:	ets2-dashboard-skin
 * file: 	_debug.js
 * Date: 	14/08/2021
 * Time: 	19:30
 */

import { DateTime } from 'luxon';

// initial state
const state = () => ({
  logs: []
});

// getters
const getters = {
  logs: (state) => state.logs
};

// actions
const actions = {
  addLog({ commit }, dataIn) {
    const date = DateTime.now();
    const level = dataIn.level;
    const zone = dataIn.zone;
    const message = dataIn.message;
    const line = `[ ${date.toString()} ][ ${level} ][ ${zone} ] ${message}`;

    commit('pushLog', line);
  }
};

// mutations
const mutations = {
  pushLog(state, log) {
    state.logs.push(log);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
