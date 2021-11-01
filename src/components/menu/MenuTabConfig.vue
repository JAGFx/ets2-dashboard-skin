<template>
  <div class="menu-tab-config">
    <div class="d-flex justify-content-center align-items-center pb-3">
      <button
        :disabled="isOnProcessing"
        class="btn btn-sm btn-outline-ets mx-1"
        @click="download"
      >
        <b-icon-file-earmark-arrow-down />
        {{ $t('Download') }}
      </button>
      <span>
        <button
          :disabled="isOnProcessing"
          class="btn btn-sm btn-outline-ets mx-1"
          @click="showUpload = !showUpload"
        >
          <b-icon-file-earmark-arrow-up /> {{ $t('Upload') }}
        </button>
        <input
          v-show="showUpload"
          ref="uploadFile"
          accept="application/json"
          class="btn btn-sm btn-outline-ets mx-1"
          type="file"
          @change="upload"
        >
      </span>
    </div>

    <ConfigSection
      id="general"
      name="General"
    >
      <ConfigCategoryGeneral />
      <ConfigCategoryEvents />
      <ConfigCategoryUnits />
    </ConfigSection>

    <ConfigSection
      id="map"
      name="Map"
    >
      <ConfigCategoryMap />
    </ConfigSection>

    <ConfigSection
      id="jagfx"
      name="JAGFx"
    >
      <ConfigCategoryJagfx />
    </ConfigSection>
  </div>
</template>

<script>
import ConfigCategoryEvents           from '@/components/menu/config-categories/ConfigCategoryEvents';
import ConfigCategoryGeneral          from '@/components/menu/config-categories/ConfigCategoryGeneral';
import ConfigCategoryJagfx            from '@/components/menu/config-categories/ConfigCategoryJagfx';
import ConfigCategoryMap              from '@/components/menu/config-categories/ConfigCategoryMap';
import ConfigCategoryUnits            from '@/components/menu/config-categories/ConfigCategoryUnits';
import ConfigSection                  from '@/components/menu/ConfigSection';
import { config as uConfig, history } from '@/utils/utils';
import { mapGetters }                 from 'vuex';

export default {
  name:       'MenuTabConfig',
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
      showUpload: false
    };
  },
  computed: {
    ...mapGetters( {
      isOnProcessing: 'app/isOnProcessing'
    } )
  },
  methods:  {
    download() {
      this.$pushALog( 'Download config', history.HTY_ZONE.MENU_CONFIG, history.HTY_LEVEL.DEBUG );

      uConfig.download();
    },
    upload( input ) {
      this.$pushALog( 'Start config upload', history.HTY_ZONE.MENU_CONFIG );

      uConfig
          .upload( input.target.files[ 0 ] )
          .then( data => {
            this.$pushALog( 'Config upload done', history.HTY_ZONE.MENU_CONFIG );

            //console.log( data );
            // TODO: Change it
            this.$store.commit( 'config/setElms', data );

          }, e => {
            this.$store.dispatch( 'app/setError', {
              message: {
                type:    'dark',
                title:   'Upload failed',
                message: e
              },
              details: {
                message: e,
                code:    '#CONFIG_UPLOAD_FAILED'
              }
            } );
          } )
          .finally( () => {
            this.$refs.uploadFile.value = null;
            this.showUpload             = false;
          } );
    }
  }
};
</script>
