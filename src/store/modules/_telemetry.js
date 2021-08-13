/**
 * @author:	Emmanuel SMITH <hey@emmanuel-smith.me>
 * project:	ets2-dashboard-skin
 * file: 	_telemetry.js
 * Date: 	13/08/2021
 * Time: 	08:34
 */

import testData from '@/data/scs_sdk_plugin_parsed_data.json';
import { app }  from '@/utils/utils';

// initial state
const state = () => ({
	telemetry:     testData,
	gameConnected: false,
	receivedData:  false
});

// getters
const getters = {
	getTelemetry:     state => state.telemetry,
	getReceivedData:  state => state.receivedData,
	getGameConnected: state => {
		return app.useFakeData || (state.receivedData
								   && state.telemetry.game.sdkActive
								   && (state.telemetry.truck.brand.id.length !== 0));
	}
};

// actions
const actions = {
	socket_update( { commit }, payload ) {
		const data = { ...payload };
		Object.freeze( data );
		const gameConnected = data.game !== null &&
							  (typeof data.game === 'object' && Object.keys( data.game ).length > 0);
		
		commit( 'setTelemetry', data );
		commit( 'setGameConnected', gameConnected );
		
		if ( gameConnected )
			commit( 'setReceivedData', true );
	}
};

// mutations
const mutations = {
	setTelemetry( state, payload ) {
		state.telemetry = payload;
	},
	setReceivedData( state, payload ) {
		state.receivedData = payload;
	},
	setGameConnected( state, payload ) {
		state.gameConnected = payload;
	}
};

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations
};
