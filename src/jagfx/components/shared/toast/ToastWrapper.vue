<template>
  <teleport to="body">
    <div class="toast-wrapper d-flex-center-center w-100 flex-column">
      <Component
        :is="taskComponent(toast.component)"
        v-for="toast in toastQueue()"
        :key="toast.timestamp"
        :the-toast="toast"
      />
    </div>
  </teleport>
</template>

<script lang="ts" setup>
import { defineAsyncComponent } from 'vue';

import { useToast } from '@/jagfx/components/shared/toast/useToast';
import Toast from '@/jagfx/components/shared/ui/Toast.vue';

const { toasts } = useToast();

const toastQueue = (): typeof Toast[] =>
  Array.from(toasts.value.values()).reverse();

const taskComponent = (taskComponentName: string) =>
  defineAsyncComponent(() => import(`./${taskComponentName}.vue`));
</script>
