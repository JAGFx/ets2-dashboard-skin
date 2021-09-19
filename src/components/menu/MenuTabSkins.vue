<template>
  <div class="tab-skins">
    <div
      v-for="skin in $skins()"
      :key="skin.id"
      :class="{
        'active': $isActive(skin),
        'disabled': $isDisabled(skin),
      }"
      class="card text-white mb-3"
    >
      <div>
        <img
          v-show="skin.screenshot"
          class="img-fluid"
          :src="skin.screenshot"
        >
        <img
          v-show="!skin.screenshot"
          class="img-fluid"
          src="https://dummyimage.com/800x455/002b36/ffffff.png&text=No+screenshot"
        >
      </div>
      <div class="card-body">
        <h5 class="card-title mb-0 d-flex justify-content-sm-start align-items-center">
          {{ skin.title }}
          <small
            v-show="$isActive(skin)"
            class="mx-1 badge badge-success"
          >{{ $t('Active') }}</small>
          <small
            v-show="$isDisabled(skin)"
            class="mx-1 badge badge-secondary"
          >{{ $t('Disabled') }}</small>
        </h5>
        <small class="text-muted font-italic mb-2 d-inline-block">
          {{ skin.author.name }}
          <a
            v-show="skin.author.url !== undefined && skin.author.url"
            :href="skin.author.url"
            class="ml-1"
            target="_blank"
          ><i class="fas fa-globe-europe" /></a>
          <a
            v-show="skin.author.email !== undefined && skin.author.email"
            :href="'mailto:' + skin.author.email"
            class="ml-1"
            target="_blank"
          ><i class="fas fa-paper-plane" /></a>
        </small>
        <p class="card-text mb-0">
          {{ skin.description }}
        </p>
      </div>
      <div
        v-if="!$isActive(skin) && !$isDisabled(skin)"
        class="card-footer d-flex justify-content-center align-items-center"
      >
        <a
          class="btn btn-sm btn-success"
          @click="$setActive(skin)"
        >{{ $t('Activate') }}</a>
      </div>
    </div>
  </div>
</template>

<script>
import SkinsMixin from '@/mixins/SkinsMixin';

export default {
  name:   'MenuTabSkins',
  mixins: [ SkinsMixin ]
};
</script>
