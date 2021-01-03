<template>
  <div class="tab-config">
    <div class="d-flex justify-content-center align-items-center pb-3">
      <!--<button :disabled="isOnProcessing" @click="save" class="btn btn-sm btn-outline-ets mx-1">
        <b-icon-file-earmark-check></b-icon-file-earmark-check>
        Save
      </button>-->
      <button :disabled="isOnProcessing" @click="download" class="btn btn-sm btn-outline-ets mx-1">
        <b-icon-file-earmark-arrow-down></b-icon-file-earmark-arrow-down>
        Download
      </button>
      <!--<button :disabled="isOnProcessing" @click="reset" class="btn btn-sm btn-outline-ets mx-1">
        <b-icon-file-earmark-break></b-icon-file-earmark-break>
        Reset
      </button>-->
      <span>
				<button :disabled="isOnProcessing" @click="showUpload = !showUpload" class="btn btn-sm btn-outline-ets mx-1">
					<b-icon-file-earmark-arrow-up></b-icon-file-earmark-arrow-up> Upload
				</button>
				<input @change="upload" accept="application/json" class="btn btn-sm btn-outline-ets mx-1" type="file" v-show="showUpload" ref="uploadFile" />
			</span>
    </div>
    <section id="general">
      <h3 class="p-2">General</h3>

      <div v-for="category in config.categories" :key="category.name" class="fields mb-4">
        <h4>{{ category.name }}</h4>

        <TabConfigElement :key="element.id" v-bind="{
					'elm': element,
				}" class="pl-3 p-2" v-for="element in category.elements" />
      </div>
    </section>

    <section v-for="skin in skins" :id="skin.id" :key="skin.id">
      <h3 class="d-flex justify-content-between align-items-center p-2">
        <span>{{ skin.title }}</span>
        <span :data-target="'.config-skin-' + skin.id" class="text-muted more" data-toggle="collapse">
					<i class="fas fa-angle-double-right"></i>
					Show more
				</span>
      </h3>
      <div v-for="category in skinsConfigTemplate( skin )" :key="category.name" :class="'config-skin-' + skin.id" class="collapse fields mb-4">
        <h4 class="d-flex justify-content-between align-items-center">{{ category.name }}</h4>

        <TabConfigElement :key="element.id" v-bind="{
					'elm': element,
				}" class="pl-3 p-2" v-for="element in category.elements" />
      </div>
    </section>
  </div>
</template>

<script>
import _history       from '@/utils/_history';
import _              from 'lodash';
import { mapGetters } from 'vuex';
import configJAGFx    from '../../../dashboards/jagfx/data/config_template.json';
import configMaps     from '../../../dashboards/maps/data/config_template.json';

import config      from '../../../data/config_template.json';
import skins       from '../../../data/skins.json';
import utilsConfig from '../../../utils/_config';

import TabConfigElement from './Elements/TabConfigElement';

export default {
  name:       'TabConfig',
  components: { TabConfigElement },
  data() {
    const skinsOk     = _.pickBy( skins.skins, skin => {
      return skin.config_template !== undefined && skin.config_template;
    } );
    const configSkins = {
      JAGFx: configJAGFx,
      Maps:  configMaps
    };

    return {
      config:      config,
      skins:       skinsOk,
      configSkins: configSkins,
      showUpload:  false
      //processing:  false
      //data:        data
    };
  },
  computed:   {
    ...mapGetters( {
      configAll:      'config/all',
      isOnProcessing: 'app/isOnProcessing'
    } )
  },
  methods:    {
    skinsConfigTemplate( skinTarget ) {
      return this.configSkins[ skinTarget.id ].categories;
    },
    //reset() {
    //	const emptyData = utilsConfig.generateEmptyData( config, this.configSkins );
    //	this.$store.commit('config/setElms', emptyData );
    //},
    //save() {
    //	utilsConfig
    //		.save( this.data );
    //},
    download() {
      this.$pushALog( 'Download config', _history.HTY_ZONE.MENU_CONFIG, _history.HTY_LEVEL.DEBUG );

      utilsConfig.download();
    },
    upload( input ) {
      this.$pushALog( 'Start config upload', _history.HTY_ZONE.MENU_CONFIG );

      utilsConfig
          .upload( input.target.files[ 0 ] )
          .then( data => {
            this.$pushALog( 'Config upload done', _history.HTY_ZONE.MENU_CONFIG );

            //console.log( data );
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

<style lang="scss" scoped>
@import "../../../assets/scss/menu/_tab-config/tab-config";
</style>
