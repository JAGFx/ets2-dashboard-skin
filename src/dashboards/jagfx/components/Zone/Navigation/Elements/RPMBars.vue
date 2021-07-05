<template>
	<div class="bars">
		<div :class="{
			'active' : getRPMBarActive( i ),
			'green': isAGreenBar( i ),
			'blue': isABlueBar( i ),
			'red': isARedBar( i )
		}" class="bar" :key="i" v-for="i in maxBarRpm"></div>
	</div>
</template>

<script>
import truck_engine_rpm from '@/data/truck-engine-rpm.json';
import jq               from 'json-query';

export default {
  name:  'RPMBars',
  props: [
    'brand',
    'engine',
    'model'
  ],
  data:  function () {
    return {
      ter:       null,
      maxBarRpm: 25
			};
		},
		mounted() {
			//console.log( 'Polp', this );
			if ( this.brand !== undefined || this.model !== undefined ) {
				const ter = JSON.parse( JSON.stringify( truck_engine_rpm ) );
				this.ter  = jq( `trucks[brandId=${ this.brand.id }].models[modelId=${ this.model.id }]`,
					{ data: ter } ).value;
				
				if ( this.ter === null ) {
					this.ter = {
						max:  2500,
						low:  null,
						mid:  null,
						high: null
					};
				}
				
				//console.log( this.ter );
			}
		},
		methods: {
			getRPMBarActive:  function ( i ) {
				if ( this.ter === undefined || this.ter === null )
					return false;
				
				const rpmBarFrom = this.getCurrentRpmBar( i );
				
				//console.log( iLow,this.engine.rpm.value, rpmBarFrom, this.ter );
				return (this.engine.rpm.value >= rpmBarFrom && this.engine.rpm.value !== 0);
			},
			getCurrentRpmBar: function ( i ) {
				if ( this.ter === null )
					return 0;
				
				const maxBar   = this.maxBarRpm;
				const rpmByBar = (this.engine.rpm.max / maxBar);
				const iLow     = (maxBar - i);
				
				return (iLow * rpmByBar);
			},
			isAGreenBar:      function ( i ) {
				if ( this.ter === null )
					return false;
				
				const rpmBarFrom = this.getCurrentRpmBar( i );
				
				return this.ter.low !== null && (rpmBarFrom >= this.ter.low.from && rpmBarFrom <= this.ter.low.to);
			},
			isABlueBar:       function ( i ) {
				if ( this.ter === null )
					return false;
				
				const rpmBarFrom = this.getCurrentRpmBar( i );
				
				return this.ter.mid !== null && (rpmBarFrom >= this.ter.mid.from && rpmBarFrom <= this.ter.mid.to);
			},
			isARedBar:        function ( i ) {
				if ( this.ter === null )
					return false;
				
				const rpmBarFrom = this.getCurrentRpmBar( i );
				//console.log( rpmBarFrom );
				
				return this.ter.high !== null && (rpmBarFrom >= this.ter.high.from);
			}
		}
	};

</script>

<style lang="scss" scoped>
	@import "../../../../assets/scss/navigation/rpm_bars";
</style>
