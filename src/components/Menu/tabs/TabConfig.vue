<template>
	<div class="tab-config">
		<section id="general">
			<h2>General</h2>
			<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut consequatur dolorum earum explicabo libero
				magnam molestiae natus provident quia ut?
			</p>
			
			<div :key="category.name" class="fields" v-for="category in config.categories">
				<h3>{{ category.name }}</h3>
				
				<TabConfigElement :inputData.sync="data" :key="element.id" v-bind="{
					'elm': element,
					data: data
				}" v-for="element in category.elements" />
			</div>
		</section>
	</div>
</template>

<script>
	import config           from '../../../assets/config_template.json';
	import TabConfigElement from './Elements/TabConfigElement';
	
	export default {
		name:       'TabConfig',
		components: { TabConfigElement },
		data() {
			return {
				config: config,
				data:   'kg'
			};
		}
	};
</script>

<style lang="scss" scoped>
	@import "../../../assets/scss/menu/_tab-config/tab-config";
</style>
