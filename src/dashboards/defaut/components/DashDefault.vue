<template>
	<Dashboard class="default wrapper" v-slot:default="dashProps">
		<div class="dashboard game-connected yes" v-bind:style="{
			transform: 'scale(' + scale( dashProps.skinData ) + ') translate(-50%, -50%)'
		}">
			<div :class="{'yes': dashProps.job.cargo.id}" class="hasJob">
				<!-- meters -->
				<!--
					Attributes:
					data-min-angle: angle in degress for the arrow for data-min value (0 = vertical, negative = left, positive = right)
					data-max-angle: an gle in degress for the arrow for data-max value (0 = vertical, negative = left, positive = right)
					data-min: minimal possible value (as in JSON response), you may also use any telemetry property name for dynamic values
					data-max: maximum possible value (as in JSON response), you may also use any telemetry property name for dynamic values
					-->
				<CadranElement v-bind="{
					'classCSS': 'truck-speed',
					'type': 'meter',
					'value': dashProps.truck.speed.kph,
					'min': 0,
					'max': 140,
					'minAngle' : -114,
					'maxAngle': 114,
				}"></CadranElement>
				<div class="truck-speedRounded">{{ dashProps.truck.speed.kph }}</div>
				<CadranElement v-bind="{
					'classCSS': 'truck-engineRpm',
					'type': 'meter',
					'value': dashProps.truck.engine.rpm.value / 100,
					'min': 0,
					'max': 24,
					'minAngle' : -97,
					'maxAngle': 97,
				}"></CadranElement>
				<CadranElement v-bind="{
					'classCSS': 'truck-fuel',
					'type': 'meter',
					'value': dashProps.truck.fuel.value,
					'min': 0,
					'max': dashProps.truck.fuel.capacity,
					'minAngle' : -96,
					'maxAngle': 0,
				}"></CadranElement>
				<CadranElement v-bind="{
					'classCSS': 'truck-waterTemperature',
					'type': 'meter',
					'value': dashProps.truck.engine.waterTemperature.value,
					'min': 0,
					'max': 100,
					'minAngle' : -96,
					'maxAngle': 0,
				}"></CadranElement>
				<div class="truck-odometer">{{ dashProps.truck.odometer.toFixed(0) }}</div>
				<div class="truck-cruiseControlSpeedRounded">{{ dashProps.truck.cruiseControl.kph }}</div>
				<div class="truck-gear">{{ truckGear() }}</div>
				<!-- indicators -->
				<div :class="{ 'yes': dashProps.truck.lights.blinker.left.active}" class="truck-blinkerLeftOn"></div>
				<div :class="{ 'yes': dashProps.truck.lights.blinker.right.active }" class="truck-blinkerRightOn"></div>
				<div :class="{ 'yes': dashProps.truck.cruiseControl.enabled }" class="truck-cruiseControlOn"></div>
				<div :class="{ 'yes': dashProps.truck.lights.beamHigh.enabled }" class="truck-lightsBeamHighOn"></div>
				<div :class="{ 'yes': dashProps.truck.lights.beamLow.enabled }" class="truck-lightsBeamLowOn"></div>
				<div :class="{ 'yes': dashProps.truck.lights.parking.enabled }" class="truck-lightsParkingOn"></div>
				<div :class="{'yes': dashProps.trailer.attached}" class="trailer-attached"></div>
				<div class="trailer-mass">{{ (dashProps.job.cargo.mass / 1000).toFixed(1) }}<span class="ton">t</span>
				</div>
				<div class="trailer-name">{{ dashProps.job.cargo.name }}</div>
				<!-- job information -->
				<table class="_job">
					<tr>
						<th>Time:</th>
						<td><span class="game-time">{{ formatedTime() }}</span></td>
					</tr>
					<tr>
						<th>Source:</th>
						<td>
							<span class="hasJob _jobSource">
								<span class="job-sourceCity">{{ dashProps.job.source.city.name }}</span>
								(<span class="job-sourceCompany">{{ dashProps.job.source.company.name }}</span>)
							</span>
						</td>
					</tr>
					<tr>
						<th>Destination:</th>
						<td>
							<span class="hasJob _jobDestionation">
								<span class="job-destinationCity">{{ dashProps.job.destination.city.name }}</span>
								(<span class="job-destinationCompany">{{ dashProps.job.destination.company.name }}</span>)
							</span>
						</td>
					</tr>
					<tr>
						<th>Deadline in:</th>
						<td><span class="job-remainingTime">{{ formatedTimestamp() }}</span>
							<span class="_jobIncome"> (€ <span class="job-income">{{ dashProps.job.income }}</span>)</span>
						</td>
					</tr>
				</table>
				<div class="_truckWearInfo">Truck <br />wear: <span class="truck-wearSum">{{ truckWear() }}%</span>
				</div>
				<div class="_trailerWearInfo">Trailer <br />damage: <span class="trailer-wear">{{ dashProps.trailer.chassis.damage }}%</span>
				</div>
			</div>
		</div>
	</Dashboard>
</template>

<script>
	import Dashboard     from '../../../components/Elements/Dashboard';
	import CadranElement from './Elements/CadranElement';
	
	export default {
		name:       'DashDefault',
		components: {
			Dashboard,
			CadranElement
		},
		methods:    {
			double:            function ( num ) {
				return num < 10 ? `0${ num }` : num;
			},
			formatedTime:      function () {
				const telemetryData = this.telemetryData();
				const date          = new Date( telemetryData.game.time.unix );
				
				const days = [ 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat' ];
				
				return `${ days[ date.getUTCDay() ] } ${ this.double( date.getUTCHours() ) }:${ this.double( date.getUTCMinutes() ) }`;
			},
			formatedTimestamp: function () {
				const telemetryData = this.telemetryData();
				const d             = new Date( telemetryData.job.deliveryTime.unix );
				const dys           = d.getUTCDate() - 1;
				const hrs           = d.getUTCHours();
				const mnt           = d.getUTCMinutes();
				let o               = dys > 1 ? dys + ' days ' : (dys != 0 ? dys + ' day ' : '');
				if ( hrs > 0 )
					o += hrs > 1 ? hrs + ' hours ' : hrs + ' hour ';
				if ( mnt > 0 )
					o += mnt > 1 ? mnt + ' minutes' : mnt + ' minute';
				if ( !o )
					o = '';
				return o;
			},
			truckWear() {
				const telemetryData  = this.telemetryData();
				const wearSumPercent = telemetryData.truck.damage.cabin * 100 +
									   telemetryData.truck.damage.chassis * 100 +
									   telemetryData.truck.damage.engine * 100 +
									   telemetryData.truck.damage.transmission * 100 +
									   telemetryData.truck.damage.wheels * 100;
				return Math.min( wearSumPercent, 100 );
			},
			truckGear() {
				const telemetryData = this.telemetryData();
				let gear            = telemetryData.truck.transmission.gear.displayed;
				gear                = gear > 0
					? 'D' + gear
					: (gear < 0 ? 'R' + Math.abs( gear ) : 'N');
				
				return gear;
			},
			telemetryData() {
				return this.$children[ 0 ].telemetryData();
			},
			scale( currentSkin ) {
				const scaleX = (currentSkin.size.width === 0)
					? 1
					: window.innerWidth / currentSkin.size.width;
				
				const scaleY = (currentSkin.size.height === 0)
					? 1
					: (window.innerHeight - 41) / currentSkin.size.height;
				
				return Math.min( scaleX, scaleY );
			}
		}
	};
</script>

<style lang="scss" scoped>
	@import "../assets/scss/default";
</style>
