<template>
  <div class="list-group-item bg-acrylic light text-white">
    <div class="d-flex-center-center">
      <div
        class="d-flex justify-content-center align-items-start flex-column w-100"
      >
        <div class="d-flex justify-content-start align-items-center">
          <Tag class="ms-0">#{{ configurationItem.target }}</Tag>
          <span class="mx-1">{{ configurationItem.label }}</span>
        </div>
        <small class="text-muted">{{ configurationItem.description }}</small>
      </div>
      <div>
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup>
import Tag from '@/application/ui/Tag/Tag.vue';
import { retrieveConfigurationSettings } from '@/domain/configuration/configurationLibrary.util.js';

const props = defineProps({
  configurationId: {
    type: String,
    required: true
  }
});

const configurationItem = retrieveConfigurationSettings(props.configurationId);
</script>

<style lang="scss" scoped></style>
