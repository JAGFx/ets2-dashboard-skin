<template>
  <UserPreferenceListItem :configuration-id="configurationId">
    <Switch />
  </UserPreferenceListItem>
</template>

<script setup lang="ts">
import UserPreferenceListItem from '@/jagfx/application/components/menu/UserPreferenceTab/UserPreferenceListItem.vue';
import Switch from '@/jagfx/application/components/shared/ui/Switch/Switch.vue';

defineProps({
  configurationId: {
    type: String,
    required: true
  }
});
</script>

<style lang="scss" scoped></style>
