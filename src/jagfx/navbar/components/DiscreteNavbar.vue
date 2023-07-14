<template>
  <div class="d-flex-center-center">
    <button
      class="btn bg-acrylic m-1 p-2 discrete-button w-auto d-flex-center-center"
      @click="switchToCompleteMode"
    >
      <font-awesome-icon icon="fa-solid fa-earth-europe" class="show-navbar" />
    </button>
  </div>
</template>

<script setup lang="ts">
import { useMenu } from '@/jagfx/menu/hook/useMenu';

const { switchToCompleteMode } = useMenu();
</script>

<style lang="scss">
@import '../../style/layout/navbar';
</style>
