import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import Vue                           from 'vue';
import VueClipboard                  from 'vue-clipboard2';
import VueSocketIO                   from 'vue-socket.io';
import App                           from './App.vue';
import store           from './store';
import TelemetryPlugin from './plugins/telemetry.plugin';

import '@fortawesome/fontawesome-free/css/all.min.css';
import 'animate.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import 'bootstrap/dist/js/bootstrap.bundle';

window.$       = require( 'jquery' );
window.JQuery  = require( 'jquery' );
window.NoSleep = require( 'nosleep.js' );

Vue.use( BootstrapVue );
Vue.use( IconsPlugin );
Vue.use( VueClipboard );
Vue.use( TelemetryPlugin );

Vue.use( new VueSocketIO( {
	debug:      false,
	connection: 'http://' + window.location.hostname + ':3000',
	vuex:       {
		store,
		actionPrefix: 'SOCKET_'
	}
} ) );

Vue.config.productionTip = false;

new Vue( {
	render: h => h( App ),
	store
} ).$mount( '#app' );
