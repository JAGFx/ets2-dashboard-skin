<template>
	<div class="tab-skins">
		<div :class="{
				'active': $isActive(skin),
				'disabled': $isDisabled(skin),
			 }" :key="skin.id"
			class="card text-white mb-3"
			v-for="skin in $skins()"
		>
			<div>
				<img class="img-fluid" v-show="skin.screenshot" :src="skin.screenshot">
				<img class="img-fluid" v-show="!skin.screenshot" src="https://dummyimage.com/800x455/002b36/ffffff.png&text=No+screenshot">
			</div>
			<div class="card-body">
				<h5 class="card-title mb-0 d-flex justify-content-sm-start align-items-center">
					{{ skin.title }}
					<small class="mx-1 badge badge-success" v-show="$isActive(skin)">Active</small>
					<small class="mx-1 badge badge-secondary" v-show="$isDisabled(skin)">Disabled</small>
				</h5>
				<small class="text-muted font-italic mb-2 d-inline-block">
					{{ skin.author.name }}
					<a :href="skin.author.url" class="ml-1" target="_blank" v-show="skin.author.url !== undefined && skin.author.url"><i class="fas fa-globe-europe"></i></a>
					<a :href="'mailto:' + skin.author.email" class="ml-1" target="_blank" v-show="skin.author.email !== undefined && skin.author.email"><i class="fas fa-paper-plane"></i></a>
				</small>
				<p class="card-text mb-0">{{ skin.description }}</p>
			</div>
			<div class="card-footer d-flex justify-content-center align-items-center" v-if="!$isActive(skin) && !$isDisabled(skin)">
				<a @click="$setActive(skin)" class="btn btn-sm btn-success">Activate</a>
			</div>
		</div>
	</div>
</template>

<script>
import SkinsMixin from '@/mixins/SkinsMixin';

export default {
  name:   'TabSkins',
  mixins: [ SkinsMixin ]
};
</script>

<style lang="scss" scoped>
	@import "../../../assets/scss/menu/tab-skins";
</style>
