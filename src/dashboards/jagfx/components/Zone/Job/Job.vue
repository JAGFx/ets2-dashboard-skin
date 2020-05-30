<template>
	<div class="job">
		<!--<div class="header">
			<div class="name">{{job.cargo.name}}</div>
		</div>-->
		<!--<div class="wear">{{Math.floor(100 * job.cargo.damage)}}%</div>-->
		
		<ul class="dash-element left ">
			<li :class="{ 'disabled': !$hasJob()  }" class="multiline default">
				<div class="round from">
					<i class="icon-startpoint"></i>
				</div>
				<span v-if="!$hasJob()">N/A</span>
				<span v-else>
					<span>{{job.source.city.name}}</span>
					<small class="text-muted text-italic">{{job.source.company.name}}</small>
				</span>
			</li>
			<li :class="{ 'disabled': !$hasJob()  }" class="multiline default">
				<div class="round to">
					<i class="icon-endpoint"></i>
				</div>
				<span v-if="!$hasJob()">N/A</span>
				<span v-else>
					<span>{{job.destination.city.name}}</span>
					<small class="text-muted">{{job.destination.company.name}}</small>
				</span>
			</li>
			<li :class="{ 'disabled': !$hasJob()  }" class="default">
				<div class="round">
					<i class="icon-time"></i>
				</div>
				<span v-if="!$hasJob()">N/A</span>
				<span v-else-if="$jobRemainingTimeToDueDate()">{{ job.deliveryTime.unix | $dateTimeLocalized( DATE_FORMAT_LONG, TIME_FORMAT_SHORT ) }}</span>
				<span v-else>{{ $jobRemainingTimeDelivery( job.deliveryTime.unix ) }}</span>
			</li>
			<li :class="{ 'disabled': !$hasJob()  }" class="default">
				<div class="round">
					<i class="icon-currency"></i>
				</div>
				<span v-if="!$hasJob()">N/A</span>
				<span v-else>{{ unit_currency( job.income ) }}</span>
			</li>
			<li :class="{ 'disabled': navigation.distance === 0  }" class="default">
				<div class="round">
					<i class="icon-ruler"></i>
				</div>
				<span v-if="navigation.distance === 0">N/A</span>
				<span v-else-if="navigation.distance < 1000"> {{ unit_length( navigation.distance, 'm' ) }}</span>
				<span v-else>{{unit_length( navigation.distance ) }}</span>
			</li>
			<li :class="{ 'disabled': !$hasJob()  }" class="default">
				<div class="round">
					<i class="icon-weight"></i>
				</div>
				<span v-if="!$hasJob()">N/A</span>
				<span v-else>{{ unit_weight( job.cargo.mass ) }}</span>
			</li>
		</ul>
		
		<!--<div class="info list">
			<div><b>Expected:</b><span>{{formatDeliveryTime()}}</span></div>
			<div><b>Destination:</b><span>{{job.destination.city.name}} - {{job.destination.company.name}}</span></div>
			<div><b>Source:</b><span>{{job.source.city.name}} - {{job.source.company.name}}</span></div>
			<div><b>Market:</b><span>{{market.name}}</span></div>
			<div><b>Income:</b><span>{{unit_currency( job.income )}}</span></div>
			<div><b>Special transport:</b><span>{{isSpecial ? 'YES' : 'NO'}}</span></div>
			<div><b>Planned navigation.distance:</b><span>{{plannedDistance.km}}km / {{plannedDistance.miles}}Miles</span></div>
		</div>
		
		<div class="job.cargo list">
			<div><b>Name:</b><span>{{job.cargo.name}}</span></div>
			<div><b>Mass:</b><span>{{(job.cargo.mass / 1000).toFixed()}}t</span></div>
			<div><b>Unit Mass:</b><span>{{(job.cargo.unitMass / 1000).toFixed()}}t</span></div>
			<div><b>Damage:</b><span>{{Math.floor(100 * job.cargo.damage)}}%</span></div>
			<div><b>Loaded:</b><span>{{job.cargo.isLoaded ? 'YES' : 'NO'}}</span></div>
		</div>-->
	</div>
</template>

<script>
	import AppDashMixins from '../../../../../components/Mixins/AppDashMixins';
	
	export default {
		name:    'Job',
		mixins:  [ AppDashMixins ]
	};
</script>

<style scoped lang="scss">
	@import "../../../assets/scss/job/job";
</style>
