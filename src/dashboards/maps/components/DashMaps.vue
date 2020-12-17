<template>
  <Dashboard class="maps wrapper">
    <div id="map"></div>
  </Dashboard>
</template>

<script>
import ol        from 'openlayers';
import Dashboard from '../../../components/Elements/Dashboard';

const MAX_X = 131072;
const MAX_Y = 131072;

export default {
  name:       'DashMaps',
  components: {
    Dashboard
  },
  data() {
    return {
      map:           null,
      playerIcon:    null,
      playerFeature: null
    };
  },
  mounted() {
    let projection = new ol.proj.Projection( {
      // Any name here. I chose "Funbit" because we are using funbit's image coordinates.
      code:        'Funbit',
      units:       'pixels',
      extent:      [ 0, 0, MAX_X, MAX_Y ],
      worldExtent: [ 0, 0, MAX_X, MAX_Y ]
    } );
    ol.proj.addProjection( projection );

    // Adding a marker for the player position/rotation.
    this.playerIcon = new ol.style.Icon( {
      anchor:         [ 0.5, 39 ],
      scale:          .5,
      anchorXUnits:   'fraction',
      anchorYUnits:   'pixels',
      rotateWithView: true,
      src:            'https://github.com/meatlayer/ets2-mobile-route-advisor/raw/master/img/player_proportions.png'
    } );

    let playerIconStyle = new ol.style.Style( {
      image: this.playerIcon
    } );
    this.playerFeature  = new ol.Feature( {
      geometry: new ol.geom.Point( [ MAX_X / 2, MAX_Y / 2 ] )
    } );
    // For some reason, we cannot pass the style in the constructor.
    this.playerFeature.setStyle( playerIconStyle );

    // Adding a layer for features overlaid on the map.
    let featureSource = new ol.source.Vector( {
      features: [ this.playerFeature ],
      wrapX:    false
    } );
    let vectorLayer   = new ol.layer.Vector( {
      source: featureSource
    } );

    // Configuring the custom map tiles.
    let custom_tilegrid = new ol.tilegrid.TileGrid( {
      extent:      [ 0, 0, MAX_X, MAX_Y ],
      minZoom:     0,
      origin:      [ 0, MAX_Y ],
      tileSize:    [ 512, 512 ],
      resolutions: (function () {
        let r = [];
        for ( let z = 0; z <= 8; ++z ) {
          r[ z ] = Math.pow( 2, 8 - z );
        }
        return r;
      })()
    } );

    // Creating custom controls.
    /*let rotate_control = new ol.control.Control({
     element: document.getElementById('rotate-button-div')
     });
     let speed_limit_control = new ol.control.Control({
     element: document.getElementById('speed-limit')
     });
     let text_control = new ol.control.Control({
     element: document.getElementById('map-text')
     });*/

    // Creating the map.
    this.map = new ol.Map( {
      target:       'map',
      controls:     [
        // new ol.control.ZoomSlider(),
        // new ol.control.OverviewMap(),
        // new ol.control.Rotate(),
        // new ol.control.MousePosition(),  // DEBUG
        new ol.control.Zoom()
        //rotate_control,
        //speed_limit_control,
        //text_control
        // TODO: Set 'tipLabel' on both zoom and rotate controls to language-specific translations.
      ],
      interactions: ol.interaction.defaults().extend( [
        // Rotating by using two fingers is implemented in PinchRotate(), which is enabled by default.
        // With DragRotateAndZoom(), it is possible to use Shift+mouse-drag to rotate the map.
        // Without it, Shift+mouse-drag creates a rectangle to zoom to an area.
        new ol.interaction.DragRotateAndZoom()
      ] ),
      layers:       [
        this.getMapTilesLayer( projection, custom_tilegrid ),
        //getTextLayer(),
        // Debug layer below.
        // new ol.layer.Tile({
        //     extent: [0, 0, MAX_X, MAX_Y],
        //     source: new ol.source.TileDebug({
        //         projection: projection,
        //         tileGrid: custom_tilegrid,
        //         // tileGrid: ol.tilegrid.createXYZ({
        //         //  extent: [0, 0, MAX_X, MAX_Y],
        //         //  minZoom: 0,
        //         //  maxZoom: 7,
        //         //  tileSize: [256, 256]
        //         // }),
        //         wrapX: false
        //     })
        // }),
        vectorLayer
      ],
      view:         new ol.View( {
        projection: projection,
        extent:     [ 0, 0, MAX_X, MAX_Y ],
        //center: ol.proj.transform([37.41, 8.82], 'EPSG:4326', 'EPSG:3857'),
        center:     [ MAX_X / 2, MAX_Y / 2 ],
        minZoom:    2,
        maxZoom:    9,
        zoom:       5
      } )
    } );

    // Adding behavior to the custom button.
    //let rotate_button = document.getElementById( 'rotate-button' );
    //let rotate_arrow  = rotate_button.firstElementChild;
    //this.map.getView().on( 'change:rotation', function ( ev ) {
    //  rotate_arrow.style.transform = 'rotate(' + ev.target.getRotation() + 'rad)';
    //} );
    /*rotate_button.addEventListener('click', function(ev) {
     if (g_behavior_center_on_player) {
     g_behavior_rotate_with_player = ! g_behavior_rotate_with_player;
     } else {
     g_behavior_center_on_player = true;
     }
     });*/

    // Detecting when the user interacts with the map.
    // https://stackoverflow.com/q/32868671/
    /*this.map.getView().on(['change:center', 'change:rotation'], function(ev) {
     if (g_ignore_view_change_events) {
     return;
     }
     // The user has moved or rotated the map.
     g_behavior_center_on_player = false;
     // Not needed:
     // g_behavior_rotate_with_player = false;
     });*/

    // Debugging.
    // map.on('singleclick', function(evt) {
    //     let coordinate = evt.coordinate;
    //     console.log(coordinate);
    // });
    // map.getView().on('change:center', function(ev) {
    //   console.log(ev);
    // });
    // map.getView().on('change:rotation', function(ev) {
    //   console.log(ev);
    // });
  },
  methods:    {
    getMapTilesLayer( projection, tileGrid ) {
      return new ol.layer.Tile( {
        extent: [ 0, 0, MAX_X, MAX_Y ],
        source: new ol.source.XYZ( {
          projection: projection,
          url:        'https://github.com/meatlayer/ets2-mobile-route-advisor/raw/master/maps/ets2/tiles/{z}/{x}/{y}.png',
          tileSize:   [ 512, 512 ],
          // Using createXYZ() makes the vector layer (with the features) unaligned.
          // It also tries loading non-existent tiles.
          //
          // Using custom_tilegrid causes rescaling of all image tiles before drawing
          // (i.e. no image will be rendered at 1:1 pixels), But fixes all other issues.
          tileGrid:   tileGrid,
          // tileGrid: ol.tilegrid.createXYZ({
          //     extent: [0, 0, MAX_X, MAX_Y],
          //     minZoom: 0,
          //     maxZoom: 7,
          //     tileSize: [256, 256]
          // }),
          wrapX:      false,
          minZoom:    2,
          maxZoom:    9
        } )
      } );
    },
    updatePlayerPositionAndRotation( lon, lat, rot, speed ) {
      let map_coords = this.gameCoordToPixels( lon, lat );
      let rad        = rot * Math.PI * 2;

      this.playerFeature.getGeometry().setCoordinates( map_coords );
      this.playerIcon.setRotation( -rad );

      //let g_ignore_view_change_events = true;
      //if ( g_behavior_center_on_player ) {

      //if ( g_behavior_rotate_with_player ) {
      let height           = this.map.getSize()[ 1 ];
      let max_ahead_amount = height / 3.0 * this.map.getView().getResolution();

      //console.log(parseFloat((speed).toFixed(0)));
      //auto-zoom map by speed
      if ( parseFloat( (speed).toFixed( 0 ) ) >= 15 && parseFloat( (speed).toFixed( 0 ) ) <= 35 ) {
        this.map.getView().getZoom( this.map.getView().setZoom( 9 ) );
      } else if ( parseFloat( (speed).toFixed( 0 ) ) >= 51 && parseFloat( (speed).toFixed( 0 ) ) <= 55 ) {
        this.map.getView().getZoom( this.map.getView().setZoom( 8 ) );
      } else if ( parseFloat( (speed).toFixed( 0 ) ) >= 61 && parseFloat( (speed).toFixed( 0 ) ) <= 65 ) {
        this.map.getView().getZoom( this.map.getView().setZoom( 7 ) );
      } else if ( parseFloat( (speed).toFixed( 0 ) ) >= 81 && parseFloat( (speed).toFixed( 0 ) ) <= 88 ) {
        this.map.getView().getZoom( this.map.getView().setZoom( 6 ) );
      }

      let amount_ahead = speed * 0.25;
      amount_ahead     = Math.max( -max_ahead_amount, Math.min( amount_ahead, max_ahead_amount ) );

      let ahead_coords = [
        map_coords[ 0 ] + Math.sin( -rad ) * amount_ahead,
        map_coords[ 1 ] + Math.cos( -rad ) * amount_ahead
      ];
      this.map.getView().setCenter( ahead_coords );
      this.map.getView().setRotation( rad );
      //} else {
      //  this.map.getView().setCenter( map_coords );
      //  this.map.getView().setRotation( 0 );
      //}
      //}
      //g_ignore_view_change_events = false;
    },
    gameCoordToPixels( x, y ) {
      let r = [ x / 1.087326 + 57157, y / 1.087326 + 59287 ];

      // The United Kingdom of Great Britain and Northern Ireland
      if ( x < -31056.8 && y < -5832.867 ) {
        let r = [ x / 1.087326 + 57157, y / 1.087326 + 59287 ];
      }
      r[ 1 ] = MAX_Y - r[ 1 ];
      return r;
    }
  },
  sockets:    {
    update( data ) {
      this.updatePlayerPositionAndRotation(
          this.telemetry.truck.cabin.offset.position.X + 2000,
          this.telemetry.truck.cabin.offset.position.Y,
          this.telemetry.truck.cabin.offset.orientation.heading + 200,
          this.telemetry.truck.speed.kph );
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/maps";
</style>
