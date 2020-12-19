<template>
  <Dashboard class="maps wrapper">
    <div id="map" class="w-100 h-100">
    </div>
    <div id="rotate-wrapper" class="ol-unselectable ol-control">
      <button id="rotate-button" :class="{ enable: rotateWithPlayer }" @click="onClickRotate">
        <i class="fas fa-location-arrow"></i>
      </button>
    </div>
    <div id="eta">
      ETA:
      {{ $jobRemainingTimeDelivery( telemetry.job.deliveryTime.unix ) }},
      {{ unit_length( telemetry.job.plannedDistance.km, 'km' ) }}
    </div>
  </Dashboard>
</template>

<script>
import { EventBus } from '@/event-bus.js';
import _maps        from '@/utils/_maps';
import Dashboard    from '../../../components/Elements/Dashboard';

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
          dataIn.truck.position.Y,
          dataIn.truck.orientation.heading,
          dataIn.truck.speed.kph );
    } );

    // --- Dev
    /*_maps.updatePlayerPositionAndRotation(
     this.telemetry.truck.position.X,
     this.telemetry.truck.position.Y,
     this.telemetry.truck.orientation.heading,
     this.telemetry.truck.speed.kph );*/
    // --- ./Dev
  },
  methods:    {
    onClickRotate() {
      //console.log( 'R', _maps.d );
      _maps.d.gBehaviorRotateWithPlayer = (_maps.d.gBehaviorCenterOnPlayer)
          ? !_maps.d.gBehaviorRotateWithPlayer
          : true;

      this.rotateWithPlayer = _maps.d.gBehaviorRotateWithPlayer;
    }
  }
};
</script>

<style lang="scss">
@import "../assets/scss/maps";
</style>
