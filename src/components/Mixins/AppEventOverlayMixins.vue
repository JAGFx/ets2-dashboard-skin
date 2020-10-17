<script>
import { EventBus } from '@/event-bus';
import _event       from '@/utils/_event';

const defaultData = {
  eventProcessing: false,
  eventName:       null,
  eventRawData:    {
    'game': {
      'fine': {
        'active':  true,
        'amount':  1000,
        'offence': { 'id': 'speeding', 'name': 'Speeding' }
      }
    }
  }
};

let data = Object.assign( {}, defaultData );

export default {
  data() {
    return data;
  },
  created() {
    EventBus.$on( _event.EVT_UPDATE, dataIn => {
      this.eventProcessing = dataIn.eventProcessing;
      this.eventName       = dataIn.eventName;
      this.eventRawData    = Object.assign( {}, this.eventRawData, dataIn.eventRawData );

      setTimeout( () => {
        this.eventProcessing = defaultData.eventProcessing;
        this.eventName       = defaultData.eventName;
        this.eventRawData    = Object.assign( {}, this.eventRawData, defaultData.eventRawData );
      }, 3000 );
    } );
  },
  sockets: {
    log( log ) {
      this.$updateEvent( log );
    }
  }
};
</script>