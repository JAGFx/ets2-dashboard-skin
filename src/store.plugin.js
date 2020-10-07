/**
 * @author:	Emmanuel SMITH <emmanuel.smith@live-session.fr>
 * project:	customDefault
 * file: 	index.plugin.js
 * Date: 	07-Oct-20
 * Time: 	19:10
 */

import store from './store';

export default {
	store,
	install( Vue, options ) {
		Vue.prototype.$storePlug = store;
	}
};
