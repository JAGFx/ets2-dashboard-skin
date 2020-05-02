/**
 * @author:	Emmanuel SMITH <hey@emmanuel-smith.me>
 * project:	ets2-dashboard-skin
 * file: 	index.js
 * Date: 	02/05/2020
 * Time: 	09:24
 */


import Vue  from 'vue';
import Vuex from 'vuex';

import skins     from './modules/skins';
import telemetry from './modules/telemetry';

Vue.use( Vuex );

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store( {
	modules: {
		skins,
		telemetry
	},
	strict:  debug
} );
