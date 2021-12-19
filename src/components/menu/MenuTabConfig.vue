<template>
  <div class="menu-tab-config">
    <div class="d-flex justify-content-center align-items-center pb-3">
      <div class="dropdown">
        <button
          id="downloadConfigDropdown"
          class="btn btn-sm btn-outline-ets mx-1 dropdown-toggle"
          type="button"
          data-toggle="dropdown"
          aria-expanded="false"
          :disabled="isOnProcessing"
        >
          <b-icon-file-earmark-arrow-down />
          {{ $t('Download') }}
        </button>
        <div class="dropdown-menu" aria-labelledby="downloadConfigDropdown">
          <a class="dropdown-item" @click="download('app')">App</a>
          <a class="dropdown-item" @click="download('game')">Game</a>
        </div>
      </div>
      <!--      <button-->
      <!--        :disabled="isOnProcessing"-->
      <!--        class="btn btn-sm btn-outline-ets mx-1"-->
      <!--        @click="download"-->
      <!--      >-->
      <!--        <b-icon-file-earmark-arrow-down />-->
      <!--        {{ $t('Download') }}-->
      <!--      </button>-->
      <span>
        <div class="dropdown">
          <button
            id="uploadConfigDropdown"
            class="btn btn-sm btn-outline-ets mx-1 dropdown-toggle"
            type="button"
            data-toggle="dropdown"
            aria-expanded="false"
            :disabled="isOnProcessing"
          >
            <b-icon-file-earmark-arrow-up /> {{ $t('Upload') }}
          </button>
          <div class="dropdown-menu" aria-labelledby="uploadConfigDropdown">
            <a
              class="dropdown-item"
              @click="
                showUpload = !showUpload;
                targetUpload = 'app';
              "
              >App</a
            >
            <a
              class="dropdown-item"
              @click="
                showUpload = !showUpload;
                targetUpload = 'game';
              "
              >Game</a
            >
          </div>
        </div>
        <!--        <button-->
        <!--          :disabled="isOnProcessing"-->
        <!--          class="btn btn-sm btn-outline-ets mx-1"-->
        <!--          @click="showUpload = !showUpload"-->
        <!--        >-->
        <!--        <b-icon-file-earmark-arrow-up /> {{ $t('Upload') }}-->
        <!--        </button>-->
        <input
          v-if="showUpload"
          ref="uploadFile"
          accept="application/json"
          class="btn btn-sm btn-outline-ets mx-1"
          type="file"
          @change="upload"
        />
      </span>
    </div>

    <ConfigSection id="general" name="General">
      <ConfigCategoryGeneral />
      <ConfigCategoryEvents />
      <ConfigCategoryUnits />
    </ConfigSection>

    <ConfigSection id="map" name="Map">
      <ConfigCategoryMap />
    </ConfigSection>

    <ConfigSection id="jagfx" name="JAGFx">
      <ConfigCategoryJagfx />
    </ConfigSection>
  </div>
</template>

<script>
import ConfigCategoryEvents from '@/components/menu/config-categories/ConfigCategoryEvents';
import ConfigCategoryGeneral from '@/components/menu/config-categories/ConfigCategoryGeneral';
import ConfigCategoryJagfx from '@/components/menu/config-categories/ConfigCategoryJagfx';
import ConfigCategoryMap from '@/components/menu/config-categories/ConfigCategoryMap';
import ConfigCategoryUnits from '@/components/menu/config-categories/ConfigCategoryUnits';
import ConfigSection from '@/components/menu/ConfigSection';
import { config as uConfig, history } from '@/utils/utils';
import { mapGetters } from 'vuex';
import { store as telemetryStore } from '@/store/telemetry.store';

export default {
  name: 'MenuTabConfig',
  components: {
    ConfigSection,
    ConfigCategoryGeneral,
    ConfigCategoryEvents,
    ConfigCategoryUnits,
    ConfigCategoryMap,
    ConfigCategoryJagfx
  },
  data() {
    return {
      showUpload: false,
      targetUpload: null
    };
  },
  computed: {
    ...mapGetters({
      isOnProcessing: 'app/isOnProcessing'
    })
  },
  methods: {
    download(target) {
      this.$pushALog(
        'Download config',
        history.HTY_ZONE.MENU_CONFIG,
        history.HTY_LEVEL.DEBUG
      );

      uConfig.download(target, telemetryStore.telemetry.game.game.name);
    },
    upload(input) {
      this.$pushALog('Start config upload', history.HTY_ZONE.MENU_CONFIG);

      uConfig
        .upload(input.target.files[0])
        .then(
          (data) => {
            this.$pushALog('Config upload done', history.HTY_ZONE.MENU_CONFIG);

            const commitName =
              this.targetUpload === 'game' ? 'config/setGame' : 'config/setApp';
            this.$store.commit(commitName, data);
          },
          (e) => {
            this.$store.dispatch('app/setError', {
              message: {
                type: 'dark',
                title: 'Upload failed',
                message: e
              },
              details: {
                message: e,
                code: '#CONFIG_UPLOAD_FAILED'
              }
            });
          }
        )
        .finally(() => {
          this.$refs.uploadFile.value = null;
          this.showUpload = false;
          this.targetUpload = null;
        });
    }
  }
};
</script>
