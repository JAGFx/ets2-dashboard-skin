//import App          from "@/App.vue";
//import AppPlugin    from "@/plugins/app.plugin";
//import store        from "@/store";
//import { createPinia } from 'pinia'
import { library } from '@fortawesome/fontawesome-svg-core';
import { faGithub, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faAngleDown, faEarthEurope } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import 'bootstrap/js/src/dropdown.js';
//import VueClipboard from "vue-clipboard2";
import { createApp } from 'vue';
import Vue3TouchEvents from 'vue3-touch-events';

import TranslatorPlugin from '@/jagfx/module/translator/translator.plugin.js';
import App from '@/jagfx/shared/ApplicationNext.vue';

library.add(faEarthEurope);
library.add(faAngleDown);
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
  .use(TranslatorPlugin)
  .use(Vue3TouchEvents)
  .mount('#app');
