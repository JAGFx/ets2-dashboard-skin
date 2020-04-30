<template>
	<div class="tab-skins">
		<div :class="{ 'active': $isActive(skin) }" :key="skin"
			class="card text-white mb-3"
			v-for="skin in skins"
		>
			<div>
				<img alt="..." class="img-fluid" src="https://dummyimage.com/850x455/000455/fff.pngs">
			</div>
			<div class="card-body">
				<h5 class="card-title mb-0 d-flex justify-content-sm-start align-items-center">
					{{ skin.title }}
					<small class="mx-1 badge badge-success" v-show="$isActive(skin)">Active</small>
				</h5>
				<small class="text-muted font-italic mb-2 d-inline-block">
					{{ skin.author.name }}
				</small>
				<p class="card-text mb-0">{{ skin.description }}</p>
			</div>
			<div class="card-footer d-flex justify-content-center align-items-center" v-if="!$isActive(skin)">
				<a class="btn btn-sm btn-success" href="#">Activate</a>
			</div>
		</div>
	</div>
</template>

<script>
	import skinsMixins from '../../Mixins/skinsMixins';
	
	export default {
		name:   'TabSkins',
		mixins: [ skinsMixins ]
	};
</script>

<style lang="scss" scoped>
	@import "../../../assets/scss/menu/tab-skins";
</style>
