<template>
	<div class="dash-symbol-wrapper">
		<!-- Brake parking | parkingBrake -->
		<div :class="{ 'red': $parent.brakes.parking.enabled, 'left': sideLeft(), 'right': sideRight() }" class="dash-symbol" v-if="elementIsEnabled('parkingBrake')">
			<span>
				<i class="icon-parking_brakes"></i>
			</span>
		</div>
		
		<!-- Retarder | retarder -->
		<div :class="{ 'green': $parent.brakes.retarder.level > 0, 'left': sideLeft(), 'right': sideRight() }" class="dash-symbol" v-if="elementIsEnabled('retarder')">
			<span>
				<i class="icon-retarder"></i>
			</span>
		</div>
		
		<!-- Beacon | beacon -->
		<div :class="{ 'green': $parent.lights.beacon.enabled, 'left': sideLeft(), 'right': sideRight() }" class="dash-symbol" v-if="elementIsEnabled('beacon')">
			<span>
				<i class="icon-beacons"></i>
			</span>
		</div>
		
		<!-- Beam high | beamHigh -->
		<div :class="{ 'blue': $parent.lights.beamHigh.enabled
							&& $parent.lights.beamLow.enabled
							&& $parent.engine.enabled, 'left': sideLeft(), 'right': sideRight() }" class="dash-symbol" v-if="elementIsEnabled('beamHigh')">
			<span>
				<i class="icon-beam_high"></i>
			</span>
		</div>
		
		<!-- Beam low | beamLow -->
		<div :class="{ 'green': $parent.lights.beamLow.enabled && $parent.engine.enabled, 'left': sideLeft(), 'right': sideRight() }" class="dash-symbol" v-if="elementIsEnabled('beamLow')">
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
	export default {
		name:    'DashSymbolArea',
		props:   [ 'side' ],
		methods: {
			elementIsEnabled:  function ( elm ) {
				return this.$parent.$parent.$elementIsEnabled( 'middle-t', elm, { side: this.side } );
			},
			sideLeft:          function () {
				return this.side === 'left';
			},
			sideRight:         function () {
				return this.side === 'right';
			},
			indexEmptyElement: function () {
				const elementLength    = this.$parent.$parent.$elementsLength( 'middle' );
				const maxElement       = this.$parent.$parent.maxMiddleElements;
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
