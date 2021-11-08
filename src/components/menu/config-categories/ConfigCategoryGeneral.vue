<template>
  <div class="fields mb-4">
    <h4>{{ $t('General') }}</h4>

    <ConfigFieldChoice
      v-bind="{
        id: 'general_refresh_rate',
        label: 'Refresh rate',
        disabled: false,
        description: 'Set your refresh rate of the data. Less than rate are, more the dashboard data will up to date. You need to restart this app after change ;)',
        values: fieldValues( 'general_refresh_rate' ),
        target: 'app'
      }"
    />
    <ConfigFieldInput
      v-bind="{
        id: 'general_port',
        label: 'Port',
        disabled: false,
        description: 'Port used by the server',
        target: 'app'
      }"
    />
    <ConfigFieldChoice
      v-bind="{
        id: 'general_skin_on_load',
        label: 'Default skin loaded',
        disabled: false,
        description: 'Set the skin loaded when this app was started',
        values: fieldValues( 'general_skin_on_load' ),
        target: 'app'
      }"
    />
    <ConfigFieldChoice
      v-bind="{
        id: 'general_skin_locale',
        label: 'Langue',
        disabled: false,
        description: 'Choose your locale used on this app',
        values: fieldValues( 'general_skin_locale' ),
        target: 'app'
      }"
    />
    <ConfigFieldChoice
      v-bind="{
        id: 'general_job_remaining',
        label: 'Job delivery time',
        disabled: false,
        description: 'Display the due date or the remaining time for a job',
        values: fieldValues( 'general_job_remaining' ),
        target: 'app'
      }"
    />
    <ConfigFieldChoice
      v-bind="{
        id: 'general_h-shift-layout',
        label: 'H-Shifter layout',
        disabled: false,
        description: 'Show the current range of H-Shifter OR the automatic number',
        values: fieldValues( 'general_h-shift-layout' ),
        target: 'app'
      }"
    />
    <ConfigFieldChoice
      v-bind="{
        id: 'general_damage_accurate',
        label: 'Damage accurate',
        disabled: false,
        description: 'Show the average with value of \'Damage diagnostic\' or same as the \'Route advisor\'',
        values: fieldValues( 'general_damage_accurate' ),
        target: 'app'
      }"
    />
  </div>
</template>

<script>
import ConfigCategoryMixin from '@/mixins/ConfigCategoryMixin';

export default {
  name:   'ConfigCategoryGeneral',
  mixins: [ ConfigCategoryMixin ]
};
</script>