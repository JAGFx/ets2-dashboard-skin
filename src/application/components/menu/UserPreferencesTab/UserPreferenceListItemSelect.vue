<template>
  <UserPreferenceListItem :configuration-id="configurationId">
    <select
      class="form-select form-select-sm"
      aria-label="Default select example"
    >
      <option selected>Open this select menu</option>
      <option value="1">One</option>
      <option value="2">Two</option>
      <option value="3">Three</option>
    </select>
  </UserPreferenceListItem>
</template>

<script setup>
import UserPreferenceListItem from '@/application/components/menu/UserPreferencesTab/UserPreferenceListItem.vue';

defineProps({
  configurationId: {
    type: String,
    required: true
  }
});
</script>

<style lang="scss" scoped></style>
