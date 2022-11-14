<template>
  <Toast>
    {{ $t(theToast.message) }}
  </Toast>
</template>

<script lang="ts" setup>
import { ToastMessage } from 'ets2-dashboard-lib/jagfx/application/toast/toast-message.type.js';

import Toast from '@/jagfx/components/shared/ui/Toast.vue';

defineProps<{
  theToast: ToastMessage;
}>();
</script>
