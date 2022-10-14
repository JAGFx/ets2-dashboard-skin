<template>
  <div class="nav-item mx-1">
    <button
      class="nav-link d-flex-center-center"
      :class="{
        active
      }"
      @click="$emit('click')"
    >
      <slot name="icon" class="mx-1" />
      <span class="mx-1">
        <slot name="default" />
      </span>
    </button>
  </div>
</template>

<script setup lang="ts">
defineEmits(['click']);

type NavlinkProps = {
  active: boolean;
};

withDefaults(defineProps<NavlinkProps>(), {
  active: false
});
</script>

<style lang="scss" scoped>
@import 'navlink';
</style>
