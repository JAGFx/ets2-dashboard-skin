import App from '@/App.vue';
import AppPlugin from '@/plugins/app.plugin';
import store from '@/store';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Vue from 'vue';
import VueClipboard from 'vue-clipboard2';
import VueInsomnia from 'vue-insomnia';

Vue.use(VueClipboard);
Vue.use(VueInsomnia);
Vue.use(AppPlugin);

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
  store
}).$mount('#app');
