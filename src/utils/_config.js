/**
 * @author:	Emmanuel SMITH <hey@emmanuel-smith.me>
 * project:	ets2-dashboard-skin
 * file: 	_config.js
 * Date: 	08/04/2020
 * Time: 	17:50
 */

import axios    from 'axios';
import utilsApp from './_app';

export default {
	mixins: [ utilsApp ],
	methods: {
		getConfigData : function () {
			const path = this.getBasePathHost() + 'config.json';
			return axios.get( path )
				 .then( response => {
					 console.log( 'Plop', response.data );
					 return response.data;
				 } );
		}
	}
}
