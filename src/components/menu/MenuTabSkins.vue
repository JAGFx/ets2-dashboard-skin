<template>
  <div class="tab-skins">
    <div
      v-for="skin in $actives()"
      :key="skin.id"
      :class="{
        active: $isActive(skin),
        disabled: $isDisabled(skin)
      }"
      class="card text-white mb-3"
    >
      <div>
        <img
          v-show="skin.screenshot"
          class="img-fluid"
          :src="skin.screenshot"
        />
        <img
          v-show="!skin.screenshot"
          class="img-fluid"
          src="https://dummyimage.com/800x455/002b36/ffffff.png&text=No+screenshot"
        />
      </div>
      <div class="card-body">
        <h5
          class="card-title mb-0 d-flex justify-content-sm-start align-items-center"
        >
          {{ $t(skin.title) }}
          <small v-show="$isActive(skin)" class="mx-1 badge badge-success">{{
            $t('Active')
          }}</small>
          <small
            v-show="$isDisabled(skin)"
            class="mx-1 badge badge-secondary"
            >{{ $t('Disabled') }}</small
          >
        </h5>
        <small class="text-muted font-italic mb-2 d-inline-block">
          {{ skin.author.name }}
          <a
            v-show="skin.author.url !== undefined && skin.author.url"
            :href="skin.author.url"
            class="ml-1"
            target="_blank"
            ><i class="fas fa-globe-europe"
          /></a>
          <a
            v-show="skin.author.email !== undefined && skin.author.email"
            :href="'mailto:' + skin.author.email"
            class="ml-1"
            target="_blank"
            ><i class="fas fa-paper-plane"
          /></a>
        </small>
        <p class="card-text mb-0">
          {{ $t(skin.description) }}
        </p>
      </div>
      <div
        v-if="!$isActive(skin) && !$isDisabled(skin)"
        class="card-footer d-flex justify-content-center align-items-center"
      >
        <a class="btn btn-sm btn-success" @click="$setActive(skin)">{{
          $t('Activate')
        }}</a>
      </div>
      <div
        v-if="$isActive(skin) && !$isDisabled(skin) && $hasManual(skin)"
        class="card-footer d-flex justify-content-center align-items-center"
      >
        <button
          class="btn btn-sm btn-primary"
          @click="setManualComponent(skin)"
        >
          {{ $t('Manual') }}
        </button>
      </div>
    </div>

    <component :is="manual" @click.native="manual = null" />
  </div>
</template>

<script>
import SkinManualScania from '@/components/menu/skin-manuals/SkinManualScania';
import SkinManualScaniaNextGen from '@/components/menu/skin-manuals/SkinManualScaniaNextGen';
import SkinsMixin from '@/mixins/SkinsMixin';

export default {
  name: 'MenuTabSkins',
  components: {
    SkinManualScania,
    SkinManualScaniaNextGen
  },
  mixins: [SkinsMixin],
  data() {
    return {
      manual: null
    };
  },
  methods: {
    setManualComponent(skin) {
      switch (skin.id) {
        case 'Scania':
          this.manual = 'SkinManualScania';
          break;

        case 'ScaniaNextGen':
          this.manual = 'SkinManualScaniaNextGen';
          break;

        default:
          this.manual = null;
          break;
      }
    }
  }
};
</script>
