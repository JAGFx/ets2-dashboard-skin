<template>
  <EventOverlayBase>
    <hr class="m-0 mb-4">
    <div class="data d-flex justify-content-around align-items-center">
      <div class="item px-3 py-1 mx-1 d-flex justify-content-between align-items-center flex-column">
        <span class="title">Delivered time</span>
        <span class="data">{{
            rawData.job.deliveryTime | $dateTimeLocalized( DATE_FORMAT_SHORT, TIME_FORMAT_SHORT )
          }}</span>
      </div>
      <div class="item px-3 py-1 mx-1 d-flex justify-content-between align-items-center flex-column">
        <span class="title">Earned XP</span>
        <span class="data">{{ rawData.job.earnedXP }}</span>
      </div>
      <div class="item px-3 py-1 mx-1 d-flex justify-content-between align-items-center flex-column">
        <span class="title">Revenue</span>
        <span class="data">{{ unit_currency( rawData.job.revenue ) }}</span>
      </div>
    </div>
  </EventOverlayBase>
</template>

<script>
import { mapGetters }   from 'vuex';
import eventsText       from '../../../data/events.json';
import EventOverlayBase from './EventOverlayBase';

export default {
  name:       'EventOverlayJobDelivered',
  components: {
    EventOverlayBase
  },
  methods:    {
    eventsText() {
      console.log( this.event, eventsText );
      return eventsText;
    }
  },
		computed: {
			...mapGetters( {
				event:   'events/event',
				rawData: 'events/rawData'
			} )
		}
	};
</script>

<style lang="scss" scoped>
	@import "../../../assets/scss/app/eventOverlay";
</style>
