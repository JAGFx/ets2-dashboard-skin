/**
 * @author:	Emmanuel SMITH <hey@emmanuel-smith.me>
 * project:	ets2-dashboard-skin
 * file: 	config.js
 * Date: 	15/11/2021
 * Time: 	22:10
 */

import { existsSync, readFileSync, writeFileSync } from 'fs';
import path                                        from 'path';
//import {Store} from 'data-store';

const oldConfigPath     = (basePath = null) => path.resolve( basePath ?? process.cwd(), './config.ets2-dashboard-skin.json' );

//const store = new Store({ path: process.cwd() + '/config.json' })

//export const init = () => {
//	console.log( process.cwd() + '/config.json' );
//	store.set('toto', true);
	//store.save();
//}

export const appConfigPath = (basePath = null) => {
	const newAppConfigPath  = path.resolve( basePath ?? process.cwd(), `./config.json` );
	
	return ( existsSync( newAppConfigPath ) )
		? newAppConfigPath
		: oldConfigPath(basePath)
}

export const gameConfigPath = (target, basePath = null) => {
	const newGameConfigPath = path.resolve( basePath ?? process.cwd(), `./config.${ target }.json` );
	
	return ( existsSync( newGameConfigPath ) )
		? newGameConfigPath
		: oldConfigPath(basePath)
}

export const appConfig = (basePath = null) =>  readFileSync( appConfigPath(basePath), 'UTF-8' );

export const gameConfig = (target, basePath = null) =>  readFileSync( gameConfigPath(target, basePath), 'UTF-8' );

export const saveAppConfig = (data, basePath = null) => {
	writeFileSync( appConfigPath(basePath), JSON.stringify( data, null, 2 ) );
}

export const saveGameConfig = (target, data, basePath = null) => {
	writeFileSync( gameConfigPath(target, basePath), JSON.stringify( data, null, 2 ) );
}
