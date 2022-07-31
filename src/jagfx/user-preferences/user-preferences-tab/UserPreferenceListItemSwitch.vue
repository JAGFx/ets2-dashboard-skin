<template>
  <UserPreferenceListItem :configuration-id="configurationId">
    <Switch />
  </UserPreferenceListItem>
</template>

<script setup>
import UserPreferenceListItem from '@/jagfx/user-preferences/user-preferences-tab/UserPreferenceListItem.vue';
import Switch from '@/jagfx/shared/components/ui/Switch/Switch.vue';

defineProps({
  configurationId: {
    type: String,
    required: true
  }
});
</script>

<style lang="scss" scoped></style>
