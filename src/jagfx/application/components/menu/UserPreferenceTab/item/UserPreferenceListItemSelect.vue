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

defineProps({
  configurationId: {
    type: String,
    required: true
  }
});

const loadValues = (preferenceEntry) =>
  loadPreferenceEntryValues(preferenceEntry);
</script>

<style lang="scss" scoped></style>
