import {
  applyFiltersToConfigurationsSettingsList,
  convertJsonObjectToConfigurationItem
} from '@/domain/configuration/configurationLibrary.util.js';
import { computed, reactive, readonly } from 'vue';
import configurationMap from '@/domain/configuration/configuration.library.json';

const state = reactive({
  search: ''
});

const getters = {
  search: computed(() => state.search),
  configurationMatchWithSearch: computed(() =>
    applyFiltersToConfigurationsSettingsList(
      {
        label: state.search
      },
      configurationMap.map((configurationItem) =>
        convertJsonObjectToConfigurationItem(configurationItem)
      )
    )
  )
};

const actions = {};

export const useConfigurationLibrary = () => ({
  state: readonly(state),
  ...getters,
  ...actions
});
