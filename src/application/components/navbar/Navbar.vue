<template>
  <nav class="navbar navbar-expand-lg navbar-dark">
    <div class="container-fluid">
      <div class="d-flex-center-center w-100">
        <div class="d-flex w-100 text-left">
          <Button>
            <template #icon>
              <i class="icon-target"></i>
            </template>
            v1.11
          </Button>
          <Button>
            <template #icon>
              <i class="icon-target"></i>
            </template>
            v1.44.1.5
          </Button>
        </div>
        <div class="d-flex-center-center w-100">
          <span class="navbar-brand m-0"> Sam 10:52 AM </span>
        </div>
        <div class="d-flex w-100 justify-content-end">
          <Button side="right">
            <template #icon>
              <i class="icon-target"></i>
            </template>
            Fullscreen
          </Button>
          <Button side="right" :active="showMenu" @click="showMenu = !showMenu">
            <template #icon>
              <i class="icon-menu"></i>
            </template>
            Menu
          </Button>
        </div>
      </div>
    </div>
  </nav>
  <Transition name="fade" mode="out-in">
    <slot v-if="showMenu" />
  </Transition>
</template>

<script setup>
import Button from '@/application/ui/Button/Button.vue';
</script>

<style lang="scss" scoped>
@import 'navbar';
</style>
