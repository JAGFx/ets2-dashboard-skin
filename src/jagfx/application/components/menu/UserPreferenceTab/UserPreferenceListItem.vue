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

<script setup lang="ts">
import { usePreferencesEntry }     from '@/jagfx/application/components/menu/UserPreferenceTab/usePreferencesEntry';
import { findPreferenceEntryById } from '@/jagfx/core/configuration/preference-entry/finder';

import Tag                 from '@/jagfx/application/components/shared/ui/Tag/Tag.vue';
import { PreferenceEntry } from '@/jagfx/core/configuration/preference-entry/preference-entry.type';
import { provide, ref }    from 'vue';

const props = defineProps({
  configurationId: {
    type: String,
    required: true
  }
});

const { isMatchWithFilter } = usePreferencesEntry();
const preferenceEntry : PreferenceEntry = findPreferenceEntryById(props.configurationId);

provide(props.configurationId, ref(preferenceEntry))
</script>

<style lang="scss" scoped></style>
