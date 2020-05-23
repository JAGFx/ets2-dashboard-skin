<template>
	<div class="tab-config">
		<section id="general">
			<h1>General</h1>
			
			<div :key="category.name" class="fields mb-4" v-for="category in config.categories">
				<h3>{{ category.name }}</h3>
				
				<TabConfigElement :inputData.sync="data" :key="element.id" class="pl-3 p-2" v-bind="{
					'elm': element,
					data: data
				}" v-for="element in category.elements" />
			</div>
		</section>
		
		<section :id="skin.id" :key="skin.id" v-for="skin in skins">
			{{ skinsConfigTemplate( skin ) }}
			<!--<div :key="category.name" class="fields mb-4" v-for="category in config.categories">
				<h2>{{ category.name }}</h2>
				
				<TabConfigElement class="pl-3 p-2" :inputData.sync="data" :key="element.id" v-bind="{
					'elm': element,
					data: data
				}" v-for="element in category.elements" />
			</div>-->
		</section>
	</div>
</template>

<script>
	import _      from 'lodash';
	import config from '../../../data/config_template.json';
	import skins  from '../../../data/skins.json';
	
	import TabConfigElement from './Elements/TabConfigElement';
	
	export default {
		name:       'TabConfig',
		components: { TabConfigElement },
		data() {
			const skinsOk = _.pickBy( skins.skins, skin => {
				return skin.config_template !== undefined;
			} );
			
			return {
				config: config,
				skins:  skinsOk,
				data:   'kg'
			};
		},
		methods:    {
			skinsConfigTemplate( skinTarget ) {
				// TODO Find a way to get dashboard conf settings dynamically
				return { a: skinTarget };
				//return require( skinTarget.config_template ).categories;
			}
		}
	};
</script>

<style lang="scss" scoped>
	@import "../../../assets/scss/menu/_tab-config/tab-config";
</style>
