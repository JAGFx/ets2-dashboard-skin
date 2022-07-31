<template>
  <div
    class="d-flex w-100 h-100 flex-column fixed-top"
    :class="{
      'menu-is-shown': menuIsShown
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
import { useMenu } from '@/jagfx/shared/components/menu/useMenu.js';

const { menuIsShown, mode } = useMenu();
</script>

<style lang="scss">
@import 'navbar';
</style>
