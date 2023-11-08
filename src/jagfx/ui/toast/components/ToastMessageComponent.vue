<template>
  <Toast>
    {{ $t(theToast.message) }}
  </Toast>
</template>

<script lang="ts" setup>
import { ToastMessage } from '@/jagfx/lib';
import Toast from '@/jagfx/ui/atomic/components/Toast.vue';

defineProps<{
  theToast: ToastMessage;
}>();
</script>
