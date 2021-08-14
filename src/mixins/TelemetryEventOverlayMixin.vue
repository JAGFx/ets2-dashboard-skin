<script>

import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters({
      eventProcessing: 'event/eventProcessing',
      eventName: 'event/eventName',
      eventRawData: 'event/eventRawData',
    })
  }
};
</script>
