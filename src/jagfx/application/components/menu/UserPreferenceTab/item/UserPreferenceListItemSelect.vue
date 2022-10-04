<template>
  <UserPreferenceListItem
      v-slot="preferenceEntry"
      :configuration-id="configurationId"
  >
    <select
        class="form-select form-select-sm"
        aria-label="Default select example"
        @input="(value : UserPreferenceValue) => setUserPreference(props.configurationId, value)"
        :value="() => getUserPreference(props.configurationId)"
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

<script setup lang="ts">
import UserPreferenceListItem from '@/jagfx/application/components/menu/UserPreferenceTab/UserPreferenceListItem.vue';
import { useUserPreferences } from '@/jagfx/application/components/shared/useUserPreferences';

import { loadPreferenceEntryValues } from '@/jagfx/core/configuration/preference-entry/loader';
import {
  PreferenceEntry,
  PreferenceEntryValue
}                                    from '@/jagfx/core/configuration/preference-entry/preference-entry.type';
import { UserPreferenceValue }       from '@/jagfx/core/configuration/user-preference.type';

const { getUserPreference, setUserPreference } = useUserPreferences();

const props = defineProps( {
  configurationId: {
    type:     String,
    required: true
  },
  values:          {
    type:     Array,
    required: false,
    default:  () => []
  }
} );

const loadValues: PreferenceEntryValue[] | null = ( preferenceEntry: PreferenceEntry | null ): PreferenceEntryValue[] | null => {
  return props.values.length > 0
         ? props.values
         : loadPreferenceEntryValues( preferenceEntry );
};
</script>

<style lang="scss" scoped></style>
