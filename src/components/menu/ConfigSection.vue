<template>
  <section :id="id">
    <h3 class="d-flex justify-content-between align-items-center p-2">
      <span>{{ name }}</span>
      <span class="text-muted more" @click="show = !show">
					<i class="fas fa-angle-double-right"></i>
					Show more
				</span>
    </h3>
    <div v-show="show">
      <slot></slot>
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
      show: true
    };
  }
};
</script>
