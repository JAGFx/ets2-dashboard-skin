import '@fortawesome/fontawesome-free/css/all.min.css';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import NoSleep                       from 'nosleep.js';
import Vue                           from 'vue';
import VueClipboard                  from 'vue-clipboard2';
import VueSocketIO                   from 'vue-socket.io';
import App                           from './App.vue';
import EventPlugin                   from './plugins/event.plugin';
import HistoryPlugin                 from './plugins/history.plugin';
import TelemetryPlugin               from './plugins/telemetry.plugin';
import store                         from './store';

//window.$      = require( 'jquery' );
//window.JQuery = require( 'jquery' );
//window.NoSleep = require( 'nosleep.js' );

Vue.prototype.$NoSleep = new NoSleep();

Vue.use( BootstrapVue );
Vue.use( IconsPlugin );
Vue.use( VueClipboard );
Vue.use( TelemetryPlugin );
Vue.use( EventPlugin );
Vue.use( HistoryPlugin );

Vue.use( new VueSocketIO( {
	debug:      false,
	connection: 'http://' + window.location.hostname + ':3000'
} ) );

Vue.config.productionTip = false;

new Vue( {
	render: h => h( App ),
	store
} ).$mount( '#app' );
