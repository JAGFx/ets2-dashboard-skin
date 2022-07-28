<template>
  <ConfigurationListItem :configuration-id="configurationId">
    <Switch />
  </ConfigurationListItem>
</template>

<script setup>
import ConfigurationListItem from '@/application/components/menu/ConfigurationTab/ConfigurationListItem.vue';
import Switch from '@/application/ui/Switch/Switch.vue';

defineProps({
  configurationId: {
    type: String,
    required: true
  }
});
</script>

<style lang="scss" scoped></style>
