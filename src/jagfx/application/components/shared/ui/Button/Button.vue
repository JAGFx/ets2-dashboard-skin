<template>
  <a
    v-if="asLink"
    :href="href"
    class="btn btn-acrylic mx-1 my-1 d-flex-center-center"
    :class="{
      animate: hover,
      left: side === 'left',
      right: side === 'right',
      'flex-row-reverse': side === 'right',
      active,
      toggle
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
    class="btn btn-acrylic mx-1 my-1 d-flex-center-center"
    :class="{
      animate: hover,
      left: side === 'left',
      right: side === 'right',
      'flex-row-reverse': side === 'right',
      active,
      toggle
    }"
    @mouseover="hover = true"
    @mouseleave="removeHoverEffect"
    @click="$emit('click')"
  >
    <span class="d-flex-center-center icon">
      <slot name="icon" />
    </span>
    <div class="d-flex-center-center text">
      <slot name="default" />
    </div>
  </button>
</template>

<script setup lang="ts">
import { ref, toRefs } from 'vue';

defineEmits(['click']);

type ButtonProps = {
  asLink?: boolean;
  href?: string;
  side?: 'left' | 'right';
  active?: boolean;
  toggle?: boolean;
};

const props = withDefaults(defineProps<ButtonProps>(), {
  asLink: false,
  side: 'left',
  active: false,
  toggle: false
});

const hover = ref<boolean>(false);
const { active } = toRefs<ButtonProps>(props);

const removeHoverEffect = (): void => {
  if (!active.value) {
    setTimeout(() => (hover.value = false), 350);
  }
};
</script>

<style scoped lang="scss">
@import 'button';
</style>
