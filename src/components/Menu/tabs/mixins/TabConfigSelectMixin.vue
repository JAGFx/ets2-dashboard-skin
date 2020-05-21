<template>
	<div class="field d-flex justify-content-between align-items-center">
		<div>
			<h4 class="m-0">Pressure</h4>
			<small class="font-italic text-muted">Lorem ipsum dolor sit amet, consectetur adipisicing elit. A,
				inventore.</small>
		</div>
		<div class="select d-flex justify-content-between align-items-center">
			<select @change="setValue" class="custom-select value w-100 h-100 m-0 py-1 px-2" v-model="currentValue">
				<option value="psi">PSI</option>
				<option value="bar">Bar</option>
				<option value="pa">Pa</option>
			</select>
		</div>
	</div>
</template>

<script>
	export default {
		name:    'TabConfigSelectMixin',
		props:   [ 'value' ],
		data() {
			return {
				currentValue: this.value
			};
		},
		methods: {
			setValue() {
				console.log( 'Click', this.currentValue );
				this.$emit( 'newValue', this.currentValue );
			}
		}
	};
</script>

<style lang="scss" scoped>
	@import "../../../../assets/scss/menu/_tab-config/select";
</style>
