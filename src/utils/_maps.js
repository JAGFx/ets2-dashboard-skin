/**
 * @author:	Emmanuel SMITH <hey@emmanuel-smith.me>
 * project:	ets2-dashboard-skin
 * file: 	_maps.js
 * Date: 	18/12/2020
 * Time: 	21:38
 */

import _history                        from '@/utils/_history';
import axios                           from 'axios';
import { Feature }                     from 'ol';
import { defaults as defaultControls } from 'ol/control';
import Point                           from 'ol/geom/Point';
import Tile                            from 'ol/layer/Tile';
import VectorLayer                     from 'ol/layer/Vector';
import Map                             from 'ol/Map';
import { addProjection }               from 'ol/proj';
import Projection                      from 'ol/proj/Projection';
import VectorSource                    from 'ol/source/Vector';
import XYZ                             from 'ol/source/XYZ';
import { Icon, Style }                 from 'ol/style';
import TileGrid                        from 'ol/tilegrid/TileGrid';
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
	const tilesLocation      = store.getters[ 'config/get' ]( 'maps_map_tilesLocation' );
	const activeMap          = store.getters[ 'config/get' ]( 'maps_map_activeMap' );
	const map                = (type === 'vanilla')
		? game
		: activeMap;
	const basePath           = (tilesLocation === 'remote')
		? `${ tileRemoteLocation }/${ map }/`
		: `http://${ window.location.hostname }:3000/maps/${ map }/`;
	
	Vue.prototype.$pushALog( `Base path: ${ basePath } | Type: ${ type } | Tile location: ${ tilesLocation }`,
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
	// TODO: Add minimal data for map on TileMapInfo.json
	
	let projection = new Projection( {
		// Any name here. I chose "Funbit" because we are using funbit's image coordinates.
		code:        'Funbit',
		units:       'pixels',
		extent:      [ 0, 0, d.config.map.maxX, d.config.map.maxY ],
		worldExtent: [ 0, 0, d.config.map.maxX, d.config.map.maxY ]
	} );
	addProjection( projection );
	
	// Adding a marker for the player position/rotation.
	d.playerIcon = new Icon( {
		anchor:         [ 0.5, 39 ],
		scale:          .7,
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
	let vectorLayer   = new VectorLayer( {
		source: featureSource
	} );
	
	// Configuring the custom map tiles.
	let custom_tilegrid = new TileGrid( {
		extent:  [ 0, 0, d.config.map.maxX, d.config.map.maxY ],
		minZoom: d.config.map.minZoom,
		origin:  [ 0, d.config.map.maxY ],
		//tileSize: [ 512, 512 ],
		tileSize:    d.config.map.tileSize,//[ 512, 512 ],
		resolutions: (function () {
			let r = [];
			for ( let z = 0; z <= d.config.map.maxZoom; ++z ) {
				r[ z ] = Math.pow( 2, d.config.map.maxZoom - z );
			}
			return r;
		})()
	} );
	
	// Creating the map.
	d.map = new Map( {
		controls: defaultControls( {
			zoom:        true,
			zoomOptions: {
				className:    'ol-zoom',
				zoomInLabel:  '<i class="fas fa-search-plus"></i>',
				zoomOutLabel: '<i class="fas fa-search-minus"></i>',
				target:       'ol-zoom-wrapper'
			},
			rotate:      false
		} ),
		layers:   [
			getMapTilesLayer( projection, custom_tilegrid ),
			vectorLayer
		],
		target:   'map',
		view:     new View( {
			projection: projection,
			extent:     [ 0, 0, d.config.map.maxX, d.config.map.maxY ],
			//center: ol.proj.transform([37.41, 8.82], 'EPSG:4326', 'EPSG:3857'),
			center:  [ d.config.map.maxX / 2, d.config.map.maxY / 2 ],
			minZoom: d.config.map.minZoom,
			maxZoom: d.config.map.maxZoom + 1,
			zoom:    ZOOM_DEFAULT
		} )
	} );
	
	// Detecting when the user interacts with the map.
	// https://stackoverflow.com/q/32868671/
	d.map.getView().on( [ 'change:center', 'change:rotation' ], function ( ev ) {
		//console.log( 'Hola', d.gIgnoreViewChangeEvents );
		
		if ( d.gIgnoreViewChangeEvents ) {
			return;
		}
		// The user has moved or rotated the map.
		d.gBehaviorCenterOnPlayer = false;
		// Not needed:
		// g_behavior_rotate_with_player = false;
	} );
	
	// Debugging.
	//d.map.getView().on('singleclick', function(evt) {
	//	let coordinate = evt.coordinate;
	//	console.log(coordinate);
	//});
	// map.getView().on('change:center', function(ev) {
	//   console.log(ev);
	// });
	// map.getView().on('change:rotation', function(ev) {
	//   console.log(ev);
	// });
};

const init = ( game ) => {
	return initConfig( game )
		.then( () => initMap() );
};

const getAvailableMap = () => {
	// TODO Get list from a server
	
	if ( process.env.VUE_APP_USE_FAKE_DATA === 'true' )
		return new Promise( resolve => {
			setTimeout( () => {
				//store.dispatch( 'app/endProcessing' );
				resolve( [
					{
						'map':           {
							'maxX':     140526.531,
							'maxY':     142717.859,
							'tileSize': 256,
							'minZoom':  0,
							'maxZoom':  6
						},
						'transposition': {
							'x': {
								'factor': 1.087326,
								'offset': 57157
							},
							'y': {
								'factor': 1.087326,
								'offset': 59287
							}
						},
						'game':          {
							'version':     '1.40.3.3',
							'generatedAt': '2021-04-16T18:31:37.8729669+02:00'
						}
					},
					{
						id:          'ats',
						name:        'ATS base map',
						game:        'ats',
						x1:          -62252.0547,
						x2:          80465.8,
						y1:          -64572.1328,
						y2:          78145.72,
						minZoom:     0,
						maxZoom:     8,
						gameVersion: '1.40.2.0',
						generatedAt: '2021-04-08T19:29:11.4191534+02:00'
					}
				] );
			}, 1000 );
		} );
};

// ----

const getMapTilesLayer = ( projection, tileGrid ) => {
	return new Tile( {
		extent: [ 0, 0, d.config.map.maxX, d.config.map.maxY ],
		source: new XYZ( {
			projection: projection,
			// 'https://github.com/meatlayer/ets2-mobile-route-advisor/raw/master/maps/ets2/tiles/{z}/{x}/{y}.png',
			url:      d.paths.base + d.paths.tiles,
			tileSize: d.config.map.tileSize,
			tileGrid: tileGrid,
			wrapX:    false,
			minZoom:  d.config.map.minZoom,
			maxZoom:  d.config.map.maxZoom + 1
		} )
	} );
};

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
			let height           = d.map.getSize()[ 1 ];
			let max_ahead_amount = height / 3.0 * d.map.getView().getResolution();
			
			//auto-zoom map by speed
			if ( parseFloat( (speed).toFixed( 0 ) ) >= 15 && parseFloat( (speed).toFixed( 0 ) ) <= 35 ) {
				d.map.getView().getZoom( d.map.getView().setZoom( 9 ) );
			} else if ( parseFloat( (speed).toFixed( 0 ) ) >= 51 && parseFloat( (speed).toFixed( 0 ) ) <= 55 ) {
				d.map.getView().getZoom( d.map.getView().setZoom( 8 ) );
			} else if ( parseFloat( (speed).toFixed( 0 ) ) >= 61 && parseFloat( (speed).toFixed( 0 ) ) <= 65 ) {
				d.map.getView().getZoom( d.map.getView().setZoom( 7 ) );
			} else if ( parseFloat( (speed).toFixed( 0 ) ) >= 81 && parseFloat( (speed).toFixed( 0 ) ) <= 88 ) {
				d.map.getView().getZoom( d.map.getView().setZoom( 6 ) );
			}
			
			let amount_ahead = speed * 0.25;
			amount_ahead     = Math.max( -max_ahead_amount, Math.min( amount_ahead, max_ahead_amount ) );
			
			let ahead_coords = [
				map_coords[ 0 ] + Math.sin( -rad ) * amount_ahead,
				map_coords[ 1 ] + Math.cos( -rad ) * amount_ahead
			];
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
	
	let r = [ x / d.config.transposition.x.factor + d.config.transposition.x.offset,
			  y / d.config.transposition.y.factor + d.config.transposition.y.offset ];
	
	// The United Kingdom of Great Britain and Northern Ireland
	//if ( x < -31056.8 && y < -5832.867 ) {
	//	let r = [ x / 1.087326 + 57157, y / 1.087326 + 59287 ];
	//}
	r[ 1 ] = d.config.map.maxY - r[ 1 ];
	return r;
};

export default {
	d,
	init,
	getMapTilesLayer,
	updatePlayerPositionAndRotation,
	gameCoordToPixels,
	getAvailableMap
};

