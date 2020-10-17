<template>
  <div class="event-overlay">
    <b-overlay :show="eventProcessing" :variant="'dark'" no-wrap>
      <template v-slot:overlay class="d-flex justify-content-around align-items-center flex-column">
        <component v-bind:is="currentRawDataComponent"></component>
      </template>
    </b-overlay>
  </div>
</template>

<script>
import EventOverlayDefault      from '@/components/Elements/EventOverlayElement/EventOverlayDefault';
import EventOverlayGameFerry    from '@/components/Elements/EventOverlayElement/EventOverlayGameFerry';
import EventOverlayGameFine     from '@/components/Elements/EventOverlayElement/EventOverlayGameFine';
import EventOverlayGameTollgate from '@/components/Elements/EventOverlayElement/EventOverlayGameTollgate';
import EventOverlayGameTrain    from '@/components/Elements/EventOverlayElement/EventOverlayGameTrain';
import EventOverlayJobDelivered from '@/components/Elements/EventOverlayElement/EventOverlayJobDelivered';
import EventOverlayNavigationSpeedLimit
                                from '@/components/Elements/EventOverlayElement/EventOverlayNavigationSpeed-limit';
import EventOverlayTrailersDamage
                                from '@/components/Elements/EventOverlayElement/EventOverlayTrailersDamage';
import EventOverlayTruckCruiseControlDecrease
                                from '@/components/Elements/EventOverlayElement/EventOverlayTruckCruise-control-decrease';
import EventOverlayTruckCruiseControlIncrease
                                from '@/components/Elements/EventOverlayElement/EventOverlayTruckCruise-control-increase';
import EventOverlayTruckDamage  from '@/components/Elements/EventOverlayElement/EventOverlayTruckDamage';
import EventOverlayTruckWarning from '@/components/Elements/EventOverlayElement/EventOverlayTruckWarning';
import AppEventOverlayMixins    from '@/components/Mixins/AppEventOverlayMixins';
//import { mapGetters }           from 'vuex';
import _event                   from '../../utils/_event';

export default {
  name:       'EventOverlayElement',
  mixins:     [ AppEventOverlayMixins ],
  components: {
    EventOverlayDefault,
    EventOverlayJobDelivered,
    EventOverlayGameFine,
    EventOverlayGameTollgate,
    EventOverlayGameFerry,
    EventOverlayGameTrain,
    EventOverlayNavigationSpeedLimit,
    EventOverlayTrailersDamage,
    EventOverlayTruckCruiseControlIncrease,
    EventOverlayTruckCruiseControlDecrease,
    EventOverlayTruckWarning,
    EventOverlayTruckDamage
  },
  computed: {
    //...mapGetters( {
    //  isOnProcessing: 'events/isOnProcessing',
    //  event:          'events/event'
    //} ),
    currentRawDataComponent() {
      const eventComponentName = _event.eventNameToComponent( this.eventName );

      try {
        require( './EventOverlayElement/' + eventComponentName );
        return eventComponentName;

      } catch ( e ) {
        return 'EventOverlayDefault';
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/app/eventOverlay";
</style>
