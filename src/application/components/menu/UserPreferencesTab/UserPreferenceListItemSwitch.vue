<template>
  <UserPreferenceListItem :configuration-id="configurationId">
    <Switch />
  </UserPreferenceListItem>
</template>

<script setup>
import UserPreferenceListItem from '@/application/components/menu/UserPreferencesTab/UserPreferenceListItem.vue';
import Switch from '@/application/ui/Switch/Switch.vue';

defineProps({
  configurationId: {
    type: String,
    required: true
  }
});
</script>

<style lang="scss" scoped></style>
