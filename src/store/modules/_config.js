/**
 * @author:	Emmanuel SMITH <emmanuel.smith@live-session.fr>
 * project:	customDefault
 * file: 	_config.js
 * Date: 	30-May-20
 * Time: 	17:14
 */

import defaultData from '@/data/ets2-dashboard-skin.config.json';
import { config }  from '@/utils/utils';
import Vue         from 'vue';

// initial state
const state = () => (defaultData);

// getters
const getters = {
	get:   ( state ) => ( elm ) => {
		return state[ elm ];
	},
	exist: ( state ) => ( elm ) => {
		return state.hasOwnProperty( elm );
	},
	all:   ( state ) => {
		return state;
	}
};

// actions
const actions = {
	load( { commit } ) {
		return config
			.load()
			.then( data => commit( 'setElms', data ) );
	}
};

// mutations
const mutations = {
	setElms( state, configs ) {
		Object.keys( configs ).forEach( ( key ) => {
			const value = configs[ key ];
			Vue.set( state, key, value );
		} );
	},
	setElm( state, elm ) {
		Vue.set( state, elm.id, elm.value );
		config.save( state );
	}
};

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations
};
