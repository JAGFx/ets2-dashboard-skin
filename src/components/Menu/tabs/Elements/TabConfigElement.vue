<template>
	<div class="field d-flex justify-content-between align-items-center">
		<div>
			<h4 class="m-0">{{ elm.label }}</h4>
			<small class="font-italic text-muted">{{ elm.description }}</small>
		</div>
		<div class="switch d-flex justify-content-between align-items-stretch" v-if="elm.values.length <= 2">
			<div :class="{ 'active': data === value.value }" :key="value.value" @click="set( value.value )" class="value w-100 m-0 text-center d-flex justify-content-center align-items-center" v-for="value in elm.values">
				<span class="py-1 px-2">{{ value.label }}</span>
			</div>
		
		</div>
		<div class="select d-flex justify-content-between align-items-stretch" v-else-if="elm.values.length > 2">
			<select @change="set( current )" class="custom-select value w-100 m-0 py-1 px-2" v-model="current">
				<option :key="value.value" :value="value.value" v-for="value in elm.values">{{ value.label }}</option>
			</select>
		</div>
	</div>
</template>

<script>
	export default {
		name:    'TabConfigElement',
		props:   [ 'elm', 'data' ],
		data() {
			return {
				current: this.data
			};
		},
		methods: {
			set( value ) {
				//console.log( value );
				//this.data = value;
				this.$emit( 'update:inputData', value );
			}
		}
	};
</script>

<style lang="scss" scoped>
	@import "../../../../assets/scss/menu/_tab-config/switch";
	@import "../../../../assets/scss/menu/_tab-config/select";
</style>
