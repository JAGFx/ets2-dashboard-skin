<template>
  <div class="pl-3 p-2 field d-flex justify-content-between align-items-center">
    <div>
      <h5 class="m-0">
        {{ $t(label) }}
      </h5>
      <small class="font-italic text-muted">{{ $t(description) }}</small>
    </div>
    <slot />
  </div>
</template>

<script>

export default {
  name:  'ConfigField',
  props: {
    label:       {
      type:     String,
      required: true
    },
    description: {
      type:     String,
      required: true
    }
  }
};
</script>