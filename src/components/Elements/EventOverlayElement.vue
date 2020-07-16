<template>
	<div class="event-overlay">
		<b-overlay :show="isOnProcessing" :variant="'dark'" no-wrap>
			<template class="d-flex justify-content-around align-items-center flex-column" v-slot:overlay>
				<component v-bind:is="currentRawDataComponent"></component>
			</template>
		</b-overlay>
	</div>
</template>

<script>
	import { mapGetters }           from 'vuex';
	import _event                   from '../../utils/_event';
	import EventOverlayDefault      from './EventOverlayElement/EventOverlayDefault';
	import EventOverlayJobDelivered from './EventOverlayElement/EventOverlayJobDelivered';
	
	export default {
		name:       'EventOverlayElement',
		components: {
			EventOverlayDefault,
			EventOverlayJobDelivered
		},
		computed:   {
			...mapGetters( {
				isOnProcessing: 'events/isOnProcessing',
				event:          'events/event'
			} ),
			currentRawDataComponent() {
				const eventComponentName = _event.eventNameToComponent( this.event );
				
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
