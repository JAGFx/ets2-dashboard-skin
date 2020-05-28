/**
 * @author:	Emmanuel SMITH <hey@emmanuel-smith.me>
 * project:	ets2-dashboard-skin
 * file: 	_config.js
 * Date: 	08/04/2020
 * Time: 	17:50
 */

import axios      from 'axios';
import testConfig from '../data/ets2-dashboard-skin.config.json';
import utilsApp   from './_app';
import FileSaver  from 'file-saver';

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
};

const download = ( data ) => {
	const file = new File( [ JSON.stringify( data, null, 2 ) ],
		'ets2-dashboard-skin.config.json',
		{ type: 'application/json;charset=utf-8' } );
	FileSaver.saveAs( file );
};

const load = () => {
	let data = {};
	
	if ( process.env.VUE_APP_USE_FAKE_DATA === 'true' )
		data = testConfig;
	
	return data;
};

export default {
	configData,
	generateEmptyData,
	save,
	download,
	load
};
