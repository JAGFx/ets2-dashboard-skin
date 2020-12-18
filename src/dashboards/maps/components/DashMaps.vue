<template>
  <Dashboard class="maps wrapper">
    <div id="map" class="w-100 h-100">
    </div>
    <div id="rotate-button-div" class="ol-unselectable ol-control">
      <button id="rotate-button" @click="onClickRotate">
        <i :style="this.arrowRotate" class="fas fa-location-arrow"></i>
      </button>
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
      arrowRotate: ''
    };
  },
  mounted() {
    _maps.init();
  },
  methods:    {
    onClickRotate() {
      console.log( 'R', _maps.d );
      _maps.d.gBehaviorRotateWithPlayer = (_maps.d.gBehaviorCenterOnPlayer)
          ? !_maps.d.gBehaviorRotateWithPlayer
          : true;
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
