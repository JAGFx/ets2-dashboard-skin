<template>
  <div id="map-element" class="map-shared wrapper">
    <div v-if="!ready" class="loader w-100 h-100 d-flex justify-content-center flex-column align-items-center">
      <transition mode="out-in" name="slide-fade">
        <div class="d-flex justify-content-center align-items-center flex-column">
          <h1>
            <span class="mb-3" v-html="message.icon"></span>
          </h1>
          <h1 class="text-center">{{ message.text }}</h1>
          <small v-if="message.sub.length > 0" class="mb-3">{{ message.sub }}</small>
          <b-spinner v-show="message.processing" label="Processing..." type="grow"></b-spinner>
        </div>
      </transition>
    </div>
    <div id="map" class="w-100 h-100"></div>

    <!-- Speed limit -->
    <div v-if="$haveAnActiveSpeedLimit() && getConfig('maps_elements_speedLimit')  && showSpeedLimit" id="speed-limit" class="justify-content-center align-items-center">
      <span>{{ unit_speed( telemetry.navigation.speedLimit, true, false ) }}</span>
    </div>
    <!-- ./Speed limit -->

    <!-- Control map buttons -->
    <div v-if="getConfig('maps_elements_mapControls') && showControls" id="controls-wrapper" class="left h-100 flex-column justify-content-end">
      <button id="info-button" :class="{ disabled: !displayMapInfo }" @click="onClickMapInfo">
        <i class="fas fa-info"></i>
      </button>
      <button id="rotate-button" :class="{ disabled: !rotateWithPlayer }" @click="onClickRotate">
        <i class="icon-location_arrow"></i>
      </button>
      <button id="center-button" @click="onClickCenter">
        <i class="icon-target"></i>
      </button>
      <div id="ol-zoom-wrapper"></div>
    </div>
    <!-- ./Control map buttons -->

    <!-- Map info overlay -->
    <div id="mapInfoOverlay" v-if="displayMapInfo && showMapInfo">
      <h5>
        <span>Map Information</span>
        <i class="fas fa-times" @click="onClickMapInfo"></i>
      </h5>
      <hr>
      <table v-if="mapInfo() !== null && mapInfo().hasOwnProperty( 'game' )">
        <tr>
          <th>Game</th>
          <td>{{ mapInfo().game.name }}</td>
        </tr>
        <tr>
          <th>Version</th>
          <td>{{ mapInfo().game.version }}</td>
        </tr>
        <tr>
          <th>Date</th>
          <td>{{ mapInfo().game.generatedAt }}</td>
        </tr>
      </table>
      <div v-else>
        No data available
      </div>
    </div>
    <!-- ./Map info overlay -->

    <!-- Speed area-->
    <div v-if="getConfig('maps_elements_speedAndGear') && showSpeed" id="speed-area" class="top button">
      <div class="d-flex justify-content-center align-items-center bottom button">
        <div class="speed">
          <span class="value d-block">{{ unit_speed( telemetry.truck.speed, true, false ) | $toFixed( 0 ) }}</span>
          <!--        <small class="unit h-100">{{ unit_speed( telemetry.truck.speed, false ) }}</small>-->
        </div>

        <div :class="telemetry.truck.transmission.shifterType" class="truck-gear ml-2">
          {{ $trukGear( telemetry.truck.transmission, telemetry.truck.brand ) }}
        </div>
      </div>
    </div>
    <!-- ./Speed area -->

    <!-- Navigation ETA -->
    <div v-if="$haveAnActiveNavigation() && getConfig('maps_elements_eta') && showNavigationEta" class="eta-wrapper d-flex justify-content-end align-items-start flex-column">
      <!--      <span class="w-100 button">ETA:</span>-->
      <span class="button" v-if="getConfig('maps_map_navigationRemaining') === 'due_date'">
        <div class="round h-100">
					<i class="icon-time"></i>
				</div>
        <span class="w-100">{{ $etaDueDate() | $dateTimeLocalized( DATE_FORMAT_LONG, TIME_FORMAT_SHORT ) }}</span>
      </span>
      <span class="button" v-else>
        <div class="round h-100">
					<i class="icon-time"></i>
				</div>
        <span class="w-100">{{ $etaRemaing() }}</span>
      </span>
      <span class="button">
        <div class="round h-100">
					<i class="icon-ruler"></i>
				</div>
        <span class="w-100">{{ unit_length( telemetry.navigation.distance, 'm' ) }}</span>
      </span>
    </div>
    <!-- ./Navigation ETA -->
  </div>
</template>

<script>
import { EventBus }          from '@/event-bus';
import { app, history, map } from '@/utils/utils';
import { mapGetters }        from 'vuex';

export default {
  name:  'Map',
  props: {
    showSpeedLimit:    {
      type:    Boolean,
      default: true
    },
    showControls:      {
      type:    Boolean,
      default: true
    },
    showMapInfo:       {
      type:    Boolean,
      default: true
    },
    showSpeed:         {
      type:    Boolean,
      default: true
    },
    showNavigationEta: {
      type:    Boolean,
      default: true
    }
  },
  data() {
    return {
      displayMapInfo:   false,
      rotateWithPlayer: map.d.gBehaviorRotateWithPlayer,
      ready:            false,
      message:          {
        icon:       '<i class="fas fa-map-marked-alt"></i>',
        text:       'Map initialiation',
        sub:        '',
        processing: true
      }
    };
  },
  mounted() {
    map.init( this.telemetry.game.game.name )
       .then( () => {
           EventBus.$on( 'tmp-update', dataIn => {
             map.updatePlayerPositionAndRotation(
                 dataIn.truck.position.X,
                 dataIn.truck.position.Z,
                 dataIn.truck.orientation.heading,
                 dataIn.truck.speed.kph );
           } );

           // --- Dev
         if ( app.isOnDevEnvironment )
           setTimeout( () => {
             map.updatePlayerPositionAndRotation(
                 this.telemetry.truck.position.X,
                 this.telemetry.truck.position.Z,
                 this.telemetry.truck.orientation.heading,
                 this.telemetry.truck.speed.kph );
           }, 1000 );
           // --- ./Dev

           this.ready = true;
         } )
       .catch( e => {
           this.message.icon       = '<i class="fas fa-times"></i>';
           this.message.text       = 'Unable to load map';
           this.message.sub        = e;
           this.message.processing = false;

           const errorMessage = e.message || e;

         this.$pushALog( `Unknown error: ${ errorMessage }`, history.HTY_ZONE.MAPS_INIT, history.HTY_LEVEL.ERROR );
         } );

  },
  methods:  {
    onClickMapInfo() {
      this.displayMapInfo = !this.displayMapInfo;
    },
    onClickRotate() {
      map.d.gBehaviorRotateWithPlayer = (map.d.gBehaviorCenterOnPlayer)
          ? !map.d.gBehaviorRotateWithPlayer
          : true;

      this.rotateWithPlayer = map.d.gBehaviorRotateWithPlayer;
    },
    onClickCenter() {
      map.d.gBehaviorCenterOnPlayer = !map.d.gBehaviorCenterOnPlayer;
    },
    mapInfo() {
      return map.d.config;
    }
  },
  computed: {
    ...mapGetters( {
      getConfig: 'config/get'
    } )
  }
};
</script>