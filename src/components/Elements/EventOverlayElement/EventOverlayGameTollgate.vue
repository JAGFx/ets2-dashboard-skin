<template>
  <EventOverlayBase>
    <hr class="m-0 mb-4">
    <div class="data d-flex justify-content-around align-items-center">
      <span class="data">- {{ unit_currency( rawData.amount ) }}</span>
    </div>
  </EventOverlayBase>
</template>

<script>
	import EventOverlayBase from './EventOverlayBase';
  import { mapGetters }   from 'vuex';
	import eventsText       from '../../../data/events.json';
	import AppDashMixins    from '../../Mixins/AppDashMixins';

	export default {
		name:     'EventOverlayGameTollgate',
    components: {
      EventOverlayBase
    },
		mixins:   [
			AppDashMixins
		],
		methods:  {
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
