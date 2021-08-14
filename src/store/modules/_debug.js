/**
 * @author:	Emmanuel SMITH <hey@emmanuel-smith.me>
 * project:	ets2-dashboard-skin
 * file: 	_debug.js
 * Date: 	14/08/2021
 * Time: 	19:30
 */

import * as moment from 'moment';

// initial state
const state = () => ({
	logs: []
});

// getters
const getters = {
	logs: state => state.logs
};

// actions
const actions = {
	addLog( { commit }, dataIn ) {
		const date    = moment();
		const level   = dataIn.level;
		const zone    = dataIn.zone;
		const message = dataIn.message;
		const line    = `[ ${ date.format( 'YYYY-MM-DD HH:mm:ss' ) } ][ ${ level } ][ ${ zone } ] ${ message }`;
		
		commit( 'pushLog', line );
	}
};

// mutations
const mutations = {
	pushLog( state, log ) {
		state.logs.push( log );
	}
};

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations
};
