<template>
  <div class="fields mb-4">
    <h4>{{ $t('Scania') }}</h4>

    <ConfigFieldChoice
      v-bind="{
        id: 'scania_default_menu',
        label: 'Default menu',
        disabled: false,
        description:
          'Set the default menu for the Scania dashboard skin. It is displayed when you use this dashboard.',
        values: fieldValues('scania_default_menu'),
        target: 'game'
      }"
    />
  </div>
</template>

<script>
import ConfigCategoryMixin from '@/mixins/ConfigCategoryMixin';

export default {
  name: 'ConfigCategoryScania',
  mixins: [ConfigCategoryMixin]
};
</script>
