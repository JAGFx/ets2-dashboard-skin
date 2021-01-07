/**
 * @author:	Emmanuel SMITH <hey@emmanuel-smith.me>
 * project:	ets2-dashboard-skin
 * file: 	_history.js
 * Date: 	23/10/2020
 * Time: 	13:37
 */

const HTY_EVENT = 'hty-event';

const HTY_ZONE      = {
	MAIN:        'Main',
	ZONE_GAME:   'Zone/Game',
	MENU:        'Menu',
	MENU_SKIN:   'Menu/Skin',
	MENU_CONFIG: 'Menu/Config',
	MAPS_INIT:   'Maps/Init',
	ERROR:       'Error'
};
const HTY_LEVEL     = {
	DEBUG:    'DEBUG',
	INFO:     'INFO',
	WARNING:  'WARNING',
	ERROR:    'ERROR',
	CRITICAL: 'CRITICAL'
};
const HTY_MAX_LINES = 20;

export default {
	HTY_EVENT,
	HTY_ZONE,
	HTY_LEVEL,
	HTY_MAX_LINES
};
