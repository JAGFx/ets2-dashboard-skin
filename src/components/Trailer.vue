<template>
	<div class="trailer capitalized">
		<div class="t-info">
			<div class="trailer-data">
				<span>{{bodyType}}</span>
				<small>{{chainType}}</small>
				<span>
					<small class="trailer-plate">{{licensePlate.value}}<span class="flag">{{getFlag()}}</span></small>
				</span>
			</div>
			<div class="job-data">
				<div class="job">{{cargo.name}}</div>
				<div class="damage">{{Math.floor(100 * cargo.damage)}}%</div>
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
	
	<!--<template v-slot:chassis>
	  <div class="chassis list">
		<div><b>Position X:</b><span>{{position.X}}</span></div>
		<div><b>Position Y:</b><span>{{position.Y}}</span></div>
		<div><b>Position Z:</b><span>{{position.Z}}</span></div>
		<div><b>Orientation heading:</b><span>{{orientation.heading}}</span></div>
		<div><b>Orientation pitch:</b><span>{{orientation.pitch}}</span></div>
		<div><b>Orientation roll:</b><span>{{orientation.roll}}</span></div>
		<div><b>Linear velocity X:</b><span>{{acceleration.linearVelocity.X}}</span></div>
		<div><b>Linear velocity Y:</b><span>{{acceleration.linearVelocity.Y}}</span></div>
		<div><b>Linear velocity Z:</b><span>{{acceleration.linearVelocity.Z}}</span></div>
		<div><b>Angular velocity X:</b><span>{{acceleration.angularVelocity.X}}</span></div>
		<div><b>Angular velocity Y:</b><span>{{acceleration.angularVelocity.Y}}</span></div>
		<div><b>Angular velocity Z:</b><span>{{acceleration.angularVelocity.Z}}</span></div>
		<div><b>Linear acceleration X:</b><span>{{acceleration.linearAcceleration.X}}</span></div>
		<div><b>Linear acceleration Y:</b><span>{{acceleration.linearAcceleration.Y}}</span></div>
		<div><b>Linear acceleration Z:</b><span>{{acceleration.linearAcceleration.Z}}</span></div>
		<div><b>Angular acceleration X:</b><span>{{acceleration.angularAcceleration.X}}</span></div>
		<div><b>Angular acceleration Y:</b><span>{{acceleration.angularAcceleration.Y}}</span></div>
		<div><b>Angular acceleration Z:</b><span>{{acceleration.angularAcceleration.Z}}</span></div>
	  </div>
	</template>

	<template v-slot:hook>
	  <div class="hook list">
		<div><b>Position X:</b><span>{{hook.position.X}}</span></div>
		<div><b>Position Y:</b><span>{{hook.position.Y}}</span></div>
		<div><b>Position Z:</b><span>{{hook.position.Z}}</span></div>
	  </div>
	</template>

	<template v-slot:wheels>
	  <div class="wheels">
		<Wheel v-for="wheel, i in wheels" v-bind="{...wheel, id: i+1}"/>
	  </div>
	</template>

	<template v-slot:damage>
	  <div class="damages list">
		<div class="damage" v-for="key in Object.keys(damage)">
		  <b>{{key}}</b><div>{{(100 * damage[key]).toFixed()}}%</div>
		</div>
	  </div>
	</template>-->
</template>

<script>
	import Window from '@/components/Window.vue';
	
	export default {
		name: 'Trailers',
		
		components: {
			Window
		},
		/*components: { Window, Wheel },*/
		
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
			getFlag: function () {
				switch ( this.licensePlate.country.id ) {
					case 'norway':
						return  '🇳🇴';
						break;
					case 'france':
						return '🇫🇷';
						break;
					default:
						return '🏳️';
						break;
				}
			}
		}
	};
</script>

<style scoped lang="scss">
	.trailer {
		
		.t-info {
			display: flex;
			justify-content: space-between;
			width: 100%;
			height: 100%;
			min-height: 5rem;
			max-height: 6rem;
			align-items: stretch;
			
			.trailer-data{
				width: 100%;
				padding: 0 1rem 0.5rem;
				display: flex;
				justify-content: space-between;
				flex-direction: column;
				
				.trailer-plate {
					padding: 0 0 0 .2rem;
					background: var(--color-red);
					color: var(--color-bg);
					font-size: .9rem;
					display: inline-flex;
					
					.flag {
						padding: 0 .2rem;
						margin-left: .2rem;
						background: var(--color-window);
						color: var(--color-text);
						height: 100%;
					}
				}
				
				> * {
					display: block;
					
				}
			}
			
			.job-data {
				width: 100%;
				padding: 0 1rem 0.5rem;
				display: flex;
				flex-direction: column;
				
				.job {
					height: 100%;
					text-align: center;
				}
				
				.damage{
					background: #ff0000;
					width: 100%;
					display: flex;
					justify-content: center;
					font-size: .9rem;
					
					> * {
						display: block;
						width: 100%;
						padding: 0 .7rem;
						text-align: center;
					}
				}
			}
			
		}
	}
</style>
