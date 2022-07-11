<template>
  <Dashboard v-slot="dashProps" class="default wrapper">
    <div
      class="dashboard"
      :class="{
        'game-connected': telemetry2.truck.ignitionIsTurnedOn,
        yes: telemetry2.truck.ignitionIsTurnedOn
      }"
      :style="{
        transform:
          'scale(' + dashProps.currentScale + ') translate(-50%, -50%)',
        width: dashProps.skinData.size.width + 'px',
        height: dashProps.skinData.size.height + 'px'
      }"
    >
      <div
        :class="{
          yes: telemetry2.job.hasAnActiveJob,
          hasJob: telemetry2.job.hasAnActiveJob
        }"
      >
        <!-- meters -->
        <Cadran
          v-bind="{
            classCSS: 'truck-speed',
            type: 'meter',
            value: telemetry2.truck.speed,
            min: $convertToUnit(2.77778, 'unit_speed'),
            max: $convertToUnit(38.8889, 'unit_speed'),
            minAngle: -114,
            maxAngle: 114
          }"
        />
        <div class="truck-speedRounded wrapper-area">
          <span>{{ telemetry2.truck.speed.toFixed(0) }}</span>
        </div>
        <div class="truck-speedRounded-unit wrapper-area">
          <span>{{ $unitReadable('unit_speed') }}</span>
        </div>
        <Cadran
          v-bind="{
            classCSS: 'truck-engineRpm',
            type: 'meter',
            value: telemetry2.truck.rpm,
            min: 0,
            max: 2400,
            minAngle: -97,
            maxAngle: 97
          }"
        />
        <Cadran
          v-bind="{
            classCSS: 'truck-fuel',
            type: 'meter',
            value: telemetry2.truck.fuelLevel,
            min: 0,
            max: telemetry2.truck.fuelCapacity,
            minAngle: -96,
            maxAngle: 0
          }"
        />
        <Cadran
          v-bind="{
            classCSS: 'truck-waterTemperature',
            type: 'meter',
            value: telemetry2.truck.engineWaterTemperature,
            min: 0,
            max: $convertToUnit(100, 'unit_degrees'),
            minAngle: -96,
            maxAngle: 0
          }"
        />
        <div class="truck-odometer wrapper-area">
          <span>{{ telemetry2.truck.odometer.toFixed(0) }}</span>
        </div>
        <div
          class="truck-cruiseControlSpeedRounded wrapper-area"
          :data-value="telemetry2.truck.cruiseControlSpeed"
        >
          <span>{{ telemetry2.truck.cruiseControlSpeed.toFixed(0) }}</span>
        </div>
        <div
          class="truck-gear wrapper-area"
          :data-value="telemetry2.truck.gearSelector"
        >
          <span>{{ telemetry2.truck.gearDisplayed }}</span>
        </div>
        <!-- indicators -->
        <div
          :class="{ yes: telemetry2.symbols.leftDirectionIsActive }"
          class="truck-blinkerLeftOn"
        >
          <i class="icon-blinker_left" />
        </div>
        <div
          :class="{ yes: telemetry2.symbols.rightDirectionIsActive }"
          class="truck-blinkerRightOn"
        >
          <i class="icon-blinker_right" />
        </div>
        <div
          :class="{ yes: telemetry2.symbols.cruiseControlIsEnabled }"
          class="truck-cruiseControlOn"
        />
        <div
          :class="{ yes: telemetry2.symbols.mainBeamIsEnabled }"
          class="truck-lightsBeamHighOn"
        />
        <div
          :class="{ yes: telemetry2.symbols.lowBeamIsEnabled }"
          class="truck-lightsBeamLowOn"
        />
        <div
          :class="{ yes: telemetry2.symbols.parkingBrakeIsEnabled }"
          class="truck-lightsParkingOn"
        />
        <div
          :class="{ yes: telemetry2.trailer.isAttached }"
          class="trailer-attached"
        />
        <div class="trailer-mass">
          {{ telemetry2.job.cargoWeightString }}
        </div>
        <div class="trailer-name">
          {{ telemetry2.job.cargoName }}
        </div>
        <!-- job information -->
        <table class="_job">
          <tr>
            <th>{{ $t('Time') }}:</th>
            <td>
              <span class="game-time">{{
                $dateTimeLocalized(
                  telemetry2.gameTime,
                  DATE_FORMAT_LONG,
                  TIME_FORMAT_SHORT
                )
              }}</span>
            </td>
          </tr>
          <tr>
            <th>{{ $t('Source') }}:</th>
            <td>
              <span class="hasJob _jobSource">
                <span class="job-sourceCity">
                  {{ telemetry2.job.departureCityName }}
                </span>
                (
                <span class="job-sourceCompany">
                  {{ telemetry2.job.departureCompanyName }}
                </span>
                )
              </span>
            </td>
          </tr>
          <tr>
            <th>{{ $t('Destination') }}:</th>
            <td>
              <span class="_jobDestionation">
                <span class="job-destinationCity">
                  {{ telemetry2.job.arrivalCityName }}
                </span>
                (
                <span class="job-destinationCompany">
                  {{ telemetry2.job.arrivalCompanyName }}
                </span>
                )
              </span>
            </td>
          </tr>
          <tr>
            <th>{{ $t('Deadline in') }}:</th>
            <td>
              <span class="job-remainingTime">
                {{
                  $dateTimeLocalized(
                    telemetry2.navigation.etaDueDate,
                    DATE_FORMAT_LONG,
                    TIME_FORMAT_SHORT
                  )
                }}
              </span>
              <span class="_jobIncome">
                (<span class="job-income">
                  {{ telemetry2.job.income }}
                  {{ $unitReadable('unit_currency') }} </span
                >)</span
              >
            </td>
          </tr>
        </table>
        <div class="d-flex wears flex-column">
          <div class="info w-100 d-flex justify-content-around">
            <span>{{ $t('Truck wear') }}:</span>
            <span class="wear">{{ telemetry2.truck.averageDamage }}%</span>
          </div>
          <div class="info w-100 d-flex justify-content-around">
            <span>{{ $t('Trailer damage') }}:</span>
            <span class="wear">
              {{ telemetry2.trailer.chassisDamage.toFixed(0) }}%
            </span>
          </div>
        </div>
      </div>
    </div>
  </Dashboard>
</template>

<script>
import Dashboard from '@/components/dashboards/Dashboard.vue';
import Cadran from '@/components/dashboards/shared/Cadran.vue';
import TelemetryMixin from '@/mixins/TelemetryMixin.vue';

export default {
  name: 'DafXFDashboard',
  components: {
    Dashboard,
    Cadran
  },
  mixins: [TelemetryMixin]
};
</script>
