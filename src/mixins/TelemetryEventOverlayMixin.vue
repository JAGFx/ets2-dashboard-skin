<script>
import eventsText from '@/data/events.json';
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters({
      eventProcessing: 'event/eventProcessing',
      eventName: 'event/eventName',
      eventRawData: 'event/eventRawData'
    }),
    eventsText() {
      return eventsText[this.eventName];
    }
  }
};
</script>
