<template>
	<div class="trailer capitalized">
		<div class="t-info">
			<div class="trailer-data">
				<!--<span>{{bodyType}}</span>
				<small>{{chainType}}</small>-->
				<div class="job" v-if="$hasTrailerAndJob()">{{telemetry.job.cargo.name}}</div>
				<div class="job disabled" v-else-if="$hasTrailer()">
					<i>-- No Job --</i>
				</div>
				<div class="job disabled" v-else>
					<i>-- No trailer --</i>
				</div>
			</div>
			<div class="job-data">
				<small class="licencePlate">
          <span class="flag">{{ $flag( telemetry.trailer.licensePlate.country.id, telemetry.game.game.id ) }}</span>
          <span v-if="$hasTrailer()">{{ telemetry.trailer.licensePlate.value }}</span>
          <span v-else>N/A</span>
        </small>
				<div class="damage left" v-if="$hasTrailer()">{{ $averageDamage( telemetry.trailer.damage ) }} %</div>
				<div class="damage left" v-else>N/A</div>
			</div>
			<!--<div class="trailer-wear text-center">
				<div class="damage" v-for="key in Object.keys(damage)">
					<b>{{key}}</b><span>{{(100 * damage[key]).toFixed()}}%</span>
				</div>
			</div>-->
		</div>
		<!--<div><b>Brand:</b><span>{{brand.name || brand.id}}</span></div>
		<div><b>Model:</b><span>{{telemetry.trailer.model.name || telemetry.trailer.model.id}}</span></div>
		<div><b>Accessory ID:</b><span>{{accessoryId}}</span></div>
		<div><b>Body type:</b><span>{{bodyType}}</span></div>
		<div><b>Chain type:</b><span>{{chainType}}</span></div>
		<div><b>License plate:</b><span>{{telemetry.trailer.licensePlate.value}} ({{telemetry.trailer.licensePlate.country.name}})</span></div>
		<div><b>Attached:</b><span>{{attached ? 'YES' : 'NO'}}</span></div>-->
	</div>


</template>

<script>
	export default {
    name: 'Trailer'
  };
</script>

<style scoped lang="scss">
	@import "../../../assets/scss/job/trailer";
</style>
