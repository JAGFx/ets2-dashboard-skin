<template>
	<div>
		<div :class="event.replace('.', '-')" class="item d-flex justify-content-center align-items-center">
					<span class="ico m-4 p-3 d-flex justify-content-center align-items-center">
						<i class="far fa-building"></i>
					</span>
			<div class="event d-flex justify-content-between align-items-start flex-column">
				<span class="title">Cargo delivered !</span>
				<small class="sub-title font-italic">You just end a job !</small>
			</div>
		</div>
		<hr class="m-0 mb-4">
		<div class="data d-flex justify-content-around align-items-center">
			<div class="item px-3 py-1 mx-1 d-flex justify-content-between align-items-center flex-column">
				<span class="title">Delivered time</span>
				<span class="data">{{ rawData.deliveryTime | $dateTimeLocalized( DATE_FORMAT_SHORT, TIME_FORMAT_SHORT ) }}</span>
			</div>
			<div class="item px-3 py-1 mx-1 d-flex justify-content-between align-items-center flex-column">
				<span class="title">Earned XP</span>
				<span class="data">{{ rawData.earnedXP }}</span>
			</div>
			<div class="item px-3 py-1 mx-1 d-flex justify-content-between align-items-center flex-column">
				<span class="title">Revenue</span>
				<span class="data">{{ unit_currency( rawData.revenue ) }}</span>
			</div>
		</div>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex';
	import AppDashMixins  from '../../Mixins/AppDashMixins';
	
	export default {
		name:     'EventOverlayJobDelivered',
		mixins:   [
			AppDashMixins
		],
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
