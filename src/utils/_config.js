/**
 * @author:	Emmanuel SMITH <hey@emmanuel-smith.me>
 * project:	ets2-dashboard-skin
 * file: 	_config.js
 * Date: 	08/04/2020
 * Time: 	17:50
 */

import axios      from 'axios';
import FileSaver  from 'file-saver';
import testConfig from '../data/ets2-dashboard-skin.config.json';
import utilsApp   from './_app';

const configData = () => {
	const path = utilsApp.basePathHost + 'config.json';
	//console.log( path );
	return axios.get( path )
				.then( response => {
					//console.log( 'Config', response.data );
					return response.data;
				} );
};

const generateEmptyData = ( config, configSkins ) => {
	let emptyData = {};
	
	//console.log( config, configSkins );
	
	config.categories.forEach( category => {
		category.elements.forEach( element => {
			emptyData[ element.id ] = null;
		} );
	} );
	
	Object.entries( configSkins ).forEach( ( [ key, skin ] ) => {
		console.log( key, 'Plop', skin );
		skin.categories.forEach( category => {
			category.elements.forEach( element => {
				emptyData[ element.id ] = null;
			} );
		} );
	} );
	
	//console.log( emptyData );
	
	return emptyData;
};

const save = data => {
	console.log( data );
	// TODO: Push on server
};

const download = () => {
	// TODO: Get from server
	const data = load();
	const file = new File( [ JSON.stringify( data, null, 2 ) ],
		'ets2-dashboard-skin.config.json',
		{ type: 'application/json;charset=utf-8' } );
	FileSaver.saveAs( file );
};

const load = () => {
	// TODO: Get from server
	
	let data = {};
	
	if ( process.env.VUE_APP_USE_FAKE_DATA === 'true' )
		data = testConfig;
	
	return data;
};

const upload = file => {
	if ( file.type !== 'application/json' )
		throw 'Invalid file type';
	
	let reader = new FileReader();
	reader.readAsText( file, 'UTF-8' );
	
	reader.onload  = evt => {
		const data = JSON.parse( evt.target.result );
		console.log( data );
		
		save( data );
	};
	reader.onerror = () => {
		throw 'Error reading file';
	};
};

export default {
	configData,
	generateEmptyData,
	save,
	download,
	load,
	upload
};
