<script>
import ConfigFieldChoice from '@/components/menu/config-fields/ConfigFieldChoice';
import ConfigFieldInput from '@/components/menu/config-fields/ConfigFieldInput';
import { config } from '@/utils/utils';

export default {
  name: 'ConfigCategoryMixin',
  components: { ConfigFieldInput, ConfigFieldChoice },
  methods: {
    fieldValues: (fieldId) => config.getFieldValues(fieldId),
    configValue(name) {
      return this.$store.getters['config/get'](name);
    },
    configEnabled(name) {
      return this.$store.getters['config/enabled'](name);
    }
  }
};
</script>
