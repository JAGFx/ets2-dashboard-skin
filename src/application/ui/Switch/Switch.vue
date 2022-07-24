<template>
  <button
    class="btn switch d-flex justify-content-between align-items-center"
    :class="{
      'flex-row-reverse': !currentState,
      enabled: currentState
    }"
    @click="switchState"
  >
    <small v-if="currentState" class="mx-2 text-uppercase">On</small>
    <small v-else class="mx-2 text-uppercase text-off">Off</small>
    <div class="dot">&nbsp;</div>
  </button>
</template>

<script setup>
import { ref } from 'vue';

const emits = defineEmits(['change']);

const currentState = ref(false);

const switchState = () => {
  currentState.value = !currentState.value;
  emits('change', currentState.value);
};
</script>

<style lang="scss" scoped>
@import 'switch';
</style>
