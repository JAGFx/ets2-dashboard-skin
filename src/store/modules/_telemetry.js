/**
 * @author:	Emmanuel SMITH <hey@emmanuel-smith.me>
 * project:	ets2-dashboard-skin
 * file: 	telemetry.js
 * Date: 	02/05/2020
 * Time: 	09:49
 */

//import _        from 'lodash';
import Vue      from 'vue';
import testData from '../../data/scs_sdk_plugin_parsed_data.json';

const DATA_ELEMENTS = {
	game:       'game',
	controls:   'controls',
	navigation: 'navigation',
	job:        'job',
	truck:      'truck',
	trailer:    'trailer'
};

// initial state

const state = () => {
	let data;
	
	if ( process.env.VUE_APP_USE_FAKE_DATA === 'true' )
		data = testData;
	
	else
		data = {
			game:       null,
			controls:   null,
			navigation: null,
			job:        null,
			truck:      null,
			trailer:    null,
			log:        []
		};
	
	return {
		data: data
	};
};

// getters
const getters = {
	current: state => {
		return state.data;
	},
	pick:    ( state ) => ( elms ) => {
		const elmList = (elms === undefined)
			? Object.values( DATA_ELEMENTS )
			: elms;
		
		//console.log( elms, elmList, state.data );
		
		//return _.pick( state.data, elmList );
	}
};

// actions
const actions = {};

// mutations
const mutations = {
	update( state, data ) {
		const gameReady = data.game !== null &&
						  (typeof data.game === 'object' && Object.keys( data.game ).length > 0);
		
		if ( gameReady )
			Vue.set( state, 'data', data );
	}
};

export {
	DATA_ELEMENTS
};

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations
};
