/**
 * @author:	Emmanuel SMITH <hey@emmanuel-smith.me>
 * project:	ets2-dashboard-skin
 * file: 	_maps.js
 * Date: 	18/12/2020
 * Time: 	21:38
 */

import _app                            from '@/utils/_app';
import _history                        from '@/utils/_history';
import axios                           from 'axios';
import { Feature }                     from 'ol';
import { defaults as defaultControls } from 'ol/control';
import Point                           from 'ol/geom/Point';
import Tile                            from 'ol/layer/Tile';
import VectorLayer                     from 'ol/layer/Vector';
import Map                             from 'ol/Map';
import Projection                      from 'ol/proj/Projection';
import VectorSource                    from 'ol/source/Vector';
import XYZ                             from 'ol/source/XYZ';
import { Icon, Style }                 from 'ol/style';
import View                            from 'ol/View';
import Vue                             from 'vue';
import store                           from '../store/index';

let d = {
	map:                       null,
	playerIcon:                null,
	playerFeature:             null,
	gBehaviorCenterOnPlayer:   true,
	gBehaviorRotateWithPlayer: true,
	gIgnoreViewChangeEvents:   false,
	ready:                     false,
	arrowRotate:               '',
	config:                    null,
	paths:                     {
		base:   '',
		tiles:  'Tiles/{z}/{x}/{y}.png',
		config: 'TileMapInfo.json'
	}
};

const ZOOM_DEFAULT = 8;

// ----

/**
 * TODO: Add verification for the min map version and the min map version allowed by the dash
 */

const initConfig = ( game ) => {
	const type               = store.getters[ 'config/get' ]( 'maps_map_type' );
	const tileRemoteLocation = store.getters[ 'config/get' ]( 'maps_map_tilesRemotePath' );
	const tilesVersion       = store.getters[ 'config/get' ]( 'maps_map_tilesVersion' );
	const activeMap          = store.getters[ 'config/get' ]( 'maps_map_activeMap' );
	const map                = (type === 'vanilla')
		? game
		: activeMap;
	const basePath           = `${ tileRemoteLocation }/${ map }/${ tilesVersion }/`;
	
	Vue.prototype.$pushALog( `Base path: ${ basePath } | Type: ${ type } | Tile version: ${ tilesVersion }`,
		_history.HTY_ZONE.MAPS_INIT );
	
	d.paths.base = basePath;
	
	return axios
		.get( d.paths.base + d.paths.config )
		.then( response => {
			//console.log( 'config', response.data );
			d.config = response.data;
			Vue.prototype.$pushALog( `Map config found`, _history.HTY_ZONE.MAPS_INIT );
			
			const tilesPath = d.paths.tiles.replace( /{[xyz]}/g, 0 );
			
			return axios
				.get( d.paths.base + tilesPath )
				.then( response => {
					Vue.prototype.$pushALog( `Tiles OK: ${ d.paths.base + tilesPath }`, _history.HTY_ZONE.MAPS_INIT );
					//console.log( 'tiles', response );
					//d.config = response.data;
					
					d.ready = true;
					
				}, err => {
					console.error( 'Cant get tiles', err );
					Vue.prototype.$pushALog( `Tiles NOT FOUND`, _history.HTY_ZONE.MAPS_INIT, _history.HTY_LEVEL.ERROR );
					throw 'Tiles NOT FOUND';
				} );
			
		}, err => {
			console.error( 'Cant get config', err );
			Vue.prototype.$pushALog( `Map config NOT FOUND`, _history.HTY_ZONE.MAPS_INIT, _history.HTY_LEVEL.ERROR );
			throw 'Map config NOT FOUND';
		} );
	
	//console.log( game, type, tilesLocation, basePath );
	//console.log( d.paths );
};

const initMap = () => {
	// --- [Debug] Mouse position
	//const mousePosition = new MousePosition( {
	//	coordinateFormat: createStringXY( 0 )
	//} );
	// --- ./[Debug] Mouse position
	
	// --- TsMap
	let projection = new Projection( {
		code:   'ZOOMIFY',
		units:  'pixels',
		extent: [
			d.config.map.x1,
			-d.config.map.y2,
			d.config.map.x2,
			-d.config.map.y1 // x1, -y2, x2, -y1 (reverse y direction)
		]
	} );
	// --- ./TsMap
	
	
	// Creating the map.
	let zoomInLabel = document.createElement( 'i' );
	zoomInLabel.classList.add( 'icon-zoom_in' );
	
	let zoomOutLabel = document.createElement( 'i' );
	zoomOutLabel.classList.add( 'icon-zoom_out' );
	
	d.map = new Map( {
		controls: defaultControls( {
			zoom:        true,
			zoomOptions: {
				zoomInLabel:  zoomInLabel,
				zoomOutLabel: zoomOutLabel,
				target:       'ol-zoom-wrapper'
			},
			rotate:      false
		} ),
		layers:   [
			getMapTilesLayer( projection ),
			getPlayerLayer()
		],
		target:   'map',
		view:     new View( {
			center:     [ 0, 0 ],
			zoom:       ZOOM_DEFAULT,
			minZoom:    d.config.map.minZoom,
			maxZoom:    d.config.map.maxZoom,
			projection: projection,
			extent:     projection.getExtent()
		} )
	} );
	
	// Detecting when the user interacts with the map.
	// https://stackoverflow.com/q/32868671/
	d.map.getView().on( [ 'change:center', 'change:rotation' ], function ( ev ) {
		if ( d.gIgnoreViewChangeEvents )
			return;
		
		// The user has moved or rotated the map.
		d.gBehaviorCenterOnPlayer = false;
	} );
};

const init = ( game ) => {
	return initConfig( game )
		.then( () => initMap() );
};

// ----

const getMapTilesLayer = ( projection ) => {
	return new Tile( {
		source: new XYZ( {
			projection: projection,
			url:        d.paths.base + d.paths.tiles
		} )
	} );
};

const getPlayerLayer = () => {
	// Adding a marker for the player position/rotation.
	d.playerIcon = new Icon( {
		anchor:         [ 0.5, 39 ],
		anchorXUnits:   'fraction',
		anchorYUnits:   'pixels',
		rotateWithView: true,
		src:            'https://github.com/meatlayer/ets2-mobile-route-advisor/raw/master/img/player_proportions.png'
	} );
	
	let playerIconStyle = new Style( {
		image: d.playerIcon
	} );
	d.playerFeature     = new Feature( {
		geometry: new Point( [ d.config.map.maxX / 2, d.config.map.maxY / 2 ] )
	} );
	// For some reason, we cannot pass the style in the constructor.
	d.playerFeature.setStyle( playerIconStyle );
	
	// Adding a layer for features overlaid on the map.
	let featureSource = new VectorSource( {
		features: [ d.playerFeature ],
		wrapX:    false
	} );
	return new VectorLayer( {
		source: featureSource
	} );
};

// ----

const updatePlayerPositionAndRotation = ( lon, lat, rot, speed ) => {
	
	if ( d.ready === null )
		return;
	
	let map_coords = gameCoordToPixels( lon, lat );
	let rad        = rot * Math.PI * 2;
	
	d.playerFeature.getGeometry().setCoordinates( map_coords );
	d.playerIcon.setRotation( -rad );
	
	d.gIgnoreViewChangeEvents = true;
	if ( d.gBehaviorCenterOnPlayer ) {
		
		if ( d.gBehaviorRotateWithPlayer ) {
			const height           = d.map.getSize()[ 1 ];
			const max_ahead_amount = height / 3.0 * d.map.getView().getResolution();
			const amount_ahead     = Math.max( -max_ahead_amount, Math.min( speed * 0.25, max_ahead_amount ) );
			const ahead_coords     = [
				map_coords[ 0 ] + Math.sin( -rad ) * amount_ahead,
				map_coords[ 1 ] + Math.cos( -rad ) * amount_ahead
			];
			
			speed = (speed).toFixed( 0 );
			
			//auto-zoom map by speed
			if ( _app.betweenFloat( speed, 15, 35 ) )
				d.map.getView().setZoom( 9 );
			
			else if ( _app.betweenFloat( speed, 51, 55 ) )
				d.map.getView().setZoom( 8 );
			
			else if ( _app.betweenFloat( speed, 61, 65 ) )
				d.map.getView().setZoom( 7 );
			
			else if ( _app.betweenFloat( speed, 81, 88 ) )
				d.map.getView().setZoom( 6 );
			
			
			d.map.getView().setCenter( ahead_coords );
			d.map.getView().setRotation( rad );
			
		} else {
			d.map.getView().setCenter( map_coords );
			d.map.getView().setRotation( 0 );
		}
	}
	d.gIgnoreViewChangeEvents = false;
};

const gameCoordToPixels = ( x, y ) => {
	if ( d.ready === null )
		return;
	
	return [ x, -y ];
};

export {
	d,
	init,
	updatePlayerPositionAndRotation,
	gameCoordToPixels
};

