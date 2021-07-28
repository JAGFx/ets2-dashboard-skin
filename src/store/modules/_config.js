import defaultData from '@/data/ets2-dashboard-skin.config.json';
import { config }  from '@/utils/utils';
import Vue         from 'vue';

// initial state
const state = () => (defaultData);

// getters
const getters = {
	get:     state => elm => {
		let value = state[ elm ];
		
		if ( value === 'true' )
			value = true;
		else if ( value === 'false' )
			value = false;
		
		return value ?? null;
	},
	enabled: ( state, getters ) => elm => {
		//console.log( elm, getters.exist( elm ), getters.get( elm ) );
		
		return getters.exist( elm ) && getters.get( elm ) === true;
	},
	exist:   state => elm => {
		return Object.hasOwnProperty.call( state, elm );
	},
	all:     state => {
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
