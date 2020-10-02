<template>
  <EventOverlayBase>
    <hr class="m-0 mb-4">
    <div class="data d-flex justify-content-around align-items-center">
      <div class="item px-3 py-1 mx-1 d-flex justify-content-between align-items-center flex-column">
        <span class="title">Speed limit change</span>
        <span class="data">{{ unit_speed( rawData.speed ) }}</span>
      </div>
    </div>
  </EventOverlayBase>
</template>

<script>
	import EventOverlayBase from './EventOverlayBase';
  import { mapGetters }   from 'vuex';
	import eventsText       from '../../../data/events.json';
	import AppDashMixins    from '../../Mixins/AppDashMixins';

	export default {
		name:     'EventOverlayNavigationSpeed-limit',
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
