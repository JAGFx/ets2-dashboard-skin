/**
 * @author:	Emmanuel SMITH <hey@emmanuel-smith.me>
 * project:	ets2-dashboard-skin
 * file: 	skins.js
 * Date: 	02/05/2020
 * Time: 	09:27
 */

import _     from 'lodash';
import skins from '../../data/skins.json';

// initial state
const state = () => ({
	currentSkin: null,
	all:         skins.skins
});

// getters
const getters = {
	current:     state => {
		return state.currentSkin;
	},
	active:      state => {
		return state.all.filter( skin => !skin.disabled );
	},
	firstActive: ( state, getters ) => {
		//console.log( 'plop', getters.active );
		return _.first( getters.active );
	}
};

// actions
const actions = {
	setFirstActive( { commit, getters } ) {
		const active = getters.firstActive;
		console.log( active );
		commit( 'setCurrent', active );
	}
};

// mutations
const mutations = {
	setCurrent( state, skin ) {
		state.currentSkin = skin;
	}
};

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations
};
