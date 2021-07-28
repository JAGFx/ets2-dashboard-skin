<template>
  <div class="fields mb-4">
    <h4>Unit</h4>

    <!-- <editor-folder> Game -->
    <ConfigFieldChoice
      v-bind="{
        id: 'unit_weight',
        label: 'Weight',
        disabled: false,
        description: 'Set the weight unit. Used for the weight of the cargo',
        values: fieldValues( 'unit_weight' )
      }"
    />
    <ConfigFieldChoice
      v-bind="{
        id: 'unit_length',
        label: 'Length',
        disabled: false,
        description: 'Set the length unit. Used for the distance of travel (job or point on the map)',
        values: fieldValues( 'unit_length' )
      }"
    />
    <ConfigFieldChoice
      v-bind="{
        id: 'unit_degrees',
        label: 'Degrees',
        disabled: false,
        description: 'Set degrees unit. Used for the temperature of water, oil and engine',
        values: fieldValues( 'unit_degrees' )
      }"
    />
    <ConfigFieldChoice
      v-bind="{
        id: 'unit_consumption',
        label: 'Consumption',
        disabled: false,
        description: 'Set the consumption unit',
        values: fieldValues( 'unit_consumption' )
      }"
    />
    <ConfigFieldChoice
      v-bind="{
        id: 'unit_degrees',
        label: 'Degrees',
        disabled: false,
        description: 'Set degrees unit. Used for the temperature of water, oil and engine',
        values: fieldValues( 'unit_degrees' )
      }"
    />
    <ConfigFieldChoice
      v-bind="{
        id: 'unit_volume',
        label: 'Volume',
        disabled: false,
        description: 'Set the volume unit. Used for the fuel capacity',
        values: fieldValues( 'unit_volume' )
      }"
    />
    <ConfigFieldChoice
      v-bind="{
        id: 'unit_pressure',
        label: 'Pressure',
        disabled: false,
        description: 'Set the pressure unit. Used for the Air pressure or oil pressure',
        values: fieldValues( 'unit_pressure' )
      }"
    />
    <ConfigFieldChoice
      v-bind="{
        id: 'unit_volume',
        label: 'Volume',
        disabled: false,
        description: 'Set the volume unit. Used for the fuel capacity',
        values: fieldValues( 'unit_volume' )
      }"
    />
    <ConfigFieldChoice
      v-bind="{
        id: 'unit_speed',
        label: 'Speed',
        disabled: false,
        description: 'Set the speed unit',
        values: fieldValues( 'unit_speed' )
      }"
    />
    <ConfigFieldChoice
      v-bind="{
        id: 'unit_currency',
        label: 'Currency',
        disabled: false,
        description: 'Set the currency unit',
        values: fieldValues( 'unit_currency' )
      }"
    />
    <!-- </editor-folder> -->
  </div>
</template>

<script>
import ConfigCategoryMixin from '@/mixins/ConfigCategoryMixin';

export default {
  name:   'ConfigCategoryUnits',
  mixins: [ ConfigCategoryMixin ]
};
</script>