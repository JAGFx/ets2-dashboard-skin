<template>
	<div class="tab-config">
		<section id="general">
			<h3 class="p-2">General</h3>
			<button @click="save">Save</button>
			<button @click="exporting">Export</button>
			<button @click="reset">Reset</button>
			
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
	import _           from 'lodash';
	import utilsConfig from '../../../utils/_config';
	
	import config      from '../../../data/config_template.json';
	import skins       from '../../../data/skins.json';
	import configJAGFx from '../../../dashboards/jagfx/data/config_template.json';
	
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
			const data        = utilsConfig.load();
			
			return {
				config:      config,
				skins:       skinsOk,
				configSkins: configSkins,
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
				utilsConfig.save( this.data );
			},
			exporting() {
				utilsConfig.exporting( this.data );
			}
			// TODO: Add import file
		}
	};
</script>

<style lang="scss" scoped>
	@import "../../../assets/scss/menu/_tab-config/tab-config";
</style>
