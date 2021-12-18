/**
 * @author:	Emmanuel SMITH <hey@emmanuel-smith.me>
 * project:	ets2-dashboard-skin
 * file: 	index.js
 * Date: 	16/11/2021
 * Time: 	20:18
 */


import { initApp, initConfig, initServer, initSocket } from 'ets2-dashboard-lib/server.js';
import path                                            from 'path';

const dirname = path.resolve();

process.env.NODE_ENV = 'development';
initApp()
	.then( () => initConfig( dirname ) )
	.then( initSocket )
	.then( initServer )
	.then( () => {
		console.log( 'Initialized' );
	} )
	.catch( error => {
		console.error( error.message || error );
	} )
