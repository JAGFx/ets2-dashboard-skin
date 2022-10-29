<template>
  <UserPreferenceListItem>
    <Switch />
  </UserPreferenceListItem>
</template>

<script setup lang="ts">
import { PreferenceEntryId } from 'ets2-dashboard-lib/jagfx/configuration/preference-entry/preference-entry.type';

import UserPreferenceListItem from '@/jagfx/components/menu/user-preference-tab/UserPreferenceListItem.vue';
import { usePreferencesEntry } from '@/jagfx/components/menu/user-preference-tab/usePreferencesEntry';
import Switch from '@/jagfx/components/shared/ui/Switch.vue';

type UserPreferenceListItemSwitchProps = {
  preferenceEntryId: PreferenceEntryId;
};

const props = defineProps<UserPreferenceListItemSwitchProps>();
const { initProvider } = usePreferencesEntry();

initProvider(props.preferenceEntryId);
</script>

<style lang="scss" scoped></style>
