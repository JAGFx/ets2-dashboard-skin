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

export default {
	methods: {
		app_getBasePathHost : () => {
			return 'http://' + window.location.host + '/';
		},
		getVersion:           function () {
			return packageJson.version;
		},
		getFlag:              function ( countryName ) {
			let flag = undefined;
			
			if ( countryName.length !== 0 ) {
				const countryCode = countryList.getCode( countryName );
				flag              = emojiFlags.countryCode( countryCode );
			}
			
			//console.log( countryName, countryCode, flag, flag.emoji );
			
			return (flag !== undefined)
				? flag.emoji
				: '🏳️';
		}
	}
}
