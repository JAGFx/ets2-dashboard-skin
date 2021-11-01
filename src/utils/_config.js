/**
 * @author:	Emmanuel SMITH <hey@emmanuel-smith.me>
 * project:	ets2-dashboard-skin
 * file: 	_config.js
 * Date: 	08/04/2020
 * Time: 	17:50
 */

import fieldValues from '@/data/config-field-values.json';
import defaultGeneralConfig from '@/data/config/config.json';
import defaultEts2Config from '@/data/config/config.ets2.json';
import store       from '@/store';
import axios       from 'axios';
import FileSaver   from 'file-saver';

export const generateEmptyData = ( config, configSkins ) => {
	let emptyData = {};
	
	config.categories.forEach( category => {
		category.elements.forEach( element => {
			emptyData[ element.id ] = null;
		} );
	} );
	
	Object.entries( configSkins ).forEach( ( skin ) => {
		skin.categories.forEach( category => {
			category.elements.forEach( element => {
				emptyData[ element.id ] = null;
			} );
		} );
	} );
	
	return emptyData;
};

export const emptyData = (withGame = false) => {
	return {
		app: defaultGeneralConfig,
		game: withGame ? defaultEts2Config : null
	};
};

export const save = async data => {
	store.dispatch( 'app/startProcessing' );
	
	if ( process.env.VUE_APP_USE_FAKE_DATA === 'true' )
		return new Promise( resolve => {
			setTimeout( () => {
				store.dispatch( 'app/endProcessing' );
				resolve( data );
			}, 1000 );
		} );
	
	return await axios
		.post( '/config', data )
		.then( response => {
			store.dispatch( 'app/endProcessing' );
			return response.data;
		}, error => {
			store.dispatch( 'app/setError', {
				message: {
					type:    'dark',
					title:   error.name,
					message: error.message
				},
				details: {
					error: error,
					code:  'CONFIG_SAVE_FAILED'
				}
			} );
			return error;
		} );
};

export const download = () => {
	return load()
		.then( data => {
			const file = new File(
				[ JSON.stringify( data, null, 2 ) ],
				'ets2-dashboard-skin.config.json',
				{ type: 'application/json;charset=utf-8' }
			);
			
			FileSaver.saveAs( file );
		} );
};

export const load = () => {
	if ( process.env.VUE_APP_USE_FAKE_DATA === 'true' )
		return new Promise( resolve => {
			setTimeout( () => {
				resolve( emptyData().app );
			}, 1000 );
		} );
	
	return axios.get( '/config' )
				.then( response => {
					return response.data.app;
				}, error => {
					store.dispatch( 'app/setError', {
						message: {
							type:    'dark',
							title:   error.name,
							message: error.message
						},
						details: {
							error: error,
							code:  'CONFIG_LOAD_FAILED'
						}
					} );
					return emptyData().app;
				} );
};

export const loadGameConfig = () => {
	if ( process.env.VUE_APP_USE_FAKE_DATA === 'true' )
		return new Promise( resolve => {
			setTimeout( () => {
				resolve( emptyData(true).game );
			}, 1000 );
		} );
	
	return axios.get( '/config' )
				.then( response => {
					return response.data.game;
				}, error => {
					store.dispatch( 'app/setError', {
						message: {
							type:    'dark',
							title:   error.name,
							message: error.message
						},
						details: {
							error: error,
							code:  'CONFIG_LOAD_FAILED'
						}
					} );
					return emptyData(true).game;
				} );
}

export const upload = file => {
	return new Promise( ( resolve, reject ) => {
		try {
			if ( file.type !== 'application/json' )
				throw 'Invalid file type';
			
			let reader = new FileReader();
			reader.readAsText( file, 'UTF-8' );
			
			reader.onload  = evt => {
				try {
					const data        = JSON.parse( evt.target.result );
					const checkResult = uploadChecker( data );
					//console.log( 'a', data );
					
					if ( !checkResult.state )
						throw 'An entry required was not found: ' + checkResult.value;
					
					save( data )
						.then( data => resolve( data ),
							error => reject( error ) );
					
				} catch ( e ) {
					reject( e );
				}
				
			};
			reader.onerror = () => {
				reject( 'Error reading file' );
			};
			
		} catch ( e ) {
			reject( e );
		}
	} );
};

export const getFieldValues = fieldId => {
	if ( Object.hasOwnProperty.call( fieldValues, fieldId ) )
		return new Promise( resolve => resolve( fieldValues[ fieldId ] ) );
	
	else return new Promise( resolve => resolve( [] ) );
};

const uploadChecker = input => {
	let result = {
		state: true
	};
	
	Object.entries( emptyData() ).forEach( entry => {
		const key = entry[ 0 ];
		
		if ( !Object.hasOwnProperty.call( input, key ) )
			result = {
				state: false,
				value: key
			};
	} );
	
	return result;
};
