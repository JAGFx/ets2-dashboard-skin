/**
 * @author:	Emmanuel SMITH <hey@emmanuel-smith.me>
 * project:	ets2-dashboard-skin
 * file: 	_maps.js
 * Date: 	18/12/2020
 * Time: 	21:38
 */

import store from '@/store/index';
import { store as telemetryStore } from '@/store/telemetry.store';
import { app, history, map } from '@/utils/utils';
import axios from 'axios';
import { Feature } from 'ol';
import { defaults as defaultControls } from 'ol/control';
import Point from 'ol/geom/Point';
import Tile from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import Map from 'ol/Map';
import Projection from 'ol/proj/Projection';
import VectorSource from 'ol/source/Vector';
import XYZ from 'ol/source/XYZ';
import { Icon, Style } from 'ol/style';
import View from 'ol/View';
import Vue from 'vue';

let d = {
  map: null,
  playerIcon: null,
  playerFeature: null,
  gBehaviorCenterOnPlayer: true,
  gBehaviorRotateWithPlayer: true,
  gIgnoreViewChangeEvents: false,
  ready: false,
  arrowRotate: '',
  config: null,
  paths: {
    base: '',
    tiles: 'Tiles/{z}/{x}/{y}.png',
    config: 'TileMapInfo.json'
  },
  lastPos: {
    x: null,
    y: null
  }
};

const ZOOM_DEFAULT = 8;

// ----

/**
 * TODO: Add verification for the min map version and the min map version allowed by the dash
 */

const basePath = (game) => {
  const type = store.getters['config/get']('maps_map_type');
  const activeMap = store.getters['config/get']('maps_map_activeMap');
  const tileRemoteLocation = store.getters['config/get'](
    'maps_map_tilesRemotePath'
  );
  const tilesVersion = store.getters['config/get']('maps_map_tilesVersion');
  const tilesRemoteUseCustom = store.getters['config/enabled'](
    'maps_map_tilesRemoteUseCustom'
  );
  const tilesRemoteCustomPath = store.getters['config/get'](
    'maps_map_tilesRemoteCustomPath'
  );
  let path;

  if (tilesRemoteUseCustom) {
    path = `${tilesRemoteCustomPath}/`;
  } else {
    const map = type === 'vanilla' ? game : activeMap;
    path = `${tileRemoteLocation}/${map}/${tilesVersion}/`;
  }

  Vue.prototype.$pushALog(
    `Base path: ${path} | Type: ${type} | Tile version: ${tilesVersion} | Custom tiles host: ${tilesRemoteUseCustom}`,
    history.HTY_ZONE.MAPS_INIT
  );

  return `${path}`;
};

const initConfig = (game) => {
  const rotateWithPlayer = store.getters['config/get'](
    'maps_elements_rotateWithPlayer'
  );

  d.paths.base = basePath(game);

  return axios.get(d.paths.base + d.paths.config).then(
    (response) => {
      d.config = response.data;
      Vue.prototype.$pushALog(`Map config found`, history.HTY_ZONE.MAPS_INIT);

      const tilesPath = d.paths.tiles.replace(/{[xyz]}/g, 0);

      return axios.get(d.paths.base + tilesPath).then(
        () => {
          Vue.prototype.$pushALog(
            `Tiles OK: ${d.paths.base + tilesPath}`,
            history.HTY_ZONE.MAPS_INIT
          );
          d.gBehaviorRotateWithPlayer = rotateWithPlayer;
        },
        () => {
          Vue.prototype.$pushALog(
            `Tiles NOT FOUND`,
            history.HTY_ZONE.MAPS_INIT,
            history.HTY_LEVEL.ERROR
          );
          throw new Error('Cant get tiles - Tiles NOT FOUND');
        }
      );
    },
    () => {
      Vue.prototype.$pushALog(
        `Map config NOT FOUND`,
        history.HTY_ZONE.MAPS_INIT,
        history.HTY_LEVEL.ERROR
      );
      throw new Error('Cant get config - Map config NOT FOUND');
    }
  );
};

const initMap = () => {
  // --- [Debug] Mouse position
  //const mousePosition = new MousePosition( {
  //	coordinateFormat: createStringXY( 0 )
  //} );
  // --- ./[Debug] Mouse position

  // --- TsMap
  let projection = new Projection({
    code: 'ZOOMIFY',
    units: 'pixels',
    extent: [
      d.config.map.x1,
      -d.config.map.y2,
      d.config.map.x2,
      -d.config.map.y1 // x1, -y2, x2, -y1 (reverse y direction)
    ]
  });
  // --- ./TsMap

  // Creating the map.
  let zoomInWrapper = document.createElement('div');
  zoomInWrapper.classList.add('round');
  zoomInWrapper.classList.add('px-2');
  zoomInWrapper.classList.add('py-0');
  let zoomInLabel = document.createElement('i');
  zoomInLabel.classList.add('icon-zoom_in');
  zoomInWrapper.append(zoomInLabel);

  let zoomOutWrapper = document.createElement('div');
  zoomOutWrapper.classList.add('round');
  zoomOutWrapper.classList.add('px-2');
  zoomOutWrapper.classList.add('py-0');
  let zoomOutLabel = document.createElement('i');
  zoomOutLabel.classList.add('icon-zoom_out');
  zoomOutWrapper.append(zoomOutLabel);

  d.map = new Map({
    controls: defaultControls({
      zoom: true,
      zoomOptions: {
        zoomInLabel: zoomInWrapper,
        zoomOutLabel: zoomOutWrapper,
        target: 'ol-zoom-wrapper'
      },
      rotate: false
    }),
    layers: [getMapTilesLayer(projection), getPlayerLayer()],
    target: 'map',
    view: new View({
      center: [0, 0],
      zoom: ZOOM_DEFAULT,
      minZoom: d.config.map.minZoom,
      maxZoom: d.config.map.maxZoom,
      projection: projection,
      extent: projection.getExtent()
    })
  });

  // Detecting when the user interacts with the map.
  // https://stackoverflow.com/q/32868671/
  d.map.getView().on(['change:center', 'change:rotation'], function () {
    if (d.gIgnoreViewChangeEvents) return;

    // The user has moved or rotated the map.
    d.gBehaviorCenterOnPlayer = false;
  });
};

const init = (game) => {
  return initConfig(game)
    .then(() => initMap())
    .then(() => (d.ready = true))
    .then(() => {
      map.updatePlayerPositionAndRotation(
        telemetryStore.telemetry.truck.position.X,
        telemetryStore.telemetry.truck.position.Z,
        telemetryStore.telemetry.truck.orientation.heading,
        telemetryStore.telemetry.truck.speed.kph
      );
    });
};

// ----

const getMapTilesLayer = (projection) => {
  return new Tile({
    source: new XYZ({
      projection: projection,
      url: d.paths.base + d.paths.tiles
    })
  });
};

const getPlayerLayer = () => {
  // Adding a marker for the player position/rotation.
  d.playerIcon = new Icon({
    anchor: [0.5, 39],
    anchorXUnits: 'fraction',
    anchorYUnits: 'pixels',
    rotateWithView: true,
    src: 'https://github.com/meatlayer/ets2-mobile-route-advisor/raw/master/img/player_proportions.png'
  });

  let playerIconStyle = new Style({
    image: d.playerIcon
  });
  d.playerFeature = new Feature({
    geometry: new Point([d.config.map.maxX / 2, d.config.map.maxY / 2])
  });
  // For some reason, we cannot pass the style in the constructor.
  d.playerFeature.setStyle(playerIconStyle);

  // Adding a layer for features overlaid on the map.
  let featureSource = new VectorSource({
    features: [d.playerFeature],
    wrapX: false
  });
  return new VectorLayer({
    source: featureSource
  });
};

// ----

const updatePlayerPositionAndRotation = (lon, lat, rot, speed) => {
  if (d.ready !== true) return;

  lon = lon.toFixed(3);
  lat = lat.toFixed(3);
  rot = rot.toFixed(5);
  speed = speed.toFixed(0);

  if (d.lastPos.x === lon || d.lastPos.y === lat) return;

  d.lastPos = {
    x: lon,
    y: lat
  };

  let map_coords = gameCoordToPixels(lon, lat);
  let rad = rot * Math.PI * 2;

  d.playerFeature.getGeometry().setCoordinates(map_coords);
  d.playerIcon.setRotation(-rad);

  d.gIgnoreViewChangeEvents = true;
  if (d.gBehaviorCenterOnPlayer) {
    if (d.gBehaviorRotateWithPlayer) {
      //auto-zoom map by speed
      if (app.betweenFloat(speed, 15, 35)) d.map.getView().setZoom(9);
      else if (app.betweenFloat(speed, 51, 55)) d.map.getView().setZoom(8);
      else if (app.betweenFloat(speed, 61, 65)) d.map.getView().setZoom(7);
      else if (app.betweenFloat(speed, 81, 88)) d.map.getView().setZoom(6);

      d.map.getView().setCenter(map_coords);
      d.map.getView().setRotation(rad);
    } else {
      d.map.getView().setCenter(map_coords);
      d.map.getView().setRotation(0);
    }
  }
  d.gIgnoreViewChangeEvents = false;
};

const gameCoordToPixels = (x, y) => {
  if (d.ready === null) return;

  return [x, -y];
};

export { d, init, updatePlayerPositionAndRotation, gameCoordToPixels };
