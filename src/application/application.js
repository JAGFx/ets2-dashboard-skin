//import App          from "@/App.vue";
import App from '@/application/ApplicationNext.vue';
//import AppPlugin    from "@/plugins/app.plugin";
//import store        from "@/store";
import { library } from '@fortawesome/fontawesome-svg-core';
import { faEarthEurope } from '@fortawesome/free-solid-svg-icons';
import { faTwitter, faGithub } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
//import VueClipboard from "vue-clipboard2";
//import VueInsomnia  from "vue-insomnia";
import { createApp } from 'vue';
//import { createPinia } from 'pinia'
import AppPlugin from '@/application/plugin.js';

library.add(faEarthEurope);
library.add(faTwitter);
library.add(faGithub);

//Vue.use(VueClipboard);
//Vue.use(VueInsomnia);
//Vue.use(AppPlugin);
//
//new Vue({
//  render: (h) => h(App),
//  store
//}).$mount('#app');

createApp(App)
  .component('font-awesome-icon', FontAwesomeIcon)
  //.use(createPinia())
  //.use(store)
  //.use(VueClipboard)
  //.use(VueInsomnia)
  .use(AppPlugin)
  .mount('#app');
