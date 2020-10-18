/**
 * @author:	Emmanuel SMITH <hey@emmanuel-smith.me>
 * project:	ets2-dashboard-skin
 * file: 	_app.js
 * Date: 	08/04/2020
 * Time: 	18:36
 */

import countryList from 'country-list';
import emojiFlags  from 'emoji-flags';
import moment      from 'moment-timezone';


import packageJson from '../../package.json';


// --- Variables
const DATE_FORMAT_NONE  = null;
const DATE_FORMAT_SHORT = 'MM/DD';
const DATE_FORMAT_LONG  = 'ddd';
const DATE_FORMAT_FULL  = 'dddd';
const TIME_FORMAT_NONE  = null;
const TIME_FORMAT_SHORT = 'LT';
const TIME_FORMAT_FULL  = 'LTS';


// --- Methods

const basePathHost = 'http://' + window.location.host + '/';

const version = packageJson.version;

const isOnDevEnvironment = process.env.NODE_ENV.startsWith( 'dev' );
const useFakeData        = process.env.VUE_APP_USE_FAKE_DATA === 'true';

const flag = ( countryName ) => {
	let flag = undefined;
	
	if ( countryName.length !== 0 ) {
		countryName       = (countryName === 'uk')
			? 'United Kingdom of Great Britain and Northern Ireland'
			: countryName;
		const countryCode = countryList.getCode( countryName );
		
		if ( countryCode !== undefined )
			flag = emojiFlags.countryCode( countryCode );
	}
	
	//console.log( countryName, countryCode, flag, flag.emoji );
	
	return (flag !== undefined)
		? flag.emoji
		: '🏳️';
};

const numberDigit = input => {
	return input < 10 ? `0${ input }` : input;
};

const jsonReadable = ( dataIn ) => {
	return JSON.parse( JSON.stringify( dataIn ) );
};

const dateTimeLocalized = ( input, formatDate, formatTime ) => {
	const format     = formatDate + ' ' + formatTime;
	const momentData = moment( input, 'x' );
	
	//console.log( input, format, momentData, new Date( input ) );
	
	return momentData.tz( 'Africa/Abidjan' ).format( format );
};

const diffDateTimeLocalized = ( dFrom, dTo, withDay = true ) => {
	const momentFrom = moment( dFrom, 'x' );
	const momentTo   = moment( dTo, 'x' );
	const diff       = momentTo.diff( momentFrom );
	const format     = (withDay)
		? 'DD[d] HH[h] mm[m]'
		: 'HH[h] mm[m]';
	
	return moment
		.utc( diff )
		.tz( 'Africa/Abidjan' )
		.format( format );
};

const sleep = milliseconds => {
	const date      = Date.now();
	let currentDate = null;
	do {
		currentDate = Date.now();
	} while ( currentDate - date < milliseconds );
};

export default {
	basePathHost,
	version,
	isOnDevEnvironment,
	useFakeData,
	flag,
	numberDigit,
	jsonReadable,
	dateTimeLocalized,
	diffDateTimeLocalized,
	sleep,
	formatConstants: {
		DATE_FORMAT_NONE,
		DATE_FORMAT_SHORT,
		DATE_FORMAT_LONG,
		DATE_FORMAT_FULL,
		TIME_FORMAT_NONE,
		TIME_FORMAT_SHORT,
		TIME_FORMAT_FULL
	}
};
