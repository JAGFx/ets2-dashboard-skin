/**
 * @author:	Emmanuel SMITH <hey@emmanuel-smith.me>
 * project:	ets2-dashboard-skin
 * file: 	_config.js
 * Date: 	08/04/2020
 * Time: 	17:50
 */

import axios       from 'axios';
import FileSaver   from 'file-saver';
import defaultData from '../data/ets2-dashboard-skin.config.json';
import store       from '../store';

const generateEmptyData = ( config, configSkins ) => {
	let emptyData = {};
	
	//console.log( config, configSkins );
	
	config.categories.forEach( category => {
		category.elements.forEach( element => {
			emptyData[ element.id ] = null;
		} );
	} );
	
	Object.entries( configSkins ).forEach( ( [ key, skin ] ) => {
		//console.log( key, 'Plop', skin );
		skin.categories.forEach( category => {
			category.elements.forEach( element => {
				emptyData[ element.id ] = null;
			} );
		} );
	} );
	
	//console.log( emptyData );
	
	return emptyData;
};

const emptyData = () => {
	return defaultData;
};

const save = async data => {
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

const download = () => {
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

const load = () => {
	store.dispatch( 'app/startProcessing' );
	
	if ( process.env.VUE_APP_USE_FAKE_DATA === 'true' )
		return new Promise( resolve => {
			setTimeout( () => {
				store.dispatch( 'app/endProcessing' );
				resolve( emptyData() );
			}, 1000 );
		} );
	
	return axios.get( '/config' )
				.then( response => {
					//console.log(  'Load', response.data );
					store.dispatch( 'app/endProcessing' );
					return response.data;
				}, error => {
					//console.log( error );
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
					return emptyData();
				} );
	//.finally( () => store.dispatch( 'app/endProcessing' ) );
};

const upload = file => {
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

const uploadChecker = input => {
	let result = {
		state: true
	};
	
	Object.entries( defaultData ).forEach( entry => {
		const key = entry[ 0 ];
		
		if ( !input.hasOwnProperty( key ) )
			result = {
				state: false,
				value: key
			};
	} );
	
	return result;
};


export default {
	load,
	generateEmptyData,
	emptyData,
	save,
	download,
	upload
};
