/**
 * @author:	Emmanuel SMITH <hey@emmanuel-smith.me>
 * project:	ets2-dashboard-skin
 * file: 	_app.js
 * Date: 	08/04/2020
 * Time: 	18:36
 */

import countryList from 'country-list';
import emojiFlags  from 'emoji-flags';

import packageJson from '../../package.json';


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

const jsonReadable = ( dataIn ) => {
	return JSON.parse( JSON.stringify( dataIn ) );
};

export default {
	basePathHost,
	version,
	flag,
	jsonReadable
};
