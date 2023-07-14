<template>
  <div>
    <UserPreferenceSearchBar />
    <UserPreferenceUpload />
    <UserPreferenceList />
  </div>
</template>

<script setup lang="ts">
import UserPreferenceList from '@/jagfx/user-preference/components/UserPreferenceList.vue';
import UserPreferenceSearchBar from '@/jagfx/user-preference/components/UserPreferenceSearchBar.vue';
import UserPreferenceUpload from '@/jagfx/user-preference/components/UserPreferenceUploadOverlay.vue';
</script>

<style lang="scss"></style>
