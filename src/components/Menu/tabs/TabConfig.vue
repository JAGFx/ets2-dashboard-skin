<template>
	<div class="tab-config">
		<b-overlay :variant="'transparent'" no-wrap :show="appGetProcessing()"><!---->
			<template v-slot:overlay>
				<div class="d-flex justify-content-center flex-column align-items-center">
					<h1>Processing</h1>
					<b-spinner type="grow" label="Loading..."></b-spinner>
				</div>
			</template>
		</b-overlay>
		<div class="d-flex justify-content-center align-items-center pb-3">
			<button @click="save" class="btn btn-sm btn-outline-ets mx-1" :disabled="appGetProcessing()">
				<b-icon-file-earmark-check></b-icon-file-earmark-check>
				Save
			</button>
			<button @click="download" class="btn btn-sm btn-outline-ets mx-1" :disabled="appGetProcessing()">
				<b-icon-file-earmark-arrow-down></b-icon-file-earmark-arrow-down>
				Download
			</button>
			<button @click="reset" class="btn btn-sm btn-outline-ets mx-1" :disabled="appGetProcessing()">
				<b-icon-file-earmark-break></b-icon-file-earmark-break>
				Reset
			</button>
			<span>
				<button @click="showUpload = !showUpload" class="btn btn-sm btn-outline-ets mx-1" :disabled="appGetProcessing()">
					<b-icon-file-earmark-arrow-up></b-icon-file-earmark-arrow-up> Upload
				</button>
				<input @change="upload" accept="application/json" class="btn btn-sm btn-outline-ets mx-1" type="file" v-show="showUpload" ref="uploadFile" />
			</span>
		</div>
		<section id="general">
			<h3 class="p-2">General</h3>
			
			<div :key="category.name" class="fields mb-4" v-for="category in config.categories">
				<h4>{{ category.name }}</h4>
				
				<TabConfigElement :inputData.sync="data[ element.id ]" :key="element.id" class="pl-3 p-2" v-bind="{
					'elm': element,
					data: data[ element.id ]
				}" v-for="element in category.elements" />
			</div>
		</section>
		
		<section :id="skin.id" :key="skin.id" v-for="skin in skins">
			<h3 class="d-flex justify-content-between align-items-center p-2">
				<span>{{ skin.title }}</span>
				<span :data-target="'.config-skin-' + skin.id" class="text-muted more" data-toggle="collapse">
					<i class="fas fa-angle-double-right"></i>
					Show more
				</span>
			</h3>
			<!--			{{ skinsConfigTemplate( skin ) }}-->
			<div :class="'config-skin-' + skin.id" :key="category.name" class="collapse fields mb-4" v-for="category in skinsConfigTemplate( skin )">
				<h4 class="d-flex justify-content-between align-items-center">{{ category.name }}</h4>
				
				<TabConfigElement :inputData.sync="data[ element.id ]" :key="element.id" class="pl-3 p-2" v-bind="{
					'elm': element,
					data: data[ element.id ]
				}" v-for="element in category.elements" />
			</div>
		</section>
	</div>
</template>

<script>
	import _              from 'lodash';
	import { mapGetters } from 'vuex';
	import configJAGFx    from '../../../dashboards/jagfx/data/config_template.json';
	
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
				JAGFx: configJAGFx
			};
			const data        = this.$store.getters[ 'config/all' ];
			
			return {
				config:      config,
				skins:       skinsOk,
				configSkins: configSkins,
				showUpload:  false,
				processing:  false,
				data:        data
			};
		},
		methods:    {
			skinsConfigTemplate( skinTarget ) {
				return this.configSkins[ skinTarget.id ].categories;
			},
			reset() {
				this.data = utilsConfig.generateEmptyData( config, this.configSkins );
			},
			save() {
				this.$store.commit( 'app/setProcessing', true );
				utilsConfig
					.save( this.data )
					.then( data => {
						//utils.app.sleep( 1000 );
						console.log( 'Its OK' );
					} )
					.finally( () => {
						this.$store.commit( 'app/setProcessing', false );
					} );
			},
			download() {
				this.$store.commit( 'app/setProcessing', true );
				utilsConfig
					.download()
					.finally( () => {
						this.$store.commit( 'app/setProcessing', false );
					} );
			},
			upload( input ) {
				this.$store.commit( 'app/setProcessing', true );
				
				utilsConfig
					.upload( input.target.files[ 0 ] )
					.then( data => {
						console.log( data );
						this.$store.commit( 'config/setElm', data );
					}, e => alert( e ) )
					.finally( () => {
						this.$refs.uploadFile.value = null;
						this.showUpload             = false;
						
						this.$store.commit( 'app/setProcessing', false );
					} );
			},
			...mapGetters( {
				appGetProcessing: 'app/getProcessing'
			} )
		}
	};
</script>

<style lang="scss" scoped>
	@import "../../../assets/scss/menu/_tab-config/tab-config";
</style>
