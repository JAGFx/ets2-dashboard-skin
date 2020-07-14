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
	import EventOverlayJobDelivered from './EventOverlayElement/EventOverlayJobDelivered';
	
	export default {
		name:       'EventOverlayElement',
		components: {
			EventOverlayJobDelivered
		},
		computed:   {
			...mapGetters( {
				isOnProcessing: 'events/isOnProcessing',
				event:          'events/event'
			} ),
			currentRawDataComponent() {
				return _event.eventNameToComponent( this.event );
			}
		}
	};
</script>

<style lang="scss" scoped>
	@import "../../assets/scss/app/eventOverlay";
</style>
