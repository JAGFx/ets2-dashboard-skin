<template>
  <button
    class="btn switch d-flex justify-content-between align-items-center w-100"
    :class="{
      'flex-row-reverse': !currentState,
      enabled: currentState
    }"
    @click="switchState"
  >
    <small v-if="currentState" class="mx-2 text-uppercase">{{
      $t('On')
    }}</small>
    <small v-else class="mx-2 text-uppercase text-off">{{ $t('Off') }}</small>
    <div class="dot">&nbsp;</div>
  </button>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import { UserPreferenceValue } from '@/jagfx/lib';

const emits = defineEmits(['change']);
const props = defineProps<{
  initialValue: UserPreferenceValue;
}>();

const currentState = ref<boolean>(props.initialValue === true);

const switchState = (): void => {
  currentState.value = !currentState.value;
  emits('change', currentState.value);
};
</script>
