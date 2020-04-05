<template>
	<div class="job">
		<!--<div class="header">
			<div class="name">{{cargo.name}}</div>
		</div>-->
		<!--<div class="wear">{{Math.floor(100 * cargo.damage)}}%</div>-->
		
		<ul class="info">
			<li>
				<div class="round from"></div>
				<span class="city">
					<span>{{source.city.name}}</span>
					<small class="text-muted text-italic">{{source.company.name}}</small>
				</span>
			</li>
			<li>
				<div class="round to"></div>
				<span class="city">
					<span>{{destination.city.name}}</span>
					<small class="text-muted">{{destination.company.name}}</small>
				</span>
			</li>
			
			
			
			<li>
				<div class="round">
					<img src="../assets/Job/noun_stop_watch_2207126.svg"  alt="">
				</div>
				<span>{{formatDeliveryTime()}}</span>
			</li>
			<li>
				<div class="round">
					<img src="../assets/Job/noun_Money_285330.svg"  alt="">
				</div>
				<span>{{['?', '€', '$'][game.id]}} {{income.toLocaleString()}}</span>
			</li>
			
			<li>
				<div class="round">
					<img src="../assets/Job/noun_measure_1625696.svg" alt="">
				</div>
				<span>{{(distance / 1000).toFixed().toLocaleString()}} km</span>
			</li>
			
			<li>
				<div class="round">
					<img src="../assets/Job/noun_Weight_1644747.svg"  alt="">
				</div>
				<span>{{(cargo.mass / 1000).toFixed()}} t</span>
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
				background: url("../assets/Job/noun_Weight_1644747.svg") center center no-repeat;
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
		
		.info {
			padding-left: .5rem;
			margin: 0;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			
			li {
				list-style: none;
				display: flex;
				justify-content: flex-start;
				align-items: center;
				margin: .2rem 0;
				padding-left: 1.5rem;
				position: relative;
				background: linear-gradient(to right, var(--color-border), transparent);
				overflow: hidden;
				
				span {
					font-size: 1.5rem;
				}
				
				.city {
					span {
						line-height: 1.5rem;
					}
					
					& > * {
						display: block;
					}
				}
				
				@for $i from 1 through 8 {
					&:nth-child(#{$i}) {
						margin-left: ( $i - 1 ) * 1rem;
					}
				}
				
				&:before {
					content: ' ';
					position: absolute;
					width: 2rem;
					height: 4rem;
					background: var(--color-bg);
					border: 1px solid var(--color-red);
					border-width: 0 2px 0 0;
					transform-origin: bottom left;
					transform: skew(20deg, 0deg);
					left: -10px;
				}
			}
			
			.round {
				width: 2.5rem;
				height: 2.5rem;
				overflow: hidden;
				margin-right: 1rem;
				color: var(--color-text);
				background: var(--color-border);
				transform-origin: bottom left;
				transform: skew(20deg, 0deg);
				padding: 0 .5rem;
				vertical-align: center;
				
				
				&.from {
					border-radius: 10rem;
					background: #54D9A8;
				}
				
				&.to {
					border-radius: 10rem;
					background: #00FF0C;
				}
			}
		}
	}
</style>
