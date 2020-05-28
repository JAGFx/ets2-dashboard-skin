<template>
	<Dashboard class="default wrapper" v-slot:default="dashProps">
		<div class="dashboard game-connected yes" v-bind:style="{
			transform: 'scale(' + $scale( dashProps.skinData ) + ') translate(-50%, -50%)',
			width: dashProps.skinData.size.width + 'px',
			height: dashProps.skinData.size.height + 'px',
		}">
			<div :class="{'yes': job.cargo.id}" class="hasJob">
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
				<div class="truck-speedRounded wrapper-area"><span>{{ truck.speed.kph }}</span></div>
				<CadranElement v-bind="{
					'classCSS': 'truck-engineRpm',
					'type': 'meter',
					'value': truck.engine.rpm.value / 100,
					'min': 0,
					'max': 24,
					'minAngle' : -97,
					'maxAngle': 97,
				}"></CadranElement>
				<CadranElement v-bind="{
					'classCSS': 'truck-fuel',
					'type': 'meter',
					'value': truck.fuel.value,
					'min': 0,
					'max': truck.fuel.capacity,
					'minAngle' : -96,
					'maxAngle': 0,
				}"></CadranElement>
				<CadranElement v-bind="{
					'classCSS': 'truck-waterTemperature',
					'type': 'meter',
					'value': truck.engine.waterTemperature.value,
					'min': 0,
					'max': 100,
					'minAngle' : -96,
					'maxAngle': 0,
				}"></CadranElement>
				<div class="truck-odometer wrapper-area"><span>{{ truck.odometer.toFixed(0) }}</span></div>
				<div class="truck-cruiseControlSpeedRounded wrapper-area">
					<span>{{ truck.cruiseControl.kph }}</span></div>
				<div class="truck-gear wrapper-area"><span>{{ $trukGear( truck.transmission, truck.brand ) }}</span>
				</div>
				<!-- indicators -->
				<div :class="{ 'yes': truck.lights.blinker.left.active}" class="truck-blinkerLeftOn"></div>
				<div :class="{ 'yes': truck.lights.blinker.right.active }" class="truck-blinkerRightOn"></div>
				<div :class="{ 'yes': truck.cruiseControl.enabled }" class="truck-cruiseControlOn"></div>
				<div :class="{ 'yes': truck.lights.beamHigh.enabled }" class="truck-lightsBeamHighOn"></div>
				<div :class="{ 'yes': truck.lights.beamLow.enabled }" class="truck-lightsBeamLowOn"></div>
				<div :class="{ 'yes': truck.lights.parking.enabled }" class="truck-lightsParkingOn"></div>
				<div :class="{'yes': trailer.attached}" class="trailer-attached"></div>
				<div class="trailer-mass">{{ (job.cargo.mass / 1000).toFixed(1) }}<span class="ton">t</span>
				</div>
				<div class="trailer-name">{{ job.cargo.name }}</div>
				<!-- job information -->
				<table class="_job">
					<tr>
						<th>Time:</th>
						<td><span class="game-time">{{ game.time.unix | $dateTimeLocalized( DATE_FORMAT_LONG, TIME_FORMAT_SHORT ) }}</span>
						</td>
					</tr>
					<tr>
						<th>Source:</th>
						<td>
							<span class="hasJob _jobSource">
								<span class="job-sourceCity">{{ job.source.city.name }}</span>
								(<span class="job-sourceCompany">{{ job.source.company.name }}</span>)
							</span>
						</td>
					</tr>
					<tr>
						<th>Destination:</th>
						<td>
							<span class="hasJob _jobDestionation">
								<span class="job-destinationCity">{{ job.destination.city.name }}</span>
								(<span class="job-destinationCompany">{{ job.destination.company.name }}</span>)
							</span>
						</td>
					</tr>
					<tr>
						<th>Deadline in:</th>
						<td>
							<span class="job-remainingTime">{{ job.deliveryTime.unix | $dateTimeLocalized( DATE_FORMAT_LONG, TIME_FORMAT_SHORT ) }}</span>
							<span class="_jobIncome"> (€ <span class="job-income">{{ job.income.toLocaleString() }}</span>)</span>
						</td>
					</tr>
				</table>
				<div class="_truckWearInfo">Truck <br />wear: <span class="truck-wearSum">{{ $averageDamage( truck.damage ) }}%</span>
				</div>
				<div class="_trailerWearInfo">Trailer <br />damage: <span class="trailer-wear">{{ trailer.chassis.damage.toFixed(0) }}%</span>
				</div>
			</div>
		</div>
	</Dashboard>
</template>

<script>
	import CadranElement from '../../../components/Elements/CadranElement';
	import Dashboard     from '../../../components/Elements/Dashboard';
	import AppDashMixins    from '../../../components/Mixins/AppDashMixins';
	
	export default {
		name:       'DashDefault',
		components: {
			Dashboard,
			CadranElement
		},
		mixins:     [ AppDashMixins ]
	};
</script>

<style lang="scss" scoped>
	@import "../assets/scss/default";
</style>
