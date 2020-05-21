/**
 * @author:	Emmanuel SMITH <hey@emmanuel-smith.me>
 * project:	ets2-dashboard-skin
 * file: 	menu.js
 * Date: 	21/05/2020
 * Time: 	11:22
 */
	
	// initial state
const state = () => ({
		displayed: true
	});

// getters
const getters = {
	isDisplayed: state => {
		return state.displayed;
	}
};

// actions
const actions = {
	toggle( { commit, getters } ) {
		const isDisplayed = getters.isDisplayed;
		
		if ( isDisplayed )
			commit( 'switchOff' );
		else
			commit( 'switchOn' );
	}
};

// mutations
const mutations = {
	switchOn( state ) {
		state.displayed = true;
	},
	switchOff( state ) {
		state.displayed = false;
	}
};

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations
};
