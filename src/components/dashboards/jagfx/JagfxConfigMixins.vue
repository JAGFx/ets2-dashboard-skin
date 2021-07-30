<script>
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
    const config = this.$store.getters[ 'config/all' ];
    const keys   = Object.keys( config );

    const configRight        = keys.filter( elm => {
      const isOnSide  = /^jagfx_elements_right/.test( elm );
      const isEnabled = this.$store.getters[ 'config/enabled' ]( elm );

      return isOnSide && isEnabled;
    } );
    const configMiddleTop    = keys.filter( elm => {
      const isOnSide  = /^jagfx_elements_mid_top/.test( elm );
      const isEnabled = this.$store.getters[ 'config/enabled' ]( elm );

      return isOnSide && isEnabled;
    } );
    const configMiddleBottom = keys.filter( elm => {
      const isOnSide  = /^jagfx_elements_mid_bottom/.test( elm );
      const isEnabled = this.$store.getters[ 'config/enabled' ]( elm );

      return isOnSide && isEnabled;
    } );

    this.elements.right         = configRight.slice( 0, this.maxElements.right );
    this.elements[ 'middle-t' ] = configMiddleTop.slice( 0, this.maxElements[ 'middle-t' ] );
    this.elements[ 'middle-b' ] = configMiddleBottom;
  },
  methods: {
    $elementIsEnabled: function ( side, element, options ) {
      const sideElements = this.elements[ side ];
      const indexElement = sideElements.indexOf( element );
      const isOnSide     = indexElement !== -1;

      if ( options !== undefined ) {
        const navElmSide       = options.side;
        const maxMiddleElement = this.maxElements[ 'middle-t' ];

        if ( indexElement + 1 > ((maxMiddleElement / 2)) && navElmSide === 'left' )
          return false;

        if ( navElmSide === 'right' ) {
          if ( ((indexElement + 1) <= ((maxMiddleElement / 2))) || ((indexElement + 1) > maxMiddleElement) )
            return false;
        }
      }

      if ( !this.$store.getters[ 'config/enabled' ]( element ) )
        return false;

      return isOnSide;
    },
    $elementsLength:   function ( side ) {
      return this.elements[ side ].length;
    }
  }
};
</script>
