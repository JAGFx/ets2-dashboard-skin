<template>
  <ConfigurationListItem :configuration-id="configurationId">
    <select
      class="form-select form-select-sm"
      aria-label="Default select example"
    >
      <option selected>Open this select menu</option>
      <option value="1">One</option>
      <option value="2">Two</option>
      <option value="3">Three</option>
    </select>
  </ConfigurationListItem>
</template>

<script setup>
import ConfigurationListItem from '@/application/components/menu/ConfigurationTab/ConfigurationListItem.vue';

defineProps({
  configurationId: {
    type: String,
    required: true
  }
});
</script>

<style lang="scss" scoped></style>
