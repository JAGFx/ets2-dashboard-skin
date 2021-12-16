/**
 * @author:	Emmanuel SMITH <hey@emmanuel-smith.me>
 * project:	ets2-dashboard-skin
 * file: 	server.utils.js
 * Date: 	16/11/2021
 * Time: 	20:39
 */

import bodyParser                                    from 'body-parser';
import fs                                            from 'fs';
import path                                          from 'path';
import cors                                          from 'cors';
import { gameConfig, saveAppConfig, saveGameConfig } from './config.js';
import store, { app, isDevelopment, server, socket } from './store.js';
import { telemetryInterval }                         from './telemetry.js';


const postConfigRequest = ( req, res, basePath = null ) => {
	saveAppConfig( req.body.app, basePath );
	saveGameConfig( req.params.target, req.body.game, basePath );
	
	store.set( 'config', {
		app:  req.body.app ,
		game: req.body.game
	} )
	res.send( req.body );
}

const getConfigRequest = ( req, res ) => {
	res.send( store.get('config') );
}

export const initApp = () => {
	app.use( bodyParser.json() );
	app.use(cors())
}

export const initConfig = ( basePath = null) => {
	app.post( '/config/:target', ( req, res) => {
		postConfigRequest( req, res, basePath )
	}  );
	app.get( '/config', getConfigRequest);
	const config = store.get('config.app');
	const port  = (config.hasOwnProperty('general_port'))
		? parseInt(config.general_port)
		: 3000;
	
	store.set('port', port);
}

export const initSocket = () => {
	socket.on( 'connection', socket => {
		console.log( 'Connection: ' + socket.id );
		
		if( isDevelopment() ){
			const dataFileName = path.resolve( process.cwd(), '../../src/data/scs_sdk_plugin_parsed_data.json' );
			const data = JSON.parse(fs.readFileSync( dataFileName ).toString());
			let lastGameName = null;
			
			setInterval( () => {
				socket.emit( 'update', data)
				const currentGameName = data.game.game.name;
				
				if( currentGameName !== lastGameName ){
					const config =  JSON.parse( gameConfig( currentGameName ) );
					store.set( 'config.game', config);
				}
				
				lastGameName = currentGameName;
			//}, 1000 );
			}, telemetryInterval() );
		}
	} );
}

export const initServer = () => {
	const port = store.get('port')
	
	server.listen( port, () => {
		const url  = `localhost:${ port }`;
		const data = {
			url:  url,
			port: port
		};
		
		console.log( 'server.listen', data, `Euro Truck Simulator 2 dashboard is running at http://${ url }/` );
	} );
}

export default {};