<template>
	
	
	<div class="tab-skins">
		<div :class="{ 'active': isActive(i) }" :key="i" class="card text-white mb-3" v-for="i in 3">
			<div>
				<img alt="..." class="img-fluid" src="https://dummyimage.com/850x455/000455/fff.pngs">
			</div>
			<div class="card-body">
				<h5 class="card-title mb-0 d-flex justify-content-sm-start align-items-center">
					Card title
					<small class="mx-1 badge badge-success" v-show="isActive(i)">Active</small>
				</h5>
				<small class="text-muted font-italic mb-2 d-inline-block">By an author</small>
				<p class="card-text mb-0">Some quick example text to build on the card title and make up the bulk of the
					card's content.
				</p>
			</div>
			<div class="card-footer d-flex justify-content-center align-items-center" v-if="!isActive(i)">
				<a class="btn btn-sm btn-success" href="#">Activate</a>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name:    'TabSkins',
		methods: {
			isActive( i ) {
				return i === 1;
			}
		}
	};
</script>

<style lang="scss" scoped>
	@import "../../../assets/scss/menu/tab-skins";
</style>
