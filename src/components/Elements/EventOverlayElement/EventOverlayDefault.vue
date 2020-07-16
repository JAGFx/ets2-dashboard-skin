<template>
	<div>
		<div :class="event.replace('.', '-')" class="item d-flex justify-content-center align-items-center">
					<span class="ico m-4 p-3 d-flex justify-content-center align-items-center">
						<i :class="eventsText()[ event ].icon"></i>
					</span>
			<div class="event d-flex justify-content-between align-items-start flex-column">
				<span class="title">{{ eventsText()[ event ].title }}</span>
				<small class="sub-title font-italic">{{ eventsText()[ event ].subtitle }}</small>
			</div>
		</div>
	</div>
</template>

<script>
	// TODO Create corresponding data on SCS SDK
	// TODO Add each entries in event json
	
	import { mapGetters } from 'vuex';
	import eventsText     from '../../../data/events.json';
	
	export default {
		name:     'EventOverlayDefault',
		methods:  {
			eventsText() {
				//console.log( this.event, eventsText );
				return eventsText;
			}
		},
		computed: {
			...mapGetters( {
				event: 'events/event'
			} )
		}
	};
</script>

<style lang="scss" scoped>
	@import "../../../assets/scss/app/eventOverlay";
</style>
