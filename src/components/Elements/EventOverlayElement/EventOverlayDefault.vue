<template>
  <EventOverlayBase></EventOverlayBase>
</template>

<script>
//import { mapGetters }   from 'vuex';
import eventsText       from '../../../data/events.json';
import EventOverlayBase from './EventOverlayBase';

export default {
  name:       'EventOverlayDefault',
  components: {
    EventOverlayBase
  },
  methods:    {
    eventsText() {
      //console.log( this.event, eventsText );
      return eventsText;
    }
  }
  //computed:   {
  //  ...mapGetters( {
  //    event: 'events/event'
  //  } )
  //}
};
</script>

<style lang="scss" scoped>
	@import "../../../assets/scss/app/eventOverlay";
</style>
