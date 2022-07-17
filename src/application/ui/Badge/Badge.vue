<template>
  <div
    class="badge bg-dark text-white d-flex-center-center mx-1"
    :class="badgeClasses()"
  >
    <div
      class="icon d-flex-center-center"
      :class="{
        'ms-1': side === 'right'
      }"
    >
      <slot name="icon" />
    </div>
    <span class="text">
      <slot name="default" />
    </span>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  side: {
    type: String,
    default: 'left'
  }
});

const side = ref(props.side);
const badgeClasses = () => {
  return side.value === 'right' ? 'right flex-row-reverse' : '';
};
</script>

<style lang="scss" scoped>
@import 'badge';
</style>
