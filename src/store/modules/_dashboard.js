/**
 * @author:	Emmanuel SMITH <hey@emmanuel-smith.me>
 * project:	ets2-dashboard-skin
 * file: 	dashboard.js
 * Date: 	11/02/2022
 * Time: 	19:10
 */

// initial state
const state = () => ({
  scania: {
    messages: [
      //{
      //  id: 'truck.brakes.airPressure.warning.enabled',
      //  type: 'warning',
      //  icon: 'icon-scania-break-pressure_red_yellow',
      //  message: 'The awesome message'
      //}
    ]
  }
});

// getters
const getters = {
  hasScaniaMessage: (state) => state.scania.messages.length > 0,
  getScaniaMessages: (state) => state.scania.messages,
  getLatestScaniaMessage: (state) => {
    return state.scania.messages[state.scania.messages.length - 1];
  },
  hasScaniaWarningMessage: (state) => {
    return (
      state.scania.messages.filter((message) => message.type === 'warning')
        .length > 0
    );
  },
  hasScaniaErrorMessage: (state) => {
    return (
      state.scania.messages.filter((message) => message.type === 'error')
        .length > 0
    );
  }
};

// actions
const actions = {};

// mutations
const mutations = {
  addScaniaMessage(state, message) {
    state.scania.messages.push(message);
  },
  removeScaniaMessage(state, icon) {
    state.scania.messages = state.scania.messages.filter(
      (message) => message.icon !== icon
    );
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
