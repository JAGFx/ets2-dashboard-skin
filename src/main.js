import Vue         from 'vue';
import VueSocketIO from 'vue-socket.io';
import App         from './App.vue';
import store       from './store';

window.$           = require( 'jquery' );
window.JQuery      = require( 'jquery' );
window.NoSleep     = require( 'nosleep.js' );
window.animateCss  = require( 'animate.css' );
window.fontawesome = require( '@fortawesome/fontawesome-free/css/all.min.css' );

Vue.use( new VueSocketIO( {
	debug:      false,
	connection: 'http://' + window.location.hostname + ':3000'
} ) );

Vue.config.productionTip = false;

new Vue( {
	render: h => h( App ),
	store
} ).$mount( '#app' );
