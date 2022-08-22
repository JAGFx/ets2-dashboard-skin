<template>
  <div class="overlay container-fluid">
    <div class="overlay-content">
      <Transition mode="out-in" name="fade">
        <slot></slot>
      </Transition>
    </div>
  </div>
</template>

<script setup>
// Defines a closeOverlay event that can be emitted by the overlay component.
defineEmits(["closeOverlay"]);
</script>

<style lang="scss">
@import "overlay";
</style>
