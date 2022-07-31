import {
  applyFiltersToPreferenceEntriesList,
  convertJsonObjectToPreferenceEntry
} from '@/jagfx/user-preferences/core/preference-entry.util.js';
import { computed, reactive, readonly } from 'vue';
import map from '@/jagfx/user-preferences/core/map.json';

const state = reactive({
  search: ''
});

const getters = {
  search: computed(() => state.search),
  configurationMatchWithSearch: computed(() =>
    applyFiltersToPreferenceEntriesList(
      {
        label: state.search
      },
      map.map((configurationItem) =>
        convertJsonObjectToPreferenceEntry(configurationItem)
      )
    )
  )
};

const actions = {};

export const usePreferencesEntry = () => ({
  state: readonly(state),
  ...getters,
  ...actions
});
