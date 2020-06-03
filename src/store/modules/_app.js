/**
 * @author:	Emmanuel SMITH <emmanuel.smith@live-session.fr>
 * project:	customDefault
 * file: 	_app.js
 * Date: 	31-May-20
 * Time: 	15:56
 */

const defaultMessage = {
	type:    'dark',
	title:   'Processing',
	message: 'Your app are on processing. Please wait'
};

const defaultDetails = {
	message: null,
	code:    null
};

const state = () => ({
	processing: false,
	message:    defaultMessage,
	details:    defaultDetails
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
		commit( 'setMessage', defaultMessage );
		commit( 'setDetails', defaultDetails );
	},
	setError( { commit }, payload ) {
		commit( 'setProcessing', true );
		commit( 'setMessage', payload.message );
		commit( 'setDetails', payload.details );
	}
};

// mutations
const mutations = {
	setProcessing( state, value ) {
		state.processing = value;
	},
	setMessage( state, message ) {
		state.message = message;
	},
	setDetails( state, details ) {
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
