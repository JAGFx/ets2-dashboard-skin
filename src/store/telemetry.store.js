import testData from '@/data/scs_sdk_plugin_parsed_data.json';
import Vue      from "vue";

export const store = Vue.observable({
	telemetry:     testData,
	gameConnected: false,
	receivedData:  false
});

export const mutations = {
	setTelemetry( payload ) {
		store.telemetry = payload;
	},
	setReceivedData( payload ) {
		store.receivedData = payload;
	},
	setGameConnected( payload ) {
		store.gameConnected = payload;
	}
};