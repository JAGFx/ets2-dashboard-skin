/**
 * @author:	Emmanuel SMITH <hey@emmanuel-smith.me>
 * project:	ets2-dashboard-skin
 * file: 	index.js
 * Date: 	02/05/2020
 * Time: 	09:24
 */

import app                    from "@/store/modules/_app";
import config                 from "@/store/modules/_config";
import dashboard              from "@/store/modules/_dashboard";
import debug                  from "@/store/modules/_debug";
import event                  from "@/store/modules/_event";
import i18n                   from "@/store/modules/_i18n";
import menu                   from "@/store/modules/_menu";
import skins                  from "@/store/modules/_skins";
import { isOnDevEnvironment } from "@/utils/_app";
import { createStore }        from "vuex";

//Vue.use(Vuex);


export default createStore({
  modules: {
    skins,
    config,
    menu,
    app,
    debug,
    event,
    i18n,
    dashboard
  },
  strict: import.meta.env.MODE.startsWith('dev')
})

//export default new Vuex.Store({
//  modules: {
//    skins,
//    config,
//    menu,
//    app,
//    debug,
//    event,
//    i18n,
//    dashboard
//  },
//  strict: isOnDevEnvironment
//});
