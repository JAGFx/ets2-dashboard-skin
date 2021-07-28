// initial state
const state = () => ({
		displayed: false
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
