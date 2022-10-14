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
import { PreferenceEntry } from 'ets2-dashboard-lib/jagfx/configuration/preference-entry/preference-entry.type';

import { usePreferencesEntry } from '@/jagfx/components/menu/UserPreferenceTab/usePreferencesEntry';
import Tag from '@/jagfx/components/shared/ui/Tag/Tag.vue';

const { isMatchWithFilter, initConsumer } = usePreferencesEntry();

const preferenceEntry: PreferenceEntry = initConsumer();
</script>

<style lang="scss" scoped></style>
