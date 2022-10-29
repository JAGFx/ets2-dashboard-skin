<template>
  <UserPreferenceListItem>
    <input :type="props.type" class="form-control form-control-sm" />
  </UserPreferenceListItem>
</template>

<script setup lang="ts">
import { PreferenceEntryId } from 'ets2-dashboard-lib/jagfx/configuration/preference-entry/preference-entry.type';

import UserPreferenceListItem from '@/jagfx/components/menu/user-preference-tab/UserPreferenceListItem.vue';
import { usePreferencesEntry } from '@/jagfx/components/menu/user-preference-tab/usePreferencesEntry';

type UserPreferenceListItemInputProps = {
  preferenceEntryId: PreferenceEntryId;
  type: 'text' | 'number';
};

const props = withDefaults(defineProps<UserPreferenceListItemInputProps>(), {
  type: 'text'
});
const { initProvider } = usePreferencesEntry();

initProvider(props.preferenceEntryId);
</script>

<style lang="scss" scoped></style>
