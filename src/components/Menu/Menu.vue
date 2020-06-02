<template>
	<div class="menu h-100">
		<nav>
			<ul>
				<li
					v-bind:class="{ active: currentTab === tab }"
					v-bind:key="tab"
					v-for="tab in tabs"
					v-on:click="currentTab = tab"
				>{{ tab }}
				</li>
			</ul>
		</nav>
		<component class="tab-content h-100" v-bind:is="currentTabComponent"></component>
	</div>
</template>

<script>
	import TabAbout  from './tabs/TabAbout';
	import TabConfig from './tabs/TabConfig';
	import TabSkins  from './tabs/TabSkins';
	
	export default {
		name:       'Menu',
		components: {
			TabSkins,
			TabConfig,
			TabAbout
		},
		data() {
			return {
				currentTab: 'Config',
				tabs:       [ 'Skins', 'Config', 'About' ]
			};
		},
		computed:   {
			currentTabComponent: function () {
				return 'Tab' + this.currentTab;
			}
		}
	};
</script>

<style lang="scss" scoped>
	@import '../../assets/scss/menu/menu';
</style>
