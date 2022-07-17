<template>
  <a
    v-if="asLink"
    :href="href"
    class="btn btn-dark mx-1 my-1 d-flex-center-center"
    :class="{
      animate: hover,
      left: side === 'left',
      right: side === 'right',
      'flex-row-reverse': side === 'right'
    }"
    @mouseover="hover = true"
    @mouseleave="removeHoverEffect"
  >
    <span class="d-flex-center-center icon">
      <slot name="icon" />
    </span>
    <div class="d-flex-center-center text">
      <slot name="default" />
    </div>
  </a>
  <button
    v-else
    class="btn btn-dark mx-1 my-1 d-flex-center-center"
    :class="{
      animate: hover,
      left: side === 'left',
      right: side === 'right',
      'flex-row-reverse': side === 'right'
    }"
    @mouseover="hover = true"
    @mouseleave="removeHoverEffect"
  >
    <span class="d-flex-center-center icon">
      <slot name="icon" />
    </span>
    <div class="d-flex-center-center text">
      <slot name="default" />
    </div>
  </button>
</template>

<script setup>
import { defineProps, ref } from 'vue';

defineProps({
  asLink: {
    type: Boolean,
    default: false
  },
  href: {
    type: String,
    default: ''
  },
  side: {
    type: String,
    default: 'left'
  }
});
const hover = ref(false);
const removeHoverEffect = () => {
  setTimeout(() => (hover.value = false), 350);
};
</script>

<style scoped lang="scss">
@import 'button';
</style>
