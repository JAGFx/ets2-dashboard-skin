<template>
  <div>
    <div class="fields mb-4">
      <h4>Right</h4>

      <ConfigFieldChoice
        v-bind="{
          id: 'jagfx_elements_right_oilTemperature',
          label: 'Oil temperature',
          disabled: false,
          description: 'Display oil temperature value',
          values: fieldValues( 'on_off' )
        }"
      />
      <ConfigFieldChoice
        v-bind="{
          id: 'jagfx_elements_right_brakesTemperature',
          label: 'Brakes temperature',
          disabled: false,
          description: 'Display brakes temperature value',
          values: fieldValues( 'on_off' )
        }"
      />
      <ConfigFieldChoice
        v-bind="{
          id: 'jagfx_elements_right_brakesTemperature',
          label: 'Brakes temperature',
          disabled: false,
          description: 'Display brakes temperature value',
          values: fieldValues( 'on_off' )
        }"
      />
      <ConfigFieldChoice
        v-bind="{
          id: 'jagfx_elements_right_brakesAirPressure',
          label: 'Brakes air pressure',
          disabled: false,
          description: 'Display brakes air pressure value',
          values: fieldValues( 'on_off' )
        }"
      />
      <ConfigFieldChoice
        v-bind="{
          id: 'jagfx_elements_right_fuel',
          label: 'Fuel',
          disabled: false,
          description: 'Display the fuel level value',
          values: fieldValues( 'on_off' )
        }"
      />
      <ConfigFieldChoice
        v-bind="{
          id: 'jagfx_elements_right_fuelConsumption',
          label: 'Fuel consumption',
          disabled: false,
          description: 'Display the fuel average consumption value',
          values: fieldValues( 'on_off' )
        }"
      />
      <ConfigFieldChoice
        v-bind="{
          id: 'jagfx_elements_right_cruiseControl',
          label: 'Cruise control',
          disabled: false,
          description: 'Display the current speed set with the cruise control ON',
          values: fieldValues( 'on_off' )
        }"
      />
      <ConfigFieldChoice
        v-bind="{
          id: 'jagfx_elements_right_waterTemperature',
          label: 'Water temperature',
          disabled: false,
          description: 'Display the water temperature value',
          values: fieldValues( 'on_off' )
        }"
      />
      <ConfigFieldChoice
        v-bind="{
          id: 'jagfx_elements_right_batteryVoltage',
          label: 'Battery voltage',
          disabled: false,
          description: 'Display the battery voltage value',
          values: fieldValues( 'on_off' )
        }"
      />
      <ConfigFieldChoice
        v-bind="{
          id: 'jagfx_elements_right_restStop',
          label: 'Next rest stop',
          disabled: false,
          description: 'Display the time to go to the nex rest stop',
          values: fieldValues( 'on_off' )
        }"
      />
      <ConfigFieldChoice
        v-bind="{
          id: 'jagfx_elements_right_map',
          label: 'Display map',
          disabled: false,
          description: 'Enable or disable the map view',
          values: fieldValues( 'on_off' )
        }"
      />
    </div>
    <div class="fields mb-4">
      <h4>Middle - Top</h4>

      <ConfigFieldChoice
        v-bind="{
          id: 'jagfx_elements_mid_top_retarder',
          label: 'Retarder',
          disabled: false,
          description: 'Display the retarder indicator',
          values: fieldValues( 'on_off' )
        }"
      />
      <ConfigFieldChoice
        v-bind="{
          id: 'jagfx_elements_mid_top_parkingBrake',
          label: 'Parking brake',
          disabled: false,
          description: 'Display the parking brake indicator',
          values: fieldValues( 'on_off' )
        }"
      />
      <ConfigFieldChoice
        v-bind="{
          id: 'jagfx_elements_mid_top_beamHigh',
          label: 'Beam high',
          disabled: false,
          description: 'Display the high beam indicator',
          values: fieldValues( 'on_off' )
        }"
      />
      <ConfigFieldChoice
        v-bind="{
          id: 'jagfx_elements_mid_top_beamLow',
          label: 'Beam low',
          disabled: false,
          description: 'Display the low beam indicator',
          values: fieldValues( 'on_off' )
        }"
      />
      <ConfigFieldChoice
        v-bind="{
          id: 'jagfx_elements_mid_top_beacon',
          label: 'Beacon',
          disabled: false,
          description: 'Display the beacon indicator',
          values: fieldValues( 'on_off' )
        }"
      />
    </div>
    <div class="fields mb-4">
      <h4>Middle - Bottom</h4>

      <ConfigFieldChoice
        v-bind="{
          id: 'jagfx_elements_mid_bottom_rpm',
          label: 'RPM',
          disabled: false,
          description: 'Display the RPM value',
          values: fieldValues( 'on_off' )
        }"
      />
      <ConfigFieldChoice
        v-bind="{
          id: 'jagfx_elements_mid_bottom_fuel',
          label: 'Fuel',
          disabled: false,
          description: 'Display the fuel level indicator',
          values: fieldValues( 'on_off' )
        }"
      />
      <ConfigFieldChoice
        v-bind="{
          id: 'jagfx_elements_mid_bottom_speedLimit',
          label: 'Speed limit',
          disabled: false,
          description: 'Display the speed limit value',
          values: fieldValues( 'on_off' )
        }"
      />
      <ConfigFieldChoice
        v-bind="{
          id: 'jagfx_elements_mid_bottom_blinker_turn',
          label: 'Turning indicator',
          disabled: false,
          description: 'Display an indicator when the turn left or turn right blinker are ON',
          values: fieldValues( 'on_off' )
        }"
      />
    </div>
  </div>
</template>

<script>
import ConfigCategoryMixin from '@/mixins/ConfigCategoryMixin';

export default {
  name:   'ConfigCategoryJagfx',
  mixins: [ ConfigCategoryMixin ]
};
</script>