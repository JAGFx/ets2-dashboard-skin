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
          <Tag
            v-for="category in preferenceEntry.categories"
            :key="category"
            class="ms-0"
            >#{{ $t(category) }}</Tag
          >
          <span class="mx-1">{{ $t(preferenceEntry.label) }}</span>
        </div>
        <small class="text-muted">{{ $t(preferenceEntry.description) }}</small>
      </div>
      <div>
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PreferenceEntry } from '@/jagfx/lib';
import { usePreferencesEntry } from '@/jagfx/preference-entry/hook/usePreferencesEntry';
import Tag from '@/jagfx/ui/atomic/components/Tag.vue';

const { isMatchWithFilter, initConsumer } = usePreferencesEntry();

const preferenceEntry: PreferenceEntry = initConsumer();
</script>

<style lang="scss" scoped></style>
