<template>
  <div class="row my-2 configuration-tab">
    <div class="col-12">
      <!--        <div class="d-flex-center-center">-->
      <div class="input-group">
        <input
          v-model="search"
          type="search"
          class="form-control bg-acrylic"
          :placeholder="$t('Type to search...')"
        />
        <!--          <button-->
        <!--            class="btn btn-acrylic dropdown-toggle d-flex-center-center px-2 py-1 m-0 d-flex-center-center"-->
        <!--            type="button"-->
        <!--            data-bs-toggle="dropdown"-->
        <!--            aria-expanded="false"-->
        <!--          >-->
        <!--            <i class="icon-endpoint"></i>-->
        <!--          </button>-->
        <!--          <ul class="dropdown-menu">-->
        <!--            <li>-->
        <!--              <Tag>#jagfx</Tag>-->
        <!--            </li>-->
        <!--            <li>-->
        <!--              <Tag>#jagfx</Tag>-->
        <!--            </li>-->
        <!--            <li>-->
        <!--              <Tag>#jagfx</Tag>-->
        <!--            </li>-->
        <!--          </ul>-->
        <button
          class="btn btn-acrylic px-2 py-1 pe-3 m-0 d-flex-center-center"
          type="button"
        >
          <i class="icon-location_arrow"></i>
        </button>
      </div>
    </div>
  </div>
  <!--    <div class="row my-2 configuration-tab">-->
  <!--      <div class="col d-flex justify-content-start align-items-center">-->
  <!--        <Tag>#jagfx</Tag>-->
  <!--        <Tag>#jagfx</Tag>-->
  <!--        <Tag>#jagfx</Tag>-->
  <!--        <div class="d-flex-center-center text-muted mx-1">-->
  <!--          <i class="icon-endpoint"></i>-->
  <!--        </div>-->
  <!--      </div>-->
  <!--    </div>-->
</template>

<script setup lang="ts">
import { usePreferencesEntry } from '@/jagfx/components/menu/UserPreferenceTab/usePreferencesEntry';

const { search } = usePreferencesEntry();
</script>

<style lang="scss" scoped></style>
