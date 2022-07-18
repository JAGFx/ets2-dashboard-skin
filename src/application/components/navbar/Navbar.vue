<template>
  <div
    class="d-flex w-100 h-100 flex-column animate"
    :class="{
      'bg-acrylic': showMenu
    }"
  >
    <Transition name="fade" mode="out-in">
      <nav v-if="showNavbar" class="navbar navbar-expand-lg navbar-dark">
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
            <div
              v-touch:swipe.top="onSwipeUp"
              class="d-flex-center-center w-100"
            >
              <span class="navbar-brand m-0"> Sam 10:52 AM </span>
            </div>
            <div class="d-flex w-100 justify-content-end">
              <Button side="right" :toggle="true" @click="switchFullscreen">
                <template #icon>
                  <i class="icon-target"></i>
                </template>
                Fullscreen
              </Button>
              <Button
                side="right"
                :active="showMenu"
                :toggle="true"
                @click="showMenu = !showMenu"
              >
                <template #icon>
                  <i class="icon-menu"></i>
                </template>
                Menu
              </Button>
            </div>
          </div>
        </div>
      </nav>
    </Transition>
    <div
      v-if="!showNavbar"
      class="d-flex-center-center animate-delay"
      @click="showNavbar = true"
    >
      <font-awesome-icon
        icon="fa-solid fa-earth-europe"
        class="mx-1 my-3 showNavbar"
      />
    </div>
    <Transition name="fade" mode="out-in">
      <slot v-if="showMenu" />
    </Transition>
  </div>
</template>

<script setup>
import Button from '@/application/ui/Button/Button.vue';
import { useFullscreen } from '@/application/uses/useFullscreen.js';
import { ref } from 'vue';

const { switchFullscreen } = useFullscreen();
const showMenu = ref(true);
const showNavbar = ref(false);

const onSwipeUp = () => (showNavbar.value = false);
</script>

<style lang="scss" scoped>
@import 'navbar';
</style>
