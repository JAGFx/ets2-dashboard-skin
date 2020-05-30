import * as utils from '../../utils/utils';

/**
 * @author:	Emmanuel SMITH <emmanuel.smith@live-session.fr>
 * project:	customDefault
 * file: 	_config.js
 * Date: 	30-May-20
 * Time: 	17:14
 */
	
	// initial state
const state = () => (utils.config.emptyData());

// getters
const getters = {
	get: ( state ) => ( elm ) => {
		return state[ elm ];
	},
	all: ( state ) => {
		return state;
	}
};

// actions
const actions = {
	load( { commit } ) {
		utils.config
			 .load()
			 .then( data => commit( 'setElm', data ) );
	}
};

// mutations
const mutations = {
	setElm( state, configs ) {
		//console.log( state, configs );
		
		Object.keys( configs ).forEach( ( key ) => {
			const value  = configs[ key ];
			state[ key ] = value;
		} );
	}
};

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations
};
