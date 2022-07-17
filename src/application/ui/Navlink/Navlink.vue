<template>
  <div class="nav-item mx-1">
    <a
      class="nav-link d-flex-center-center"
      :class="{
        active
      }"
      href="#"
    >
      <slot name="icon" class="mx-1" />
      <span class="mx-1">
        <slot name="default" />
      </span>
    </a>
  </div>
</template>

<script setup>
defineProps({
  active: {
    type: Boolean,
    default: false
  }
});
</script>

<style lang="scss" scoped>
@import 'navlink';
</style>
