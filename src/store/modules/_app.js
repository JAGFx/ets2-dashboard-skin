/**
 * @author:	Emmanuel SMITH <emmanuel.smith@live-session.fr>
 * project:	customDefault
 * file: 	_app.js
 * Date: 	31-May-20
 * Time: 	15:56
 */

import { history } from '@/utils/utils';
import Vue         from 'vue';

const defaultMessage = {
	type:    'dark',
	title:   'Processing',
	message: 'Your app is on processing. Please wait'
};

const defaultDetails = {
	message: null,
	code:    null
};

const defaultLaunchObject = {
	icon:    '<i class="fas fa-box"></i>',
	text:    'App ready !',
	subText: 'Starting delivering'
};

const state = () => ({
	processing: false,
	message:    defaultMessage,
	details:    defaultDetails,
	launch:     defaultLaunchObject
});

// getters
const getters = {
	isOnProcessing: state => state.processing,
	message:        state => state.message,
	details:        state => state.details,
	launch:         state => state.launch,
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
		Vue.prototype.$pushALog( 'Error thrown', JSON.stringify( payload ), history.HTY_ZONE.ERROR );
		
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
	},
	setLaunch( state, launch ) {
		state.launch = launch;
	}
};

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations
};
