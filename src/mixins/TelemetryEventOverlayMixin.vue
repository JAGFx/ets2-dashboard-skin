<script>
import eventsText from '@/data/events.json';
import TelemetryMixin from '@/mixins/TelemetryMixin';
import { mapGetters } from 'vuex';

export default {
  mixins: [TelemetryMixin],
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
