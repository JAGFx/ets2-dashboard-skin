<template>
  <UserPreferenceListItem>
    <Switch />
  </UserPreferenceListItem>
</template>

<script setup lang="ts">
import UserPreferenceListItem from '@/jagfx/components/menu/UserPreferenceTab/UserPreferenceListItem.vue';
import { usePreferencesEntry } from '@/jagfx/components/menu/UserPreferenceTab/usePreferencesEntry';
import Switch                  from '@/jagfx/components/shared/ui/Switch.vue';

type UserPreferenceListItemSwitchProps = {
  preferenceEntryId: string;
};

const props = defineProps<UserPreferenceListItemSwitchProps>();
const { initProvider } = usePreferencesEntry();

initProvider(props.preferenceEntryId);
</script>

<style lang="scss" scoped></style>
