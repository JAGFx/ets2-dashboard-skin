/**
 * @author:	Emmanuel SMITH <emmanuel.smith@live-session.fr>
 * project:	customDefault
 * file: 	_app.js
 * Date: 	31-May-20
 * Time: 	15:56
 */

import store from '../index';

const state = () => ({
	processing: false,
	event:      null,
	rawData:    null
});

// getters
const getters = {
	isOnProcessing: state => state.processing,
	event:          state => state.event,
	rawData:        state => state.rawData
};

// actions
const actions = {
	emitEvent( { commit, dispatch, state }, payload ) {
		const configName = `events_${ payload.eventName }`;
		const isActive   = store.getters[ 'config/get' ]( configName );
		
		//console.log( 'Config - isActive', configName, isActive );
		
		if ( isActive ) {
			commit( 'setProcessing', true );
			commit( 'setEvent', payload.eventName );
			commit( 'setRawData', payload.rawData );
			//console.log( 'Start event', payload.eventName, payload.rawData );
			
			setTimeout( () => {
				dispatch( 'stopEvent' );
			}, 3000 );
		}
	},
	stopEvent( { commit } ) {
		//console.log( 'Stop event' );
		commit( 'setProcessing', false );
		commit( 'setEvent', null );
		commit( 'setRawData', null );
	}
};

// mutations
const mutations = {
	setProcessing( state, value ) {
		state.processing = value;
	},
	setEvent( state, event ) {
		state.event = event;
	},
	setRawData( state, rawData ) {
		state.rawData = rawData;
	}
};

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations
};
