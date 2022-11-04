<template>
  <Toast>
    {{ $t(theToast.message) }}
  </Toast>
</template>

<script lang="ts" setup>
import { ToastMessage } from '@/jagfx/components/shared/toast/toast.type';
import Toast from '@/jagfx/components/shared/ui/Toast.vue';

defineProps<{
  theToast: ToastMessage;
}>();
</script>
