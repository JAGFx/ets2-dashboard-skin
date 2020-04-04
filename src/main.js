import Vue         from 'vue'
import VueSocketIO from 'vue-socket.io'
import App         from './App.vue'

window.$ = require('jquery');
window.JQuery = require('jquery');
window.NoSleep = require('nosleep.js');

Vue.use(new VueSocketIO({
    debug:      false,
    connection: "http://192.168.1.54:3000",
}))

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
}).$mount("#app");
