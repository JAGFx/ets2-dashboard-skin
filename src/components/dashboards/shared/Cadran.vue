<template>
	<div :class="classCSS" :style="{ 'transform' : 'rotate(' + angle() + 'deg)' }" v-bind:data-type="type"></div>
</template>

<script>
	export default {
    name:    'Cadran',
    props:   [
      'classCSS',
      'type',
      'value',
      'min',
      'max',
      'minAngle',
      'maxAngle'
    ],
    methods: {
			angle() {
				const minValue = this.min;
				const maxValue = this.max;
				const minAngle = this.minAngle;
				const maxAngle = this.maxAngle;
				let value      = this.value;
				value          = Math.min( value, maxValue );
				value          = Math.max( value, minValue );
				const offset   = (value - minValue) / (maxValue - minValue);
				
				return (maxAngle - minAngle) * offset + minAngle;
			}
		}
	};
</script>
