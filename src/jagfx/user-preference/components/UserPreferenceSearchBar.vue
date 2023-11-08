<template>
  <div class="row my-2 configuration-tab">
    <div class="col-12">
      <!--        <div class="d-flex-center-center">-->
      <div class="input-group">
        <input
          :value="current.search"
          type="search"
          class="form-control bg-acrylic"
          :placeholder="$t('Type to search...')"
          @input="(evenet) => update({ search: evenet.target.value })"
        />
        <button
          class="btn btn-acrylic px-2 py-1 m-0 d-flex-center-center w-auto"
          type="button"
        >
          <font-awesome-icon icon="fa-solid fa-arrow-up-from-bracket" />
        </button>
        <button
          class="btn btn-acrylic dropdown-toggle d-flex-center-center px-2 py-1 m-0 d-flex-center-center w-auto"
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <i class="icon-endpoint"></i>
        </button>
        <ul class="dropdown-menu bg-acrylic">
          <li
            v-for="category in preferenceEntryCategories"
            :key="category"
            @click="update({ category: category })"
          >
            <Tag>#{{ category }}</Tag>
          </li>
        </ul>
        <button
          class="btn btn-acrylic px-2 py-1 pe-3 m-0 d-flex-center-center w-auto"
          type="button"
        >
          <i class="icon-location_arrow"></i>
        </button>
      </div>
    </div>
  </div>
  <div class="row my-2 configuration-tab">
    <div class="col d-flex justify-content-start align-items-center">
      <Tag v-for="category in current.categories" :key="category"
        >#{{ category }}</Tag
      >
      <div
        v-if="current.categories.length > 0"
        class="d-flex-center-center text-muted mx-1"
        @click="reset"
      >
        <i class="icon-endpoint"></i>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PreferenceEntryCategories } from '@/jagfx/lib';
import { usePreferencesEntry } from '@/jagfx/preference-entry/hook/usePreferencesEntry';
import Tag from '@/jagfx/ui/atomic/components/Tag.vue';

const { current, update, reset } = usePreferencesEntry();
const preferenceEntryCategories = Object.values(PreferenceEntryCategories);
</script>

<style lang="scss" scoped></style>
