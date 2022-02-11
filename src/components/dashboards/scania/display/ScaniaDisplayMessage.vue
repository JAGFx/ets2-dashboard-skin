<template>
  <div
    class="display-message d-flex justify-content-start align-items-start flex-column p-3"
    :class="scaniaMessage.type"
  >
    {{ scaniaMessage.message }}
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'ScaniaDisplayMessage',
  computed: {
    ...mapGetters({
      scaniaMessage: 'dashboard/getLatestScaniaMessage'
    })
  }
};
</script>
