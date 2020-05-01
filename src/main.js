import Vue         from 'vue';
import VueSocketIO from 'vue-socket.io';
import Vuex        from 'vuex';
import App         from './App.vue';

window.$           = require( 'jquery' );
window.JQuery      = require( 'jquery' );
window.NoSleep     = require( 'nosleep.js' );
window.animateCss  = require( 'animate.css' );
window.fontawesome = require( '@fortawesome/fontawesome-free/css/all.min.css' );

Vue.use( new VueSocketIO( {
	debug:      false,
	connection: 'http://' + window.location.hostname + ':3000'
} ) );
Vue.use( Vuex );

Vue.config.productionTip = false;

const store = new Vuex.Store( {
	state:     {
		currentSkin: null
	},
	mutations: {
		updateSkin( state, skin ) {
			state.currentSkin = skin;
		}
	}
} );

new Vue( {
	render: h => h( App ),
	store
} ).$mount( '#app' );
