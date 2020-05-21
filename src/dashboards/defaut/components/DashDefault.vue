<template>
	<Dashboard class="default wrapper" v-slot:default="dashProps">
		<div class="dashboard game-connected yes" v-bind:style="{
			transform: 'scale(' + $scale( dashProps.skinData ) + ') translate(-50%, -50%)',
			width: dashProps.skinData.size.width + 'px',
			height: dashProps.skinData.size.height + 'px',
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
					'value': $truckSpeed(),
					'min': 0,
					'max': 140,
					'minAngle' : -114,
					'maxAngle': 114,
				}"></CadranElement>
				<div class="truck-speedRounded wrapper-area"><span>{{ dashProps.truck.speed.kph }}</span></div>
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
				<div class="truck-odometer wrapper-area"><span>{{ dashProps.truck.odometer.toFixed(0) }}</span></div>
				<div class="truck-cruiseControlSpeedRounded wrapper-area">
					<span>{{ dashProps.truck.cruiseControl.kph }}</span></div>
				<div class="truck-gear wrapper-area"><span>{{ $trukGear( dashProps.truck.transmission, dashProps.truck.brand ) }}</span>
				</div>
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
						<td><span class="game-time">{{ $formatTime( $telemetryData().game.time.unix ) }}</span></td>
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
						<td>
							<span class="job-remainingTime">{{ $formatDate( $telemetryData().job.deliveryTime.unix ) }}</span>
							<span class="_jobIncome"> (€ <span class="job-income">{{ dashProps.job.income.toLocaleString() }}</span>)</span>
						</td>
					</tr>
				</table>
				<div class="_truckWearInfo">Truck <br />wear: <span class="truck-wearSum">{{ $averageDamage( dashProps.truck.damage ) }}%</span>
				</div>
				<div class="_trailerWearInfo">Trailer <br />damage: <span class="trailer-wear">{{ dashProps.trailer.chassis.damage.toFixed(0) }}%</span>
				</div>
			</div>
		</div>
	</Dashboard>
</template>

<script>
	import CadranElement from '../../../components/Elements/CadranElement';
	import Dashboard     from '../../../components/Elements/Dashboard';
	import dashMixins    from '../../../components/Mixins/dashMixins';
	
	export default {
		name:       'DashDefault',
		components: {
			Dashboard,
			CadranElement
		},
		mixins:     [ dashMixins ]
	};
</script>

<style lang="scss" scoped>
	@import "../assets/scss/default";
</style>
