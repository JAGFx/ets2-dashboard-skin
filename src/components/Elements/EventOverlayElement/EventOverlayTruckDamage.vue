<template>
  <EventOverlayBase>
    <hr class="m-0 mb-4">
    <div class="data d-flex justify-content-around align-items-center">
      <div class="item px-3 py-1 mx-1 d-flex justify-content-between align-items-center flex-column">
        <span class="title">Cabin</span>
        <span class="data">{{ (rawData.damages.cabin * 100) | $toFixed(2) }} %</span>
      </div>
      <div class="item px-3 py-1 mx-1 d-flex justify-content-between align-items-center flex-column">
        <span class="title">Chassis</span>
        <span class="data">{{ (rawData.damages.chassis * 100) | $toFixed(2) }} %</span>
      </div>
      <div class="item px-3 py-1 mx-1 d-flex justify-content-between align-items-center flex-column">
        <span class="title">Engine</span>
        <span class="data">{{ (rawData.damages.engine * 100) | $toFixed(2) }} %</span>
      </div>
      <div class="item px-3 py-1 mx-1 d-flex justify-content-between align-items-center flex-column">
        <span class="title">Transmission</span>
        <span class="data">{{ (rawData.damages.transmission * 100) | $toFixed(2) }} %</span>
      </div>
      <div class="item px-3 py-1 mx-1 d-flex justify-content-between align-items-center flex-column">
        <span class="title">Wheels</span>
        <span class="data">{{ (rawData.damages.wheels * 100) | $toFixed(2) }} %</span>
      </div>
    </div>
  </EventOverlayBase>
</template>

<script>
//import { mapGetters }   from 'vuex';
import eventsText       from '../../../data/events.json';
import EventOverlayBase from './EventOverlayBase';

export default {
  name:       'EventOverlayTruckDamage',
  components: {
    EventOverlayBase
  },
  methods:    {
    eventsText() {
      return eventsText;
    }
  }
  //computedC: {
  //	...mapGetters( {
  //		event:   'events/event',
  //		rawData: 'events/rawData'
  //	} )
  //}
};
</script>

<style lang="scss" scoped>
	@import "../../../assets/scss/app/eventOverlay";
</style>
