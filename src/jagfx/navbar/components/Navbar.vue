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

<script setup lang="ts">
import { useMenu } from '@/jagfx/menu/hook/useMenu';

const { menuIsShown, mode } = useMenu();
</script>
