<script>
import ConfigFieldChoice from '@/components/menu/config-fields/ConfigFieldChoice';
import ConfigFieldInput from '@/components/menu/config-fields/ConfigFieldInput';
import { getFieldValues } from '@/utils/_config';

export default {
  name: 'ConfigCategoryMixin',
  components: { ConfigFieldInput, ConfigFieldChoice },
  methods: {
    fieldValues: (fieldId) => getFieldValues(fieldId),
    configValue(name) {
      return this.$store.getters['config/get'](name);
    },
    configEnabled(name) {
      return this.$store.getters['config/enabled'](name);
    }
  }
};
</script>
