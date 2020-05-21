<template>
	<div class="field d-flex justify-content-between align-items-center">
		<div>
			<h4 class="m-0">Mass</h4>
			<small class="font-italic text-muted">Lorem ipsum dolor sit amet, consectetur adipisicing elit. A,
				inventore.</small>
		</div>
		<div class="switch d-flex justify-content-between align-items-center">
			<div :class="{ 'active': switchValue }" @click="setValue(true)" class="value w-100 h-100 m-0 text-center">
				<span class="py-1 px-2">On</span>
			</div>
			<div :class="{ 'active': !switchValue }" @click="setValue(false)" class="value w-100 h-100 m-0 text-center">
				<span class="py-1 px-2">Off</span>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name:    'TabConfigSwitchMixin',
		props:   [ 'value' ],
		data() {
			return {
				switchValue: this.value
			};
		},
		methods: {
			setValue( value ) {
				this.switchValue = value;
				console.log( 'Click', this.switchValue );
				this.$emit( 'newValue', value );
			}
		}
	};
</script>

<style lang="scss" scoped>
	@import "../../../../assets/scss/menu/_tab-config/switch";
</style>
