<template>
  <UserPreferenceListItem>
    <Switch
      :initial-value="find(props.preferenceEntryId).value"
      @change="(value) => update(props.preferenceEntryId, value)"
    />
  </UserPreferenceListItem>
</template>

<script setup lang="ts">
import { PreferenceEntryId } from 'ets2-dashboard-skin-lib';

import Switch from '@/jagfx/ui/atomic/components/Switch.vue';
import UserPreferenceListItem from '@/jagfx/user-preference/components/UserPreferenceListItem.vue';
import { usePreferencesEntry } from '@/jagfx/user-preference/hook/usePreferencesEntry';
import { useUserPreference } from '@/jagfx/user-preference/hook/useUserPreference';

type UserPreferenceListItemSwitchProps = {
  preferenceEntryId: PreferenceEntryId;
};

const props = defineProps<UserPreferenceListItemSwitchProps>();
const { initProvider } = usePreferencesEntry();
const { find, update } = useUserPreference();

initProvider(props.preferenceEntryId);
</script>

<style lang="scss" scoped></style>
