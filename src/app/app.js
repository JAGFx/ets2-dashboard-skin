//import App          from "@/App.vue";
import App from "@/app/AppNext.vue";
//import AppPlugin    from "@/plugins/app.plugin";
//import store        from "@/store";
import "@fortawesome/fontawesome-free/css/all.min.css";
//import VueClipboard from "vue-clipboard2";
//import VueInsomnia  from "vue-insomnia";
import { createApp } from 'vue'
//import { createPinia } from 'pinia'
import AppPlugin from "@/app/app.plugin";

//Vue.use(VueClipboard);
//Vue.use(VueInsomnia);
//Vue.use(AppPlugin);
//
//new Vue({
//  render: (h) => h(App),
//  store
//}).$mount('#app');


const app = createApp(App)
  //.use(createPinia())
//.use(store)
//.use(VueClipboard)
//.use(VueInsomnia)
.use(AppPlugin)
.mount('#app')