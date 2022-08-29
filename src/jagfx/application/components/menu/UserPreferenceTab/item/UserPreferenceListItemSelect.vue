<template>
  <UserPreferenceListItem
    v-slot="preferenceEntry"
    :configuration-id="configurationId"
  >
    <select
      class="form-select form-select-sm"
      aria-label="Default select example"
    >
      <option
        v-for="value in loadValues(preferenceEntry)"
        :key="value.value"
        :value="value.value"
      >
        {{ value.label }}
      </option>
    </select>
  </UserPreferenceListItem>
</template>

<script setup>
import { loadPreferenceEntryValues } from '@/jagfx/core/configuration/preference-entry/loader';

import UserPreferenceListItem from '@/jagfx/application/components/menu/UserPreferenceTab/UserPreferenceListItem.vue';

const props = defineProps({
  configurationId: {
    type: String,
    required: true
  },
  values: {
    type: Array,
    required: false,
    default: () => []
  }
});

const loadValues = (preferenceEntry) => {
  return props.values.length > 0
    ? props.values
    : loadPreferenceEntryValues(preferenceEntry);
};
</script>

<style lang="scss" scoped></style>
