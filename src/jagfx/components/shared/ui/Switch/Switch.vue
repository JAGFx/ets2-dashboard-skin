<template>
  <button
    class="btn switch d-flex justify-content-between align-items-center"
    :class="{
      'flex-row-reverse': !currentState,
      enabled: currentState
    }"
    @click="switchState"
  >
    <small v-if="currentState" class="mx-2 text-uppercase">{{ $t('On') }}</small>
    <small v-else class="mx-2 text-uppercase text-off">{{ $t('Off') }}</small>
    <div class="dot">&nbsp;</div>
  </button>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const emits = defineEmits(['change']);

const currentState = ref<boolean>(false);

const switchState = (): void => {
  currentState.value = !currentState.value;
  emits('change', currentState.value);
};
</script>

<style lang="scss" scoped>
@import 'switch';
</style>
