<template>
  <div>
    <UserPreferenceSearchBar />
    <UserPreferenceUpload />
    <UserPreferenceList />
  </div>
</template>

<script setup lang="ts">
import UserPreferenceList from '@/jagfx/components/menu/user-preference-tab/UserPreferenceList.vue';
import UserPreferenceSearchBar from '@/jagfx/components/menu/user-preference-tab/UserPreferenceSearchBar.vue';
import UserPreferenceUpload from '@/jagfx/components/menu/user-preference-tab/UserPreferenceUploadOverlay.vue';
</script>

<style lang="scss"></style>
