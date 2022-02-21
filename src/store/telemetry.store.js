import testData from 'ets2-dashboard-lib/sdk/scs_sdk_plugin_parsed_data.json';
import Vue from 'vue';
import vueStore from '@/store';

export const store = Vue.observable({
  telemetry: testData,
  gameConnected: false,
  receivedData: false
});

export const mutations = {
  setTelemetry(payload) {
    store.telemetry = payload;
  },
  setReceivedData(payload) {
    store.receivedData = payload;
  },
  setGameConnected(payload) {
    store.gameConnected = payload;
  }
};

export const getters = {
  telemetryDataIsEnough() {
    return (
      store.receivedData &&
      store.telemetry.game.sdkActive &&
      store.telemetry.truck.brand.id.length !== 0 &&
      vueStore.getters['config/gameConfigLoaded']
    );
  },
  jobDeliveryTime() {
    return store.telemetry.job.market.id === 'external_contracts'
      ? store.telemetry.job.expectedDeliveryTimestamp.value
      : store.telemetry.job.expectedDeliveryTimestamp.unix;
  }
};
