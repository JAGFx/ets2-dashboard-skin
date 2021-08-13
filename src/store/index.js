/**
 * @author:	Emmanuel SMITH <hey@emmanuel-smith.me>
 * project:	ets2-dashboard-skin
 * file: 	index.js
 * Date: 	02/05/2020
 * Time: 	09:24
 */


import app    from '@/store/modules/_app';
import config from '@/store/modules/_config';
import menu   from '@/store/modules/_menu';
import skins  from '@/store/modules/_skins';
import telemetry  from '@/store/modules/_telemetry';
import Vue    from 'vue';
import Vuex   from 'vuex';

Vue.use( Vuex );

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store( {
	modules: {
		skins,
		config,
		menu,
		app,
		telemetry
	},
	strict:  debug
} );
