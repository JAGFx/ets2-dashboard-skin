<template>
  <nav
class="navbar navbar-expand-lg navbar-dark">
    <div class="container-fluid">
      <div class="d-flex-center-center w-100">
        <div class="d-flex w-100 text-left">
          <Badge>
            <template #icon>
              <i class="icon-target"></i>
            </template>
            <template #default>
              v1.11
            </template>
          </Badge>
          <Badge>
            <template #icon>
              <i class="icon-target"></i>
            </template>
            <template #default>
              v1.44.1.5
            </template>
          </Badge>
        </div>
        <div class="d-flex-center-center w-100">
          <span class="navbar-brand m-0">
            Sam 10:52 AM
          </span>
        </div>
        <div class="d-flex w-100 justify-content-end">
          <Badge side="right">
            <template #icon>
              <i class="icon-target"></i>
            </template>
            <template #default>
              Fullscreen
            </template>
          </Badge>
          <Badge side="right">
            <template #icon>
              <i class=" icon-menu"></i>
            </template>
            <template #default>
              Menu
            </template>
          </Badge>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
  import Badge   from '@/application/ui/Badge/Badge.vue';
  //import { ref } from "vue";

  defineProps({
    discrete: {
      type: Boolean,
      default: true
    }
  })

  //const discrete = ref(props.discrete);

</script>

<style lang="scss" scoped>
  @import "navbar";
</style>