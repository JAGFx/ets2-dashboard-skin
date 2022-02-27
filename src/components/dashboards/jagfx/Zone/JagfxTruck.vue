<template>
  <div class="truck d-flex flex-column h-100">
    <div class="t-info">
      <div class="theTruk">
        <div class="truck-data">
          <span />
          <small>
            <span>{{ telemetry2.truck.modelName }}</span>
          </small>
        </div>
        <div class="truck-stats">
          <div class="damage right">
            <span>{{ telemetry2.truck.damage }} %</span>
          </div>
          <span>
            <span class="licencePlate right">
              <span class="flag">
                {{ telemetry2.truck.countryFlagOfLicensePlate }}
              </span>
              <span class="w-100 text-center">
                <span>{{ telemetry2.truck.licensePlate }}</span>
              </span>
            </span>
          </span>
        </div>
      </div>
    </div>

    <Map
      v-if="config('jagfx_elements_right_map')"
      :embedded="true"
      class="dash-element mx-3 my-2 theMap"
    />
    <ul v-else class="dash-element right">
      <!-- Cruise control -->
      <li
        v-if="elementIsEnabled('jagfx_elements_right_cruiseControl')"
        :class="{
          green: telemetry2.truck.cruiseControlIsEnabled,
          disabled: !telemetry2.truck.cruiseControlIsEnabled
        }"
      >
        <span v-show="!telemetry2.truck.cruiseControlIsEnabled">{{
          $t('OFF')
        }}</span>
        <span v-show="telemetry2.truck.cruiseControlIsEnabled">
          {{ telemetry2.truck.cruiseControlSpeed }}
          {{ $unitReadable('unit_speed') }}
        </span>
        <div class="round">
          <i class="icon-cruise_control" />
        </div>
      </li>

      <!-- Fuel -->
      <li
        v-if="elementIsEnabled('jagfx_elements_right_fuel')"
        class="blue"
        :class="{
          orange: telemetry2.symbols.fuelLevelIsLow
        }"
      >
        <span>
          {{ telemetry2.truck.fuelLevel.toFixed(0) }}
          {{ $unitReadable('unit_volume') }}
        </span>
        <div class="round">
          <i class="icon-fuel" />
        </div>
      </li>

      <!-- Fuel consumption -->
      <li
        v-if="elementIsEnabled('jagfx_elements_right_fuelConsumption')"
        class="white"
      >
        <span>
          {{ telemetry2.truck.fuelAverageConsumption }}
          {{ $unitReadable('unit_consumption') }}
        </span>
        <div class="round">
          <i class="icon-fuel_consumption" />
        </div>
      </li>

      <!-- Next rest stop -->
      <li
        v-if="elementIsEnabled('jagfx_elements_right_restStop')"
        class="default"
      >
        <span>
          in {{ $nextRestStopFormater(telemetry2.navigation.nextRestStopTime) }}
        </span>
        <div class="round">
          <i class="icon-rest_stop" />
        </div>
      </li>

      <!-- Air pressure -->
      <li
        v-if="elementIsEnabled('jagfx_elements_right_brakesAirPressure')"
        class="blue"
        :class="{
          orange: telemetry2.symbols.brakePressureIsLow,
          red: telemetry2.symbols.brakePressureIsCriticalLow
        }"
      >
        <span>
          {{ telemetry2.truck.brakeAirPressure.toFixed(0) }}
          {{ $unitReadable('unit_pressure') }}
        </span>
        <div class="round">
          <i class="icon-air_pressure" />
        </div>
      </li>

      <!-- Oil temperature -->
      <li
        v-if="elementIsEnabled('jagfx_elements_right_oilTemperature')"
        class="default"
      >
        <span>
          {{ telemetry2.truck.engineOilTemperature.toFixed(1) }}
          {{ $unitReadable('unit_degrees') }}
        </span>
        <div class="round">
          <i class="icon-oil" />
        </div>
      </li>

      <!-- Brakes temparature -->
      <li
        v-if="elementIsEnabled('jagfx_elements_right_brakesTemperature')"
        class="white"
      >
        <span>
          {{ telemetry2.truck.brakeTemperature.toFixed(1) }}
          {{ $unitReadable('unit_degrees') }}
        </span>
        <div class="round">
          <i class="icon-brakes_temperature" />
        </div>
      </li>

      <!-- Water temperature -->
      <li
        v-if="elementIsEnabled('jagfx_elements_right_waterTemperature')"
        class="blue"
        :class="{
          orange: telemetry2.symbols.engineWaterTemperatureIsHot
        }"
      >
        <span>
          {{ telemetry2.truck.engineWaterTemperature.toFixed(1) }}
          {{ $unitReadable('unit_degrees') }}
        </span>
        <div class="round">
          <i class="icon-water_temperature" />
        </div>
      </li>

      <!-- Battery -->
      <li
        v-if="elementIsEnabled('jagfx_elements_right_batteryVoltage')"
        class="blue"
        :class="{
          orange: telemetry2.symbols.batteryVoltageIdLow
        }"
      >
        <span>{{ Math.round(telemetry2.truck.batteryVoltage) }} V</span>
        <div class="round">
          <i class="icon-battery" />
        </div>
      </li>

      <!-- Empty -->
      <li v-for="i in indexEmptyElement()" :key="i" class="disabled">
        <span />
        <div class="round" />
      </li>
    </ul>
  </div>
</template>

<script>
import JagfxConfigMixins from '@/components/dashboards/jagfx/JagfxConfigMixins';
import Map from '@/components/dashboards/shared/Map';
import TelemetryMixin from '@/mixins/TelemetryMixin';

export default {
  name: 'JagfxTruck',
  components: { Map },
  mixins: [JagfxConfigMixins, TelemetryMixin],
  methods: {
    indexEmptyElement: function () {
      const elementLength = this.$elementsLength('right');
      const maxElement = this.maxElements['right'];
      const diff = maxElement - elementLength;

      return diff <= 0 ? 0 : diff;
    },
    elementIsEnabled: function (element) {
      return this.$elementIsEnabled('right', element);
    }
  }
};
</script>
