<script>
/**
 * @author:	Emmanuel SMITH <hey@emmanuel-smith.me>
 * project:	ets2-dashboard-skin
 * file: 	JagfxConfigMixins.vue
 * Date: 	30/04/2020
 * Time: 	13:12
 */

import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      elements:    {
        right:      [],
        'middle-t': [],
        'middle-b': []
      },
      maxElements: {
        right:      7,
        'middle-t': 4,
        'middle-b': -1
      }
    };
  },
  created() {
    const config = this.allConfig; //this.$store.getters[ 'config/all' ];
    const keys   = Object.keys( config );

    const configRight        = keys.filter( elm => {
      const isOnSide  = /^jagfx_elements_right/.test( elm );
      const isEnabled = config[ elm ] === 'true';

      //console.log( elm, typeof isEnabled );

      return isOnSide && isEnabled;
    } );
    const configMiddleTop    = keys.filter( elm => {
      const isOnSide  = /^jagfx_elements_mid_top/.test( elm );
      const isEnabled = config[ elm ] === 'true';

      return isOnSide && isEnabled;
    } );
    const configMiddleBottom = keys.filter( elm => {
      const isOnSide  = /^jagfx_elements_mid_bottom/.test( elm );
      const isEnabled = config[ elm ] === 'true';
				
				return isOnSide && isEnabled;
			} );
			
			this.elements.right         = configRight.slice( 0, this.maxElements.right );
			this.elements[ 'middle-t' ] = configMiddleTop.slice( 0, this.maxElements[ 'middle-t' ] );
			this.elements[ 'middle-b' ] = configMiddleBottom;
		},
		methods: {
			$elementIsEnabled: function ( side, element, options ) {
        const config       = this.allConfig; //this.$store.getters[ 'config/all' ];
        const sideElements = this.elements[ side ];
        const indexElement = sideElements.indexOf( element );
        const isOnSide     = indexElement !== -1;

        if ( options !== undefined ) {
          const navElmSide       = options.side;
          const maxMiddleElement = this.maxElements[ 'middle-t' ];

          if ( indexElement + 1 > ((maxMiddleElement / 2)) && navElmSide === 'left' )
            return false;

          if ( navElmSide === 'right' ) {
            if ( ((indexElement + 1) <= ((maxMiddleElement / 2))) || ((indexElement + 1)
                                                                      > maxMiddleElement) )
              return false;

          }
        }

        if ( !config[ element ] )
          return false;

        return isOnSide;
      },
      $elementsLength:   function ( side ) {
        return this.elements[ side ].length;
      }
    },
  computed:  {
    ...mapGetters( {
      allConfig: 'config/all'
    } )
  }
};
</script>
