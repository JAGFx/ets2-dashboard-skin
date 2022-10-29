<template>
  <nav class="navbar navbar-expand-lg navbar-dark sticky-top">
    <div class="container-fluid">
      <div class="d-flex-center-center w-100">
        <div class="d-flex w-100 text-left">
          <Button>
            <template #icon>
              <i class="icon-target"></i>
            </template>
            v{{ version }}
          </Button>
          <Button>
            <template #icon>
              <i class="icon-target"></i>
            </template>
            v1.44.1.5
          </Button>
        </div>
        <div
          v-touch:swipe.top="switchToDiscreteMode"
          class="d-flex-center-center w-100"
        >
          <span class="navbar-brand m-0">Sam 10:52 AM</span>
        </div>
        <div class="d-flex w-100 justify-content-end">
          <Button
            side="right"
            :active="fullscreenIsEnabled"
            :toggle="true"
            @click="switchFullscreen"
          >
            <template #icon>
              <i class="icon-target"></i>
            </template>
            {{ $t('Fullscreen') }}
          </Button>
          <Button
            side="right"
            :active="menuIsShown"
            :toggle="true"
            @click="toggleMenuShow"
          >
            <template #icon>
              <i class="icon-menu"></i>
            </template>
            {{ $t('Menu') }}
          </Button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { useFullscreen } from '@/jagfx/components/menu/useFullscreen';
import { useMenu }             from '@/jagfx/components/menu/useMenu';
import Button                  from '@/jagfx/components/shared/ui/Button.vue';
import { useApplicationState } from '@/jagfx/components/useApplicationState';

const { fullscreenIsEnabled, switchFullscreen } = useFullscreen();
const { menuIsShown, switchToDiscreteMode, toggleMenuShow } = useMenu();
const { version } = useApplicationState();
</script>

<style lang="scss">
@import 'navbar';
</style>
