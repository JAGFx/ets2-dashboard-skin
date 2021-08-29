/**
 * @author:	Emmanuel SMITH <hey@emmanuel-smith.me>
 * project:	ets2-dashboard-skin
 * file: 	_event.js
 * Date: 	14/08/2021
 * Time: 	20:00
 */

const defaultData = {
	game: {
		fine: {
			active:  true,
			amount:  1000,
			offence: { id: 'speeding', name: 'Speeding' }
		}
	}
};

// initial state
const state = () => (
	{
		lastTimeOut:     null,
		eventProcessing: false,
		eventName:       null,
		eventRawData:    defaultData
	}
);

// getters
const getters = {
	lastTimeOut:     state => state.lastTimeOut,
	eventProcessing: state => state.eventProcessing,
	eventName:       state => state.eventName,
	eventRawData:    state => state.eventRawData
};

// actions
const actions = {
	displayEnEvent( { commit, getters }, dataIn ) {
		if ( getters[ 'lastTimeOut' ] !== null )
			clearTimeout( getters[ 'lastTimeOut' ] );
		
		commit( 'setEventProcessing', dataIn.eventProcessing );
		commit( 'setEventName', dataIn.eventName );
		commit( 'setEventData', dataIn.eventRawData );
		
		const lastTimeOut = setTimeout( () => {
			commit( 'setEventProcessing', false );
			commit( 'setEventName', null );
			commit( 'setEventData', defaultData );
		}, 3000 );
		
		commit( 'setLastTimeOut', lastTimeOut );
	}
};

// mutations
const mutations = {
	setLastTimeOut( state, payload ) {
		state.lastTimeOut = payload;
	},
	setEventProcessing( state, payload ) {
		state.eventProcessing = payload;
	},
	setEventName( state, payload ) {
		state.eventName = payload;
	},
	setEventData( state, payload ) {
		state.eventRawData = payload;
	}
};

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations
};
