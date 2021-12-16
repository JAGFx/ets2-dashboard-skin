/**
 * @author:	Emmanuel SMITH <hey@emmanuel-smith.me>
 * project:	ets2-dashboard-skin
 * file: 	_splashScreen.js
 * Date: 	27/10/2021
 * Time: 	21:41
 */

import testData                         from '@/data/scs_sdk_plugin_parsed_data.json';
import store                            from '@/store';
import { basePathHost, pushLog }        from '@/utils/_app';
import { changeLocale, fallbackLocale } from '@/utils/_i18n';
import { app, history, config }                 from '@/utils/utils';
import { io }                           from 'socket.io-client';
import Vue                              from 'vue';

export const loadAppConfig = () => {
	store.dispatch('app/showMessage', {
		icon: null,
		title: 'Launching',
		message: 'Load app configuration file'
	} )
	
	return config
		.load('app')
		.then( data => {
			pushLog( 'Config loaded', history.HTY_ZONE.MAIN );
			store.commit( 'config/setApp', data )
		} );
};

export const setConfigActive = () => {
	store.dispatch('app/showMessage', {
		icon: null,
		title: 'Launching',
		message: 'Set startup skin'
	} )
	
	return new Promise( resolve  => {
		const skinToLoad = store.getters[ 'config/get' ]( 'general_skin_on_load' );
		
		try {
			store.commit( 'skins/setConfigActive', skinToLoad );
			console.log( 'Plop' );
			resolve();
			
		} catch ( e ) {
			pushLog( 'Value set in "general_skin_on_load" was not a valid skin: ' + skinToLoad,
				history.HTY_ZONE.MAIN,
				history.HTY_LEVEL.ERROR );
			store.dispatch( 'skins/setFirstActive' );
			resolve();
		}
	} );
};

export const setLocale = () => {
	store.dispatch('app/showMessage', {
		icon: null,
		title: 'Launching',
		message: 'Set language'
	} )
	
	return new Promise( resolve => {
		const locale = store.getters[ 'config/get' ]( 'general_skin_locale' );
		try {
			changeLocale( locale );
			console.log( 'Hellow' );
			resolve();
			
		} catch ( e ) {
			pushLog( `Value set in "general_skin_locale" was not a valid skin: ${ locale }. Revert to fallback locale: ${ fallbackLocale }`,
				history.HTY_ZONE.MAIN,
				history.HTY_LEVEL.ERROR );
			changeLocale( fallbackLocale );
			resolve( e );
		}
	} );
};

export const loadGameConfig = () => {
	store.dispatch('app/showMessage', {
		icon: null,
		title: 'Launching',
		message: 'Load configuration game'
	} )
	
	return config
		.loadGameConfig()
		.then( data => {
			pushLog( 'Game config loaded', history.HTY_ZONE.MAIN );
			store.commit( 'config/setGame', data )
		} );
};

export const startTelemetryConnection = () => {
	return new Promise((resolve) => {
		store.dispatch('app/showMessage', {
			icon: null,
			title: 'Launching',
			message: 'Start '
		} )
		
		if ( !app.useFakeData ) {
			const telemetrySocket = io( basePathHost() );
			telemetrySocket.on( 'connect', () => {
				store.dispatch( 'app/showMessage', {
					icon:    '<i class="fas fa-truck"></i>',
					title:    'Connected to telemetry server',
					message: 'Ready to delivering'
				} );
				
				setTimeout( () => {
					store.dispatch( 'app/showMessage', {
						icon:    '<i class="fas fa-truck"></i>',
						title:    'Waiting game connection',
						message: 'Run the game to start your job !'
					} );
					resolve()
				}, 500 );
			} );
			telemetrySocket.on( 'update', data => {
				Vue.prototype.$updateTelemetry( data );
			});
			telemetrySocket.on( 'log', data => {
				Vue.prototype.$updateEvent( data );
			} );
		} else {
			setTimeout( () => {
				Vue.prototype.$updateTelemetry( testData )
				resolve()
			}, 1000 );
		}
	})
}