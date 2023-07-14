<template>
  <UserPreferenceListItem>
    <input
      :type="props.type"
      class="form-control form-control-sm"
      :value="find(props.preferenceEntryId).value"
      @input="(value) => update(props.preferenceEntryId, value)"
    />
  </UserPreferenceListItem>
</template>

<script setup lang="ts">
import { PreferenceEntryId } from 'ets2-dashboard-skin-lib';

import UserPreferenceListItem from '@/jagfx/user-preference/components/UserPreferenceListItem.vue';
import { usePreferencesEntry } from '@/jagfx/user-preference/hook/usePreferencesEntry';
import { useUserPreference } from '@/jagfx/user-preference/hook/useUserPreference';

type UserPreferenceListItemInputProps = {
  preferenceEntryId: PreferenceEntryId;
  type: 'text' | 'number';
};

const props = withDefaults(defineProps<UserPreferenceListItemInputProps>(), {
  type: 'text'
});
const { initProvider } = usePreferencesEntry();
const { find, update } = useUserPreference();

initProvider(props.preferenceEntryId);
</script>

<style lang="scss" scoped></style>
