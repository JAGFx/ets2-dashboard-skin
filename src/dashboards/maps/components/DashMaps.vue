<template>
  <Dashboard class="maps wrapper">
    <div id="map" class="w-100 h-100">
    </div>
    <div id="rotate-wrapper" class="ol-unselectable ol-control">
      <button id="rotate-button" :class="{ enable: rotateWithPlayer }" @click="onClickRotate">
        <i class="fas fa-location-arrow"></i>
      </button>
      <button id="center-button" class="enable" @click="onClickCenter">
        <i class="fas fa-bullseye"></i>
      </button>
    </div>
    <div id="speed-limit" v-show="telemetry.navigation.speedLimit.value > 0">
      <span>{{ unit_speed( telemetry.navigation.speedLimit, true, false ) }}</span>
    </div>
    <div id="eta" v-show="telemetry.navigation.distance > 0">
      ETA:
      {{ $etaDueDate() | $dateTimeLocalized( DATE_FORMAT_LONG, TIME_FORMAT_SHORT ) }},
      {{ unit_length( telemetry.navigation.distance, 'm' ) }},
      {{ $etaRemaing() }}
    </div>
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
  methods:    {
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
