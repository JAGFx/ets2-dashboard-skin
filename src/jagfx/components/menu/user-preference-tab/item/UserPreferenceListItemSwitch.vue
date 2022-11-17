<template>
  <UserPreferenceListItem>
    <Switch
      :initial-value="find(props.preferenceEntryId).value"
      @change="(value) => update(props.preferenceEntryId, value)"
    />
  </UserPreferenceListItem>
</template>

<script setup lang="ts">
import { PreferenceEntryId } from 'ets2-dashboard-core/src/configuration/preference-entry/preference-entry.type';

import UserPreferenceListItem from '@/jagfx/components/menu/user-preference-tab/UserPreferenceListItem.vue';
import { usePreferencesEntry } from '@/jagfx/components/menu/user-preference-tab/usePreferencesEntry';
import Switch from '@/jagfx/components/shared/ui/Switch.vue';
import { useUserPreference } from '@/jagfx/components/shared/useUserPreference';

type UserPreferenceListItemSwitchProps = {
  preferenceEntryId: PreferenceEntryId;
};

const props = defineProps<UserPreferenceListItemSwitchProps>();
const { initProvider } = usePreferencesEntry();
const { find, update } = useUserPreference();

initProvider(props.preferenceEntryId);
</script>

<style lang="scss" scoped></style>
