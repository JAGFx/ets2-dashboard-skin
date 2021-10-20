/**
 * @author:	Emmanuel SMITH <hey@emmanuel-smith.me>
 * project:	ets2-dashboard-skin
 * file: 	config.service.js
 * Date: 	18/10/2021
 * Time: 	19:48
 */

import { saveAppConfig, saveGameConfig, config } from '../utils/config.util';

const postConfigRequest = ( req, res, basePath = null ) => {
	saveAppConfig( req.body.app, basePath );
	saveGameConfig( req.params.target, req.body.game, basePath );
	
	config = {
		app:  req.body.app,
		game: req.body.game
	};
	res.send( req.body );
}

const getConfigRequest = ( req, res ) => {
	res.send( config );
}

export const initConfig = (app, basePath = null) => {
	app.post( '/config/:target', ( req, res) => {
		postConfigRequest( req, res, basePath )
	}  );
	app.get( '/config', getConfigRequest );
}