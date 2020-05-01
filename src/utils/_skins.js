/**
 * @author:	Emmanuel SMITH <hey@emmanuel-smith.me>
 * project:	ets2-dashboard-skin
 * file: 	_config.js
 * Date: 	08/04/2020
 * Time: 	17:50
 */

import skins from '../data/skins.json';

const all = skins.skins;

const actives = all.filter( skin => !skin.disabled );

export default {
	actives,
	all
};
