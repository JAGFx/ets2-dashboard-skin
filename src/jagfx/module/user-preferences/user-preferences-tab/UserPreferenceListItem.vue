<template>
  <div
    v-if="isMatchWithFilter(preferenceEntry)"
    class="list-group-item bg-acrylic light text-white"
  >
    <div class="d-flex-center-center">
      <div
        class="d-flex justify-content-center align-items-start flex-column w-100"
      >
        <div class="d-flex justify-content-start align-items-center">
          <Tag class="ms-0">#{{ preferenceEntry.target }}</Tag>
          <span class="mx-1">{{ preferenceEntry.label }}</span>
        </div>
        <small class="text-muted">{{ preferenceEntry.description }}</small>
      </div>
      <div>
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup>
import { findPreferenceEntryById } from '@/jagfx/module/user-preferences/core/preference-entry.util.js';
import { usePreferencesEntry } from '@/jagfx/module/user-preferences/usePreferencesEntry';
import Tag from '@/jagfx/shared/components/ui/Tag/Tag.vue';

const props = defineProps({
  configurationId: {
    type: String,
    required: true
  }
});

const preferenceEntry = findPreferenceEntryById(props.configurationId);
const { isMatchWithFilter } = usePreferencesEntry();
</script>

<style lang="scss" scoped></style>
