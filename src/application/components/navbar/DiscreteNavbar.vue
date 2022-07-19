<template>
  <div class="d-flex-center-center">
    <button class="btn btn-dark m-1 p-2" @click="switchToCompleteMode">
      <font-awesome-icon icon="fa-solid fa-earth-europe" class="showNavbar" />
    </button>
  </div>
</template>

<script setup>
import { useMenu } from '@/application/components/menu/useMenu.js';

const { switchToCompleteMode } = useMenu();
</script>

<style lang="scss" scoped>
@import 'navbar';
</style>
