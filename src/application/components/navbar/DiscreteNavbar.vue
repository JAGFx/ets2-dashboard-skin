<template>
  <div class="d-flex-center-center">
    <button
      class="btn bg-acrylic m-1 p-2 discrete-button"
      @click="switchToCompleteMode"
    >
      <font-awesome-icon icon="fa-solid fa-earth-europe" class="show-navbar" />
    </button>
  </div>
</template>

<script setup>
import { useMenu } from '@/application/components/menu/useMenu.js';

const { switchToCompleteMode } = useMenu();
</script>

<style lang="scss">
@import 'navbar';
</style>
