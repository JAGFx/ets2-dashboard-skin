<template>
  <UserPreferenceListItem>
    <select
      class="form-select form-select-sm"
      aria-label="Default select example"
      :value="
        currentUserPreference().value === null
          ? ''
          : currentUserPreference().value
      "
      @input="
        (event) =>
          update(
            props.preferenceEntryId,
            event.target.value === '' ? null : event.target.value
          )
      "
    >
      <option
        v-for="value in loadValues(preferenceEntry)"
        :key="value.value"
        :value="value.value === null ? '' : value.value"
      >
        {{ $t(value.label) }}
      </option>
    </select>
  </UserPreferenceListItem>
</template>

<script setup lang="ts">
import {
  PreferenceEntry,
  PreferenceEntryId,
  PreferenceEntryValue,
  loadPreferenceEntryValues
} from 'ets2-dashboard-skin-lib';

import UserPreferenceListItem from '@/jagfx/user-preference/components/UserPreferenceListItem.vue';
import { usePreferencesEntry } from '@/jagfx/user-preference/hook/usePreferencesEntry';
import { useUserPreference } from '@/jagfx/user-preference/hook/useUserPreference';

const { find, update } = useUserPreference();
const { initProvider } = usePreferencesEntry();

type UserPreferenceListItemSelectProps = {
  preferenceEntryId: PreferenceEntryId;
  values?: PreferenceEntryValue[];
};

const props = withDefaults(defineProps<UserPreferenceListItemSelectProps>(), {
  values: () => []
});

const preferenceEntry: PreferenceEntry = initProvider(props.preferenceEntryId);
const currentUserPreference = () => find(props.preferenceEntryId);

const loadValues = (
  preferenceEntry: PreferenceEntry | null
): PreferenceEntryValue[] | null => {
  return props.values.length > 0
    ? props.values
    : loadPreferenceEntryValues(preferenceEntry);
};
</script>

<style lang="scss" scoped></style>
