<template>
	<div class="job">
		<!--<div class="header">
			<div class="name">{{cargo.name}}</div>
		</div>-->
		<!--<div class="wear">{{Math.floor(100 * cargo.damage)}}%</div>-->
		
		<ul class="dash-element left">
			<li class="multiline">
				<div class="round from"></div>
				<span>
					<span>{{source.city.name}}</span>
					<small class="text-muted text-italic">{{source.company.name}}</small>
				</span>
			</li>
			<li class="multiline">
				<div class="round to"></div>
				<span>
					<span>{{destination.city.name}}</span>
					<small class="text-muted">{{destination.company.name}}</small>
				</span>
			</li>
			<li>
				<div class="round">
					<img alt=""  src="../assets/img/Job/noun_stop_watch_2207126.svg">
				</div>
				<span>{{formatDeliveryTime()}}</span>
			</li>
			<li>
				<div class="round">
					<img alt=""  src="../assets/img/Job/noun_Money_285330.svg">
				</div>
				<span>{{['?', '€', '$'][game.id]}} {{income.toLocaleString()}}</span>
			</li>
			<li :class="{ 'disabled': ( (distance / 1000) === 0 ) }">
				<div class="round">
					<img alt="" src="../assets/img/Job/noun_measure_1625696.svg">
				</div>
				<span>
					<span v-if="(distance / 1000) === 0">N/A</span>
					<span v-else>{{(distance / 1000).toFixed().toLocaleString()}} km</span>
				</span>
			</li>
			<li :class="{ 'disabled': ( (cargo.mass / 1000) === 0 ) }">
				<div class="round">
					<img alt=""  src="../assets/img/Job/noun_Weight_1644747.svg">
				</div>
				<span>
					<span v-if="(cargo.mass / 1000) === 0">N/A</span>
					<span v-else>{{(cargo.mass / 1000).toFixed()}} t</span>
				</span>
			</li>
		</ul>
		
		<!--<div class="info list">
			<div><b>Expected:</b><span>{{formatDeliveryTime()}}</span></div>
			<div><b>Destination:</b><span>{{destination.city.name}} - {{destination.company.name}}</span></div>
			<div><b>Source:</b><span>{{source.city.name}} - {{source.company.name}}</span></div>
			<div><b>Market:</b><span>{{market.name}}</span></div>
			<div><b>Income:</b><span>{{['?', '€', '$'][game.id]}}{{income.toLocaleString()}}</span></div>
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
	import Window from '@/components/Window.vue';
	
	export default {
		name: 'Job',
		
		components: { Window },
		
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
		
		methods: {
			formatDeliveryTime: function () {
				const date   = new Date( this.deliveryTime.unix );
				const double = num => num < 10 ? `0${ num }` : num;
				const days   = [ 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat' ];
				
				return `${ days[ date.getUTCDay() ] } ${ double( date.getUTCHours() ) }:${ double( date.getUTCMinutes() ) }`;
			}
		}
	};
</script>

<style scoped lang="scss">
	@import "../assets/scss/job/job";
	
	.job {
		height: 100%;
		.header {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 0.5rem 1rem;
			
			> * {
				width: 100%;
			}
			
			> .mass{
				background: url("../assets/img/Job/noun_Weight_1644747.svg") center center no-repeat;
				background-size: contain;
				height: 3rem;
				width: 6rem;
				position: relative;
				
				> span {
					width: 100%;
					display: block;
					position: relative;
					top: 0.2rem;
					font-size: 1.6rem;
					text-align: center;
					padding-bottom: 1rem;
					vertical-align: middle;
				}
			}
			
			.name{
				/*margin-left: 1rem;*/
				font-size: 1.5rem;
			}
		}
	}
</style>
