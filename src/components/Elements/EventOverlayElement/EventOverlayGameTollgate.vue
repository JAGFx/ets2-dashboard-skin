<template>
  <EventOverlayBase>
    <hr class="m-0 mb-4">
    <div class="data d-flex justify-content-around align-items-center">
      <span class="data">- {{ unit_currency( rawData.tollgate.amount ) }}</span>
    </div>
  </EventOverlayBase>
</template>

<script>
import AppEventOverlayMixins from '@/components/Mixins/AppEventOverlayMixins';

//import { mapGetters }   from 'vuex';
import eventsText       from '../../../data/events.json';
import EventOverlayBase from './EventOverlayBase';

export default {
  name:       'EventOverlayGameTollgate',
  mixins:     [ AppEventOverlayMixins ],
  components: {
    EventOverlayBase
  },
  methods:    {
    eventsText() {
      return eventsText;
    }
  }
  //computed: {
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
