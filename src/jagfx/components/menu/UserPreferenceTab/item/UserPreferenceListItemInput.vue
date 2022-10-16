<template>
  <UserPreferenceListItem>
    <input :type="props.type" class="form-control form-control-sm" />
  </UserPreferenceListItem>
</template>

<script setup lang="ts">
import UserPreferenceListItem from '@/jagfx/components/menu/UserPreferenceTab/UserPreferenceListItem.vue';
import { usePreferencesEntry } from '@/jagfx/components/menu/UserPreferenceTab/usePreferencesEntry';

type UserPreferenceListItemInputProps = {
  preferenceEntryId: string;
  type: 'text' | 'number';
};

const props = withDefaults(defineProps<UserPreferenceListItemInputProps>(), {
  type: 'text'
});
const { initProvider } = usePreferencesEntry();

initProvider(props.preferenceEntryId);
</script>

<style lang="scss" scoped></style>
