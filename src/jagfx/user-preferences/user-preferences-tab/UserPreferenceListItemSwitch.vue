<template>
  <UserPreferenceListItem :configuration-id="configurationId">
    <Switch />
  </UserPreferenceListItem>
</template>

<script setup>
import Switch from '@/jagfx/shared/components/ui/Switch/Switch.vue';
import UserPreferenceListItem from '@/jagfx/user-preferences/user-preferences-tab/UserPreferenceListItem.vue';

defineProps({
  configurationId: {
    type: String,
    required: true
  }
});
</script>

<style lang="scss" scoped></style>
