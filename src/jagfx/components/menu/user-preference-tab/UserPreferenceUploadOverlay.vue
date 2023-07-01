<template>
  <label for="userPreferenceFileUpload" class="form-label">
    {{ $t('User preference file') }}
  </label>
  <input
    id="userPreferenceFileUpload"
    ref="file"
    type="file"
    class="form-control form-control-sm"
    :disabled="loading"
    @change="onChangeFileUpload"
  />
  <div class="form-text">
    {{
      $t('Upload a file to update your user preferences for the current game')
    }}
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import { useUserPreference } from '@/jagfx/components/shared/useUserPreference';

const { upload } = useUserPreference();

const file = ref<HTMLFormElement>();
const loading = ref<boolean>(false);
const onChangeFileUpload = () => {
  loading.value = true;

  upload(file.value?.files)
    .then(() => {
      // TODO: Reset field after successfully upload
      file.value?.reset();
    })
    .finally(() => (loading.value = false));
};
</script>
