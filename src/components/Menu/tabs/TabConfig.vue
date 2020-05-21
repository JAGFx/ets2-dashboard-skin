<template>
	<div class="tab-config">
		<section id="general">
			<h2>General</h2>
			<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut consequatur dolorum earum explicabo libero
				magnam molestiae natus provident quia ut?
			</p>
			
			<div class="fields">
				<h3>Units</h3>
				
				<TabConfigSwitchMixin @newValue="update" v-bind="{
					'value': true
				}" />
				<TabConfigSelectMixin @newValue="update" v-bind="{
					'value': 'pa'
				}" />
			</div>
		</section>
	</div>
</template>

<script>
	import pkg                  from '../../../../package.json';
	import TabConfigSelectMixin from './mixins/TabConfigSelectMixin';
	import TabConfigSwitchMixin from './mixins/TabConfigSwitchMixin';
	
	export default {
		name:       'TabConfig',
		components: { TabConfigSwitchMixin, TabConfigSelectMixin },
		data() {
			return pkg;
		},
		methods:    {
			update( value ) {
				console.log( 'New value: ', value );
			}
		}
	};
</script>

<style lang="scss" scoped>
	@import "../../../assets/scss/menu/_tab-config/tab-config";
</style>
