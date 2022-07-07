import App from '@/App.vue';
import AppPlugin from '@/plugins/app.plugin';
import store from '@/store';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { BootstrapVue } from 'bootstrap-vue';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import Vue from 'vue';
import VueClipboard from 'vue-clipboard2';
import VueInsomnia from 'vue-insomnia';

Vue.use(BootstrapVue);
Vue.use(VueClipboard);
Vue.use(VueInsomnia);
Vue.use(AppPlugin);

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
  store
}).$mount('#app');
