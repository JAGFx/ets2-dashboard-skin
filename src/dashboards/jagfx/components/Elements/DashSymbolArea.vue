<template>
	<div class="dash-symbol-wrapper">
		<!-- Brake parking | parkingBrake -->
		<div :class="{ 'red': $parent.truck.brakes.parking.enabled, 'left': sideLeft(), 'right': sideRight() }" class="dash-symbol" v-if="elementIsEnabled('jagfx_elements_mid_top_parkingBrake')">
			<span>
				<i class="icon-parking_brakes"></i>
			</span>
		</div>
		
		<!-- Retarder | retarder -->
		<div :class="{ 'green': $parent.truck.brakes.retarder.level > 0, 'left': sideLeft(), 'right': sideRight() }" class="dash-symbol" v-if="elementIsEnabled('jagfx_elements_mid_top_retarder')">
			<span>
				<i class="icon-retarder"></i>
			</span>
		</div>
		
		<!-- Beacon | beacon -->
		<div :class="{ 'green': $parent.truck.lights.beacon.enabled, 'left': sideLeft(), 'right': sideRight() }" class="dash-symbol" v-if="elementIsEnabled('jagfx_elements_mid_top_beacon')">
			<span>
				<i class="icon-beacons"></i>
			</span>
		</div>
		
		<!-- Beam high | beamHigh -->
		<div :class="{ 'blue': $parent.truck.lights.beamHigh.enabled
							&& $parent.truck.lights.beamLow.enabled
							&& $parent.truck.engine.enabled, 'left': sideLeft(), 'right': sideRight() }" class="dash-symbol" v-if="elementIsEnabled('jagfx_elements_mid_top_beamHigh')">
			<span>
				<i class="icon-beam_high"></i>
			</span>
		</div>
		
		<!-- Beam low | beamLow -->
		<div :class="{ 'green': $parent.truck.lights.beamLow.enabled && $parent.truck.engine.enabled, 'left': sideLeft(), 'right': sideRight() }" class="dash-symbol" v-if="elementIsEnabled('jagfx_elements_mid_top_beamLow')">
			<span>
				<i class="icon-beam_low"></i>
			</span>
		</div>
		
		<!-- Empty -->
		<!--
			"retarder",
			"parkingBrake",
			"beamHigh",
			"beamLow",
			"beacon"
		-->
		<div :class="{ 'left': sideLeft(), 'right': sideRight() }" class="dash-symbol disabled" :key="i" v-for="i in indexEmptyElement()">
		</div>
	</div>
</template>

<script>
	import configMixins from '../Mixins/configMixins';
	
	export default {
		name:    'DashSymbolArea',
		mixins:  [ configMixins ],
		props:   [ 'side' ],
		methods: {
			elementIsEnabled:  function ( elm ) {
				return this.$elementIsEnabled( 'middle-t', elm, { side: this.side } );
			},
			sideLeft:          function () {
				return this.side === 'left';
			},
			sideRight:         function () {
				return this.side === 'right';
			},
			indexEmptyElement: function () {
				const elementLength    = this.$elementsLength( 'middle-t' );
				const maxElement       = this.maxElements[ 'middle-t' ];
				const maxElementBySide = maxElement / 2;
				
				let diff = 0;
				if ( this.sideLeft() ) {
					diff = (elementLength > 2)
						? 0
						: Math.abs( elementLength - maxElementBySide );
				} else {
					diff = (elementLength <= maxElementBySide)
						? 2
						: elementLength - maxElementBySide;
					
					if ( elementLength > maxElementBySide )
						diff = 0;
				}
				
				return (diff <= 0)
					? 0
					: diff;
			}
		}
	};
</script>

<style lang="scss" scoped>
	@import "../../assets/scss/navigation/navigation";
</style>
