<template>
	<div class="trailer capitalized">
		<div class="t-info">
			<div class="trailer-data">
				<!--<span>{{bodyType}}</span>
				<small>{{chainType}}</small>-->
				<div class="job" v-if="hasTrailerAndJob()">{{cargo.name}}</div>
				<div class="job disabled" v-else-if="hasTrailer()">
					<i>-- No Job --</i>
				</div>
				<div class="job disabled" v-else>
					<i>-- No trailer --</i>
				</div>
			</div>
			<div class="job-data">
				<small class="licencePlate">
					<span class="flag">{{getFlag( licensePlate.country.id )}}</span>
					<span v-if="hasTrailer()">{{licensePlate.value}}</span>
					<span v-else>N/A</span>
				</small>
				<div class="damage left" v-if="hasTrailer()">{{Math.floor(100 * getAverageDamage())}} %</div>
				<div class="damage left" v-else>N/A</div>
			</div>
			<!--<div class="trailer-wear text-center">
				<div class="damage" v-for="key in Object.keys(damage)">
					<b>{{key}}</b><span>{{(100 * damage[key]).toFixed()}}%</span>
				</div>
			</div>-->
		</div>
		<!--<div><b>Brand:</b><span>{{brand.name || brand.id}}</span></div>
		<div><b>Model:</b><span>{{model.name || model.id}}</span></div>
		<div><b>Accessory ID:</b><span>{{accessoryId}}</span></div>
		<div><b>Body type:</b><span>{{bodyType}}</span></div>
		<div><b>Chain type:</b><span>{{chainType}}</span></div>
		<div><b>License plate:</b><span>{{licensePlate.value}} ({{licensePlate.country.name}})</span></div>
		<div><b>Attached:</b><span>{{attached ? 'YES' : 'NO'}}</span></div>-->
	</div>


</template>

<script>
	import * as utils from '../../../../../utils/utils';
	
	export default {
		name:  'Trailers',
		props: [
			'brand',
			'model',
			'accessoryId',
			'bodyType',
			'chainType',
			'licensePlate',
			'attached',
			'wheels',
			'position',
			'orientation',
			'acceleration',
			'hook',
			'damage',
			'cargo'
		],
		
		methods: {
			hasTrailer:       function () {
				return this.model.id.length !== 0;
			},
			hasTrailerAndJob: function () {
				return this.model.id.length !== 0 && this.cargo.name.length !== 0;
			},
			getAverageDamage() {
				const keyLength = Object.keys( this.damage ).length;
				let sum         = 0;
				
				for ( const key in this.damage ) {
					sum += this.damage[ key ];
				}
				
				return sum / keyLength;
			},
			getFlag( countryName ) {
				return utils.app.flag( countryName );
			}
		}
	};
</script>

<style scoped lang="scss">
	@import "../../../assets/scss/job/trailer";
</style>
