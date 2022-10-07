<template>
  <UserPreferenceListItem>
    <select
      class="form-select form-select-sm"
      aria-label="Default select example"
      :value="() => getUserPreference(props.configurationId)"
      @input="(value : UserPreferenceValue) => setUserPreference(props.configurationId, value)"
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
import { loadPreferenceEntryValues } from '@/jagfx/core/configuration/preference-entry/loader';
import {
  PreferenceEntry,
  PreferenceEntryValue
} from '@/jagfx/core/configuration/preference-entry/preference-entry.type';
import { UserPreferenceValue } from '@/jagfx/core/configuration/user-preference.type';

import UserPreferenceListItem from '@/jagfx/application/components/menu/UserPreferenceTab/UserPreferenceListItem.vue';
import { usePreferencesEntry } from '@/jagfx/application/components/menu/UserPreferenceTab/usePreferencesEntry';
import { useUserPreferences } from '@/jagfx/application/components/shared/useUserPreferences';

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
