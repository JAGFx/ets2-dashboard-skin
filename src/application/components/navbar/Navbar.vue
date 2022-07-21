<template>
  <div
    class="d-flex w-100 h-100 flex-column"
    :class="{
      'bg-acrylic': menuIsShown
    }"
  >
    <Transition name="fade" mode="out-in">
      <component :is="mode" />
    </Transition>
    <Transition name="fade" mode="out-in">
      <slot v-if="menuIsShown" />
    </Transition>
  </div>
</template>

<script setup>
import { useMenu } from '@/application/components/menu/useMenu.js';

const { menuIsShown, mode } = useMenu();
</script>

<style lang="scss" scoped>
@import 'navbar';
</style>
