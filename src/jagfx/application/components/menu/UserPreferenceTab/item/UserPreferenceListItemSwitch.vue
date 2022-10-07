<template>
  <UserPreferenceListItem>
    <Switch />
  </UserPreferenceListItem>
</template>

<script setup lang="ts">
import UserPreferenceListItem from '@/jagfx/application/components/menu/UserPreferenceTab/UserPreferenceListItem.vue';
import { usePreferencesEntry } from '@/jagfx/application/components/menu/UserPreferenceTab/usePreferencesEntry';
import Switch from '@/jagfx/application/components/shared/ui/Switch/Switch.vue';

type UserPreferenceListItemSwitchProps = {
  preferenceEntryId: string;
};

const props = defineProps<UserPreferenceListItemSwitchProps>();
const { initProvider } = usePreferencesEntry();

initProvider(props.preferenceEntryId);
</script>

<style lang="scss" scoped></style>
