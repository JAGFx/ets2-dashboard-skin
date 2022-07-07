/**
 * @author:	Emmanuel SMITH <emmanuel.smith@live-session.fr>
 * project:	customDefault
 * file: 	_app.js
 * Date: 	31-May-20
 * Time: 	15:56
 */

import { HTY_ZONE } from "@/utils/_history";
import Vue          from 'vue';

const defaultMessage = {
  icon: null,
  title: 'Processing',
  message: 'Your app is on processing. Please wait'
};

const defaultDetails = {
  message: null,
  code: null
};

const state = () => ({
  launched: false,
  processing: false,
  message: defaultMessage,
  details: defaultDetails
});

// getters
const getters = {
  isLaunched: (state) => state.launched,
  isOnProcessing: (state) => state.processing,
  message: (state) => state.message,
  details: (state) => state.details
};

// actions
const actions = {
  startProcessing({ commit }) {
    commit('setProcessing', true);
  },
  showMessage({ commit }, payload) {
    commit('setProcessing', true);
    commit('setMessage', payload);
  },
  endProcessing({ commit }) {
    commit('setProcessing', false);
    commit('setMessage', defaultMessage);
    commit('setDetails', defaultDetails);
  },
  setError({ commit }, payload) {
    Vue.prototype.$pushALog(
      'Error thrown',
      JSON.stringify(payload),
      HTY_ZONE.ERROR
    );

    commit('setProcessing', true);
    commit('setMessage', payload.message);
    commit('setDetails', payload.details);
  }
};

// mutations
const mutations = {
  setLaunched(state, value) {
    state.launched = value;
  },
  setProcessing(state, value) {
    state.processing = value;
  },
  setMessage(state, message) {
    state.message = message;
  },
  setDetails(state, details) {
    state.details = details;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
