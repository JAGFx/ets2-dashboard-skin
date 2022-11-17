<template>
  <Toast>
    {{ $t(theToast.message) }}
  </Toast>
</template>

<script lang="ts" setup>
import { ToastMessage } from 'ets2-dashboard-core/src/application/toast/toast-message.type';

import Toast from '@/jagfx/components/shared/ui/Toast.vue';

defineProps<{
  theToast: ToastMessage;
}>();
</script>
