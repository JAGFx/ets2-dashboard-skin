<template>
  <section
    :id="id"
    class="config-section"
  >
    <h3 :class="['d-flex justify-content-between align-items-center p-2', { 'show': show }]">
      <span>{{ name }}</span>
      <span
        class="text-muted more"
        @click="show = !show"
      >
        <i
          v-if="show"
          class="fas fa-angle-double-left"
        />
        <i
          v-else
          class="fas fa-angle-double-right"
        />
        Show {{ ( show ) ? 'less' : 'more' }}
      </span>
    </h3>
    <div
      v-show="show"
      class="content"
    >
      <slot />
    </div>
  </section>
</template>

<script>
export default {
  name:  'ConfigSection',
  props: {
    id:   {
      type:     String,
      required: true
    },
    name: {
      type:     String,
      required: true
    }
  },
  data() {
    return {
      show: false
    };
  }
};
</script>
