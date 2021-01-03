<template>
  <Dashboard class="maps wrapper">
    <div id="map" class="w-100 h-100"></div>

    <!-- Speed limit -->
    <div v-show="telemetry.navigation.speedLimit.value > 0" id="speed-limit" class="justify-content-center align-items-center">
      <span>{{ unit_speed( telemetry.navigation.speedLimit, true, false ) }}</span>
    </div>
    <!-- ./Speed limit -->

    <!-- Control map buttons -->
    <div class="controls-wrapper left h-100 flex-column justify-content-end">
      <button id="rotate-button" :class="{ disabled: !rotateWithPlayer }" @click="onClickRotate">
        <i class="fas fa-location-arrow"></i>
      </button>
      <button id="center-button" @click="onClickCenter">
        <i class="fas fa-bullseye"></i>
      </button>
      <div id="ol-zoom-wrapper"></div>
    </div>
    <!-- ./Control map buttons -->

    <!-- Speed area-->
    <div id="speed-area" class="top button">
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
    <div v-show="telemetry.navigation.distance > 0" class="eta-wrapper d-flex justify-content-end align-items-start flex-column">
      <!--      <span class="w-100 button">ETA:</span>-->
      <span class="button">
        <div class="round h-100">
					<i class="icon-time"></i>
				</div>
        <span class="w-100">{{ $etaDueDate() | $dateTimeLocalized( DATE_FORMAT_LONG, TIME_FORMAT_SHORT ) }}</span>
      </span>
      <span class="button">
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
  </Dashboard>
</template>

<script>
import { EventBus } from '@/event-bus.js';
import _maps        from '@/utils/_maps';
import Dashboard    from '../../../components/Elements/Dashboard';
import _app         from '../../../utils/_app';

export default {
  name:       'DashMaps',
  components: {
    Dashboard
  },
  data() {
    return {
      rotateWithPlayer: _maps.d.gBehaviorRotateWithPlayer
    };
  },
  mounted() {
    _maps.init();

    EventBus.$on( 'tmp-update', dataIn => {
      _maps.updatePlayerPositionAndRotation(
          dataIn.truck.position.X,
          dataIn.truck.position.Z,
          dataIn.truck.orientation.heading,
          dataIn.truck.speed.kph );
    } );

    // --- Dev
    if ( _app.isOnDevEnvironment )
      _maps.updatePlayerPositionAndRotation(
          this.telemetry.truck.position.X,
          this.telemetry.truck.position.Z,
          this.telemetry.truck.orientation.heading,
          this.telemetry.truck.speed.kph );
    // --- ./Dev
  },
  methods: {
    onClickRotate() {
      _maps.d.gBehaviorRotateWithPlayer = (_maps.d.gBehaviorCenterOnPlayer)
          ? !_maps.d.gBehaviorRotateWithPlayer
          : true;

      this.rotateWithPlayer = _maps.d.gBehaviorRotateWithPlayer;
    },
    onClickCenter() {
      _maps.d.gBehaviorCenterOnPlayer = !_maps.d.gBehaviorCenterOnPlayer;
    }
  }
};
</script>

<style lang="scss">
@import "../assets/scss/maps";
</style>
