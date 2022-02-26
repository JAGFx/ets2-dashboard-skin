import Telemetry from '@/model/telemetry.model';
import testData from 'ets2-dashboard-lib/sdk/scs_sdk_plugin_parsed_data.json';
import Vue from 'vue';

export const store = Vue.observable({
  telemetry: testData,
  model: null,
  gameConnected: false,
  receivedData: false
});

export const mutations = {
  setTelemetry(payload) {
    store.telemetry = payload;
    store.model = new Telemetry();
  },
  setReceivedData(payload) {
    store.receivedData = payload;
  },
  setGameConnected(payload) {
    store.gameConnected = payload;
  }
};
