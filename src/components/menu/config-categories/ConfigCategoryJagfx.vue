<template>
  <div>
    <div class="fields mb-4">
      <h4>{{ $t('Right') }}</h4>

      <ConfigFieldChoice
        v-bind="{
          id: 'jagfx_elements_right_oilTemperature',
          label: 'Oil temperature',
          disabled: false,
          description: 'Display oil temperature',
          values: fieldValues('on_off'),
          target: 'game'
        }"
      />
      <ConfigFieldChoice
        v-bind="{
          id: 'jagfx_elements_right_brakesTemperature',
          label: 'Brakes temperature',
          disabled: false,
          description: 'Display brakes temperature',
          values: fieldValues('on_off'),
          target: 'game'
        }"
      />
      <ConfigFieldChoice
        v-bind="{
          id: 'jagfx_elements_right_brakesAirPressure',
          label: 'Brakes air pressure',
          disabled: false,
          description: 'Display brakes air pressure',
          values: fieldValues('on_off'),
          target: 'game'
        }"
      />
      <ConfigFieldChoice
        v-bind="{
          id: 'jagfx_elements_right_fuel',
          label: 'Fuel',
          disabled: false,
          description: 'Display the fuel level',
          values: fieldValues('on_off'),
          target: 'game'
        }"
      />
      <ConfigFieldChoice
        v-bind="{
          id: 'jagfx_elements_right_fuelConsumption',
          label: 'Fuel consumption',
          disabled: false,
          description: 'Display the fuel average consumption',
          values: fieldValues('on_off'),
          target: 'game'
        }"
      />
      <ConfigFieldChoice
        v-bind="{
          id: 'jagfx_elements_right_cruiseControl',
          label: 'Cruise control',
          disabled: false,
          description:
            'Display the current speed set with the cruise control ON',
          values: fieldValues('on_off'),
          target: 'game'
        }"
      />
      <ConfigFieldChoice
        v-bind="{
          id: 'jagfx_elements_right_waterTemperature',
          label: 'Water temperature',
          disabled: false,
          description: 'Display the water temperature',
          values: fieldValues('on_off'),
          target: 'game'
        }"
      />
      <ConfigFieldChoice
        v-bind="{
          id: 'jagfx_elements_right_batteryVoltage',
          label: 'Battery voltage',
          disabled: false,
          description: 'Display the battery voltage',
          values: fieldValues('on_off'),
          target: 'game'
        }"
      />
      <ConfigFieldChoice
        v-bind="{
          id: 'jagfx_elements_right_restStop',
          label: 'Next rest stop',
          disabled: false,
          description: 'Display the time to go to the next rest stop',
          values: fieldValues('on_off'),
          target: 'game'
        }"
      />
      <ConfigFieldChoice
        v-bind="{
          id: 'jagfx_elements_right_map',
          label: 'Display map',
          disabled: false,
          description: 'Enable or disable the map view',
          values: fieldValues('on_off'),
          target: 'game'
        }"
      />
    </div>
    <div class="fields mb-4">
      <h4>{{ $t('Middle - Top') }}</h4>

      <ConfigFieldChoice
        v-bind="{
          id: 'jagfx_elements_mid_top_retarder',
          label: 'Retarder',
          disabled: false,
          description: 'Display the retarder indicator',
          values: fieldValues('on_off'),
          target: 'game'
        }"
      />
      <ConfigFieldChoice
        v-bind="{
          id: 'jagfx_elements_mid_top_parkingBrake',
          label: 'Parking brake',
          disabled: false,
          description: 'Display the parking brake indicator',
          values: fieldValues('on_off'),
          target: 'game'
        }"
      />
      <ConfigFieldChoice
        v-bind="{
          id: 'jagfx_elements_mid_top_beamHigh',
          label: 'Beam high',
          disabled: false,
          description: 'Display the high beam indicator',
          values: fieldValues('on_off'),
          target: 'game'
        }"
      />
      <ConfigFieldChoice
        v-bind="{
          id: 'jagfx_elements_mid_top_beamLow',
          label: 'Beam low',
          disabled: false,
          description: 'Display the low beam indicator',
          values: fieldValues('on_off'),
          target: 'game'
        }"
      />
      <ConfigFieldChoice
        v-bind="{
          id: 'jagfx_elements_mid_top_beacon',
          label: 'Beacon',
          disabled: false,
          description: 'Display the beacon indicator',
          values: fieldValues('on_off'),
          target: 'game'
        }"
      />
    </div>
    <div class="fields mb-4">
      <h4>{{ $t('Middle - Bottom') }}</h4>

      <ConfigFieldChoice
        v-bind="{
          id: 'jagfx_elements_mid_bottom_rpm',
          label: 'RPM',
          disabled: false,
          description: 'Display the RPM',
          values: fieldValues('on_off'),
          target: 'game'
        }"
      />
      <ConfigFieldChoice
        v-bind="{
          id: 'jagfx_elements_mid_bottom_fuel',
          label: 'Fuel',
          disabled: false,
          description: 'Display the fuel level indicator',
          values: fieldValues('on_off'),
          target: 'game'
        }"
      />
      <ConfigFieldChoice
        v-bind="{
          id: 'jagfx_elements_mid_bottom_speedLimit',
          label: 'Speed limit',
          disabled: false,
          description: 'Display the speed limit',
          values: fieldValues('on_off'),
          target: 'game'
        }"
      />
      <ConfigFieldChoice
        v-bind="{
          id: 'jagfx_elements_mid_bottom_blinker_turn',
          label: 'Turning indicator',
          disabled: false,
          description:
            'Display an indicator when the turn left or turn right blinker are ON',
          values: fieldValues('on_off'),
          target: 'game'
        }"
      />
    </div>
  </div>
</template>

<script>
import ConfigCategoryMixin from '@/mixins/ConfigCategoryMixin';

export default {
  name: 'ConfigCategoryJagfx',
  mixins: [ConfigCategoryMixin]
};
</script>
