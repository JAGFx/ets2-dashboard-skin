<template>
  <div
    id="map-element"
    class="map-shared wrapper"
  >
    <div
      v-if="!ready"
      class="loader w-100 h-100 d-flex justify-content-center flex-column align-items-center"
    >
      <transition
        mode="out-in"
        name="slide-fade"
      >
        <div class="d-flex justify-content-center align-items-center flex-column">
          <h1>
            <span
              class="mb-3"
              v-html="message.icon"
            />
          </h1>
          <h1 class="text-center">
            {{ $t(message.text) }}
          </h1>
          <small
            v-if="message.sub.length > 0"
            class="mb-3"
          >{{ message.sub }}</small>
          <b-spinner
            v-show="message.processing"
            label="Processing..."
            type="grow"
          />
        </div>
      </transition>
    </div>
    <div
      id="map"
      class="w-100 h-100"
    />

    <div
      class="barControls"
      :class="{'embedded': embedded }"
    >
      <div
        class="barZone justify-content-end"
        :class="{'embedded': embedded }"
      >
        <div
          v-if="!embedded"
          class="barButton mr-auto h-100 menuRoute"
          :class="{ disabled: !$haveAnActiveNavigation() || !displayNavigationInfo, active: $haveAnActiveNavigation() && displayNavigationInfo }"
          @click="displayNavigationInfo = !displayNavigationInfo"
        >
          <div class="round px-2 py-0">
            <i class="icon-route" />
          </div>
        </div>
        <div class="barButton disabled w-100 h-100" />
        <div
          class="barButton m-0 flex-row-reverse h-100 cruise-control"
          :class="{
            'green' : telemetry.truck.cruiseControl.enabled,
            'disabled' : !telemetry.truck.cruiseControl.enabled
          }"
        >
          <div class="round px-2 py-0">
            <i class="icon-cruise_control" />
          </div>
          <span
            v-if="!telemetry.truck.cruiseControl.enabled"
            class="pl-2"
          >{{ $t('OFF') }}</span>
          <span
            v-else
            class="pl-2"
          >{{ unit_speed( telemetry.truck.cruiseControl ) }}</span>
        </div>
      </div>
      <div
        v-if="!embedded"
        class="barZone spacer"
      />
      <div
        v-if="!embedded"
        id="speed-area"
      >
        <div class="d-flex justify-content-center align-items-center bottom button">
          <div class="speed">
            <span class="value d-block">{{ unit_speed( telemetry.truck.speed, true, false ) | $toFixed( 0 ) }}</span>
          </div>

          <div
            :class="telemetry.truck.transmission.shifterType"
            class="truck-gears ml-2"
          >
            {{ $trukGear( telemetry.truck.transmission, telemetry.truck.brand ) }}
          </div>
        </div>
      </div>
      <div class="barZone justify-content-start">
        <div
          v-if="!embedded"
          class="barButton m-0 blue h-100 fuel"
          :class="{
            'orange': telemetry.truck.fuel.warning.enabled
          }"
        >
          <div class="round px-2 py-0">
            <i class="icon-fuel" />
          </div>
          <span class="pr-2">{{ unit_volume( telemetry.truck.fuel.value ) }}</span>
        </div>
        <div class="barButton disabled w-100 h-100" />
        <div
          class="barButton ml-auto h-100 menuControl"
          :class="{ disabled: !displayControls, active: displayControls }"
          @click="displayControls = !displayControls"
        >
          <div class="round px-2 py-0">
            <i class="icon-menu" />
          </div>
        </div>
      </div>
    </div>

    <!-- Speed limit -->
    <div
      v-if="$haveAnActiveSpeedLimit() && configEnabled('maps_elements_speedLimit') && !embedded"
      id="speed-limit"
      class="justify-content-center align-items-center"
    >
      <span>{{ unit_speed( telemetry.navigation.speedLimit, true, false ) }}</span>
    </div>
    <!-- ./Speed limit -->

    <!-- Control map buttons -->
    <div
      v-show="displayControls"
      id="controls-wrapper"
      class="left h-100 flex-column justify-content-end"
    >
      <div
        class="button w-100"
        :class="{ disabled: !displayMapInfo, active: displayMapInfo }"
        @click="onClickMapInfo"
      >
        <div
          class="round px-2 py-0"
        >
          <i class="fa fa-info" />
        </div>
      </div>
      <div
        id="rotate-button"
        class="button w-100"
        :class="{ disabled: !rotateWithPlayer, active: rotateWithPlayer }"
        @click="onClickRotate"
      >
        <div class="round px-2 py-0">
          <i class="icon-location_arrow" />
        </div>
      </div>
      <div
        id="center-button"
        class="button w-100"
        @click="onClickCenter"
      >
        <span class="round px-2 py-0">
          <i class="icon-target" />
        </span>
      </div>
      <div id="ol-zoom-wrapper" />
    </div>
    <!-- ./Control map buttons -->

    <!-- Map info overlay -->
    <div
      v-if="displayMapInfo"
      id="mapInfoOverlay"
    >
      <h5>
        <span>{{ $t('Map Information') }}</span>
        <i
          class="fas fa-times"
          @click="onClickMapInfo"
        />
      </h5>
      <hr>
      <table v-if="mapInfo() !== null && mapInfo().hasOwnProperty( 'game' )">
        <tr>
          <th>{{ $t('Game') }}</th>
          <td>{{ mapInfo().game.name }}</td>
        </tr>
        <tr>
          <th>{{ $t('Version') }}</th>
          <td>{{ mapInfo().game.version }}</td>
        </tr>
        <tr>
          <th>{{ $t('Date') }}</th>
          <td>{{ mapInfo().game.generatedAt }}</td>
        </tr>
        <tr v-if="configEnabled('maps_general_debug')">
          <th>{{ $t('Pos') }}</th>
          <td>X: {{ telemetry.truck.position.X.toFixed( 3 ) }} | Y: {{ telemetry.truck.position.Y.toFixed( 3 ) }}</td>
        </tr>
        <tr v-if="configEnabled('maps_general_debug')">
          <th>{{ $t('Ready') }}</th>
          <td>{{ ready }}</td>
        </tr>
        <tr v-if="configEnabled('maps_general_debug')">
          <th>{{ $t('Last pos') }}</th>
          <td>{{ m.lastPos }}</td>
        </tr>
        <tr v-if="configEnabled('maps_general_debug')">
          <th>{{ $t('Map ready') }}</th>
          <td>{{ m.ready }}</td>
        </tr>
        <tr v-if="configEnabled('maps_general_debug')">
          <th>{{ $t('Tiles') }}</th>
          <td>{{ m.paths.base }}</td>
        </tr>
      </table>
      <div v-else>
        {{ $t('No data available') }}
      </div>
    </div>
    <!-- ./Map info overlay -->

    <!-- Navigation ETA -->
    <div
      v-if="$haveAnActiveNavigation() && displayNavigationInfo && !embedded"
      class="eta-wrapper d-flex justify-content-end align-items-start flex-column"
    >
      <div
        v-if="configEnabled('maps_map_navigationRemaining') === 'due_date'"
        class="button px-2 py-0 w-100 active"
      >
        <div class="round">
          <i class="icon-time" />
        </div>
        <span class="pl-2 w-100">{{ $etaDueDate() | $dateTimeLocalized( DATE_FORMAT_LONG, TIME_FORMAT_SHORT ) }}</span>
      </div>
      <div
        v-else
        class="button px-2 py-0 w-100 active"
      >
        <div class="round">
          <i class="icon-time" />
        </div>
        <span class="pl-2 w-100">{{ $etaRemaing() }}</span>
      </div>
      <span class="button px-2 py-0 w-100 active">
        <div class="round">
          <i class="icon-ruler" />
        </div>
        <span class="pl-2 w-100">{{ unit_length( telemetry.navigation.distance, 'm' ) }}</span>
      </span>
    </div>
    <!-- ./Navigation ETA -->
  </div>
</template>

<script>
import TelemetryMixin   from '@/mixins/TelemetryMixin';
import { history, map } from '@/utils/utils';
import { mapGetters }   from 'vuex';

export default {
  name:   'Map',
  mixins: [ TelemetryMixin ],
  props:  {
    embedded: {
      type:     Boolean,
      required: false,
      default() { return false; }
    }
  },
  data() {
    return {
      displayControls:       (this.embedded)
                                 ? false
                                 : this.$store.getters[ 'config/enabled' ]( 'maps_elements_mapControls' ),
      displayNavigationInfo: this.$store.getters[ 'config/enabled' ]( 'maps_elements_eta' ),
      displayMapInfo:        false,
      rotateWithPlayer:      map.d.gBehaviorRotateWithPlayer,
      ready:                 false,
      message:               {
        icon:       '<i class="fas fa-map-marked-alt"></i>',
        text:       'Map initialiation',
        sub:        '',
        processing: true
      }
    };
  },
  computed: {
    ...mapGetters( {
      configEnabled: 'config/enabled'
    } ),
    m: () => map.d
  },
  watch:    {
    telemetry( newTelemetry ) {
      if ( this.ready ) {
        map.updatePlayerPositionAndRotation(
            newTelemetry.truck.position.X,
            newTelemetry.truck.position.Z,
            newTelemetry.truck.orientation.heading,
            newTelemetry.truck.speed.kph );
      }
    }
  },
  mounted() {
    map.init( this.telemetry.game.game.name )
       .then( () => {
         this.ready            = true;
         this.rotateWithPlayer = map.d.gBehaviorRotateWithPlayer;
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
  methods: {
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
  }
};
</script>