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
import _maps     from '@/utils/_maps';
import Dashboard from '../../../components/Elements/Dashboard';

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
  },
  methods:    {
    onClickRotate() {
      //console.log( 'R', _maps.d );
      _maps.d.gBehaviorRotateWithPlayer = (_maps.d.gBehaviorCenterOnPlayer)
          ? !_maps.d.gBehaviorRotateWithPlayer
          : true;

      this.rotateWithPlayer = _maps.d.gBehaviorRotateWithPlayer;
    }
  },
  sockets:    {
    update() {
      _maps.updatePlayerPositionAndRotation(
          this.telemetry.truck.cabin.offset.position.X,
          this.telemetry.truck.cabin.offset.position.Y,
          this.telemetry.truck.cabin.offset.orientation.heading,
          this.telemetry.truck.speed.kph );
    }
  }
};
</script>

<style lang="scss">
@import "../assets/scss/maps";
</style>
