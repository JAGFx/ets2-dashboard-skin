<template>
	<div class="job">
		<!--<div class="header">
			<div class="name">{{cargo.name}}</div>
		</div>-->
		<!--<div class="wear">{{Math.floor(100 * cargo.damage)}}%</div>-->
		
		<ul class="dash-element left ">
			<li :class="{ 'disabled': hasNoJob()  }" class="multiline default">
				<div class="round from">
					<i class="icon-startpoint"></i>
				</div>
				<span v-if="hasNoJob()">N/A</span>
				<span v-else>
					<span>{{source.city.name}}</span>
					<small class="text-muted text-italic">{{source.company.name}}</small>
				</span>
			</li>
			<li :class="{ 'disabled': hasNoJob()  }" class="multiline default">
				<div class="round to">
					<i class="icon-endpoint"></i>
				</div>
				<span v-if="hasNoJob()">N/A</span>
				<span v-else>
					<span>{{destination.city.name}}</span>
					<small class="text-muted">{{destination.company.name}}</small>
				</span>
			</li>
			<li :class="{ 'disabled': hasNoJob()  }" class="default">
				<div class="round">
					<i class="icon-time"></i>
				</div>
				<span v-if="hasNoJob()">N/A</span>
				<span v-else>{{$formatDate( deliveryTime.unix )}}</span>
			</li>
			<li :class="{ 'disabled': hasNoJob()  }" class="default">
				<div class="round">
					<i class="icon-currency"></i>
				</div>
				<span v-if="hasNoJob()">N/A</span>
				<span v-else>{{['?', '€', '$'][game.id]}} {{income.toLocaleString()}}</span>
			</li>
			<li :class="{ 'disabled': distance === 0  }" class="default">
				<div class="round">
					<i class="icon-ruler"></i>
				</div>
				<span v-if="distance === 0">N/A</span>
				<span v-else-if="distance < 1000">{{distance.toFixed().toLocaleString()}} m</span>
				<span v-else>{{(distance / 1000).toFixed().toLocaleString()}} km</span>
			</li>
			<li :class="{ 'disabled': hasNoJob()  }" class="default">
				<div class="round">
					<i class="icon-weight"></i>
				</div>
				<span v-if="hasNoJob()">N/A</span>
				<span v-else>{{(cargo.mass / 1000).toFixed()}} t</span>
			</li>
		</ul>
		
		<!--<div class="info list">
			<div><b>Expected:</b><span>{{formatDeliveryTime()}}</span></div>
			<div><b>Destination:</b><span>{{destination.city.name}} - {{destination.company.name}}</span></div>
			<div><b>Source:</b><span>{{source.city.name}} - {{source.company.name}}</span></div>
			<div><b>Market:</b><span>{{market.name}}</span></div>
			<div><b>Income:</b><span>{{[ '?', '€', '$' ][ game.id ]}}{{income.toLocaleString()}}</span></div>
			<div><b>Special transport:</b><span>{{isSpecial ? 'YES' : 'NO'}}</span></div>
			<div><b>Planned distance:</b><span>{{plannedDistance.km}}km / {{plannedDistance.miles}}Miles</span></div>
		</div>
		
		<div class="cargo list">
			<div><b>Name:</b><span>{{cargo.name}}</span></div>
			<div><b>Mass:</b><span>{{(cargo.mass / 1000).toFixed()}}t</span></div>
			<div><b>Unit Mass:</b><span>{{(cargo.unitMass / 1000).toFixed()}}t</span></div>
			<div><b>Damage:</b><span>{{Math.floor(100 * cargo.damage)}}%</span></div>
			<div><b>Loaded:</b><span>{{cargo.isLoaded ? 'YES' : 'NO'}}</span></div>
		</div>-->
	</div>
</template>

<script>
	import dashMixins from '../../../../../components/Mixins/dashMixins';
	
	export default {
		name:  'Job',
		props: [
			'game',
			'deliveryTime',
			'cargo',
			'isSpecial',
			'destination',
			'source',
			'market',
			'income',
			'plannedDistance',
			'distance'
		],
		mixins: [ dashMixins ],
		
		methods: {
			hasNoJob:           function () {
				return (this.cargo.id.length === 0);
			}
		}
	};
</script>

<style scoped lang="scss">
	@import "../../../assets/scss/job/job";
</style>
