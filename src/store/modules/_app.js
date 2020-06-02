/**
 * @author:	Emmanuel SMITH <emmanuel.smith@live-session.fr>
 * project:	customDefault
 * file: 	_app.js
 * Date: 	31-May-20
 * Time: 	15:56
 */

const state = () => ({
	processing: false,
	message:    {
		type: 'dark',
		title:   'Processing',
		message: 'Your app are on processing. Please wait'
	},
	details:    {
		message: null,
		code: null,
	}
});

// getters
const getters = {
	isOnProcessing: state => state.processing,
	message:        state => state.message,
	details:        state => state.details,
	getProcessing:  ( state ) => {
		return state.processing;
	}
};

// actions
const actions = {
	startProcessing( { commit } ) {
		commit( 'setProcessing', true );
	},
	endProcessing( { commit } ) {
		commit( 'setProcessing', false );
	},
	setError( { commit }, payload ){
		commit( 'setMessage', payload.message );
		commit( 'setDetails', payload.details );
	}
};

// mutations
const mutations = {
	setProcessing( state, value ) {
		state.processing = value;
	},
	setMessage( state, message ){
		state.message = message;
	},
	setDetails( state, details ){
		state.details = details;
	}
};

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations
};
