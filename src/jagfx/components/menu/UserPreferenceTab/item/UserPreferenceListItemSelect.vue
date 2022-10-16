<template>
  <UserPreferenceListItem>
    <select
      class="form-select form-select-sm"
      aria-label="Default select example"
      :value="() => getUserPreference(props.configurationId)"
      @input="(value) => setUserPreference(props.configurationId, value)"
    >
      <option
        v-for="value in loadValues(preferenceEntry)"
        :key="value.value"
        :value="value.value"
      >
        {{ $t(value.label) }}
      </option>
    </select>
  </UserPreferenceListItem>
</template>

<script setup lang="ts">
import { loadPreferenceEntryValues } from 'ets2-dashboard-lib/jagfx/configuration/preference-entry/loader';
import {
  PreferenceEntry,
  PreferenceEntryValue
} from 'ets2-dashboard-lib/jagfx/configuration/preference-entry/preference-entry.type';

import UserPreferenceListItem from '@/jagfx/components/menu/UserPreferenceTab/UserPreferenceListItem.vue';
import { usePreferencesEntry } from '@/jagfx/components/menu/UserPreferenceTab/usePreferencesEntry';
import { useUserPreferences } from '@/jagfx/components/shared/useUserPreferences';

const { getUserPreference, setUserPreference } = useUserPreferences();
const { initProvider } = usePreferencesEntry();

type UserPreferenceListItemSelectProps = {
  preferenceEntryId: string;
  values?: PreferenceEntryValue[];
};

const props = withDefaults(defineProps<UserPreferenceListItemSelectProps>(), {
  values: () => []
});

const preferenceEntry: PreferenceEntry = initProvider(props.preferenceEntryId);

const loadValues = (
  preferenceEntry: PreferenceEntry | null
): PreferenceEntryValue[] | null => {
  return props.values.length > 0
    ? props.values
    : loadPreferenceEntryValues(preferenceEntry);
};
</script>

<style lang="scss" scoped></style>
