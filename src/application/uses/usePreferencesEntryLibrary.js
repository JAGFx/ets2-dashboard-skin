import {
  applyFiltersToPreferenceEntriesList,
  convertJsonObjectToPreferenceEntry
} from '@/domain/user-preferences/preference-entry.util.js';
import { computed, reactive, readonly } from 'vue';
import map from '@/domain/user-preferences/map.json';

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

export const usePreferencesEntryLibrary = () => ({
  state: readonly(state),
  ...getters,
  ...actions
});
