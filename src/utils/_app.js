/**
 * @author:	Emmanuel SMITH <hey@emmanuel-smith.me>
 * project:	ets2-dashboard-skin
 * file: 	_app.js
 * Date: 	08/04/2020
 * Time: 	18:36
 */

import countryList from 'country-list';
import emojiFlags  from 'emoji-flags';
import _           from 'lodash';

import packageJson from '../../package.json';
import testData    from '../data/scs_sdk_plugin_parsed_data.json';


const basePathHost = 'http://' + window.location.host + '/';

const version = packageJson.version;

const flag = ( countryName ) => {
	let flag = undefined;
	
	if ( countryName.length !== 0 ) {
		countryName       = (countryName === 'uk')
			? 'United Kingdom of Great Britain and Northern Ireland'
			: countryName;
		const countryCode = countryList.getCode( countryName );
		flag              = emojiFlags.countryCode( countryCode );
	}
	
	//console.log( countryName, countryCode, flag, flag.emoji );
	
	return (flag !== undefined)
		? flag.emoji
		: '🏳️';
};

const initTelemetryData = ( elms ) => {
	const elmList = (elms === undefined)
		? [ 'game', 'controls', 'navigation', 'job', 'truck', 'trailer' ]
		: elms;
	let data;
	
	if ( process.env.VUE_APP_USE_FAKE_DATA === 'true' )
		data = testData;
	
	else
		data = {
			game:       null,
			controls:   null,
			navigation: null,
			job:        null,
			truck:      null,
			trailer:    [],
			log:        []
		};
	
	const dataFiltered = _.pick( data, elmList );
	//console.log( elmList, data, dataFiltered );
	
	return dataFiltered;
};

const updateTelemetryData = ( inputData, elms ) => {
	const elmList = (elms === undefined)
		? [ 'game', 'controls', 'navigation', 'job', 'truck', 'trailer' ]
		: elms;
	
	const dataFiltered = _.pick( inputData, elmList );
	//console.log( elmList, inputData, dataFiltered );
	
	return dataFiltered;
};

export default {
	basePathHost,
	version,
	flag,
	initTelemetryData,
	updateTelemetryData
};
