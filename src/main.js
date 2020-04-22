import Vue         from 'vue';
import VueSocketIO from 'vue-socket.io';
import App       from './App.vue';

window.$          = require( 'jquery' );
window.JQuery     = require( 'jquery' );
window.NoSleep    = require( 'nosleep.js' );
window.animateCss = require( 'animate.css' );

Vue.use( new VueSocketIO( {
	debug:      false,
	connection: 'http://' + window.location.hostname + ':3000'
} ) );

Vue.config.productionTip = false;

new Vue( {
	render: h => h( App )
} ).$mount( '#app' );
