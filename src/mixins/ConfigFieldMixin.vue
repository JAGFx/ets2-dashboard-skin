<script>
import _              from 'lodash';
import { mapGetters } from 'vuex';

export default {
  name:  'ConfigFieldMixin',
  props: {
    label:       {
      type:     String,
      required: true
    },
    description: {
      type:     String,
      required: true
    },
    disabled:    {
      type:     Boolean,
      required: true
    },
    values:      {
      type:     Promise,
      required: false,
      default:  null
    },
    id:          {
      type:     String,
      required: true
    }
  },
  data() {
    return {
      val:  null,
      vals: []
    };
  },
  computed: {
    ...mapGetters( {
      current:          'config/get',
      appGetProcessing: 'app/getProcessing'
    } )
  },
  created() {

    if ( this.values !== null )
      this.values
          .then( data => {
            this.vals          = data;
            const currentValue = this.$store.getters[ 'config/get' ]( this.id );

            this.val = (this.vals.length > 0 && currentValue === null)
                ? _.first( this.vals ).value
                : currentValue;
          } );
    else
      this.val = this.$store.getters[ 'config/get' ]( this.id );
  },
  methods:  {
    set( value ) {
      this.$store.commit( 'config/setElm', {
        id:    this.id,
        value: value
      } );
    }
  }
};
</script>