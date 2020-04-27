<template>
	<div class="tab-about">
		<aside class="author">
			<img alt="" src="https://avatars3.githubusercontent.com/u/12508080?s=460&u=f59ce1bde619fa0e6c226e92ab97945c4561eea5&v=4">
			<div class="aside-wrapper">
				<span><span class="badge badge-danger mr-2">Author</span>{{ author.name }}</span>
				<small class="text-muted">
					<a :href="`mailto:${author.email}`" target="_blank">{{ author.email }}</a>
				</small>
				<span class="d-flex urls justify-content-between w-100">
					<a :href="author.url" class="btn btn-sm btn-outline-secondary mx-1" target="_blank">
						Site
					</a>
					<a class="btn btn-sm btn-outline-secondary mx-1" href="https://twitter.com/d_jagfx" target="_blank">
						Twitter
					</a>
					<a class="btn btn-sm btn-outline-secondary mx-1" href="https://github.com/JAGFx" target="_blank">
						Github
					</a>
				</span>
			</div>
		</aside>
		<div class="project mt-4">
			<div class="aside-wrapper">
				<div class="mb-3">
					<h2>{{ description }}</h2>
					<h3>
						<span class="badge badge-danger mr-2">v{{ version }}</span>
					</h3>
				</div>
				<span class="d-flex urls justify-content-between w-100">
					<a :href="bugs.url" class="mx-1" target="_blank">
						Find a bug ?
					</a>
					<a :href="repository.url" class="mx-1" target="_blank">
						Repository
					</a>
					<a :href="homepage" class="mx-1" target="_blank">
						Doc
					</a>
					<a class="mx-1" href="https://github.com/JAGFx/ets2-dashboard-skin/blob/master/LICENSE" target="_blank">
						Licence {{ license }}
					</a>
				</span>
			</div>
		</div>
	</div>
</template>

<script>
	import pkg from '../../../../package.json';
	
	export default {
		name: 'TabAbout',
		data() {
			return pkg;
		}
	};
</script>

<style lang="scss" scoped>
	@import "../../../assets/scss/menu/_tab-about";
</style>
