import { computed, reactive } from 'vue';

import { preferenceEntryMatchWithFilter } from '@/jagfx/core/configuration/preference-entry/preference-entry.util.js';

const state = reactive({
  search: ''
});

const getters = {
  search: computed({
    get() {
      return state.search;
    },
    set(search) {
      state.search = search;
    }
  }),
  isMatchWithFilter: (preferenceEntry) =>
    preferenceEntryMatchWithFilter(preferenceEntry, {
      label: state.search
    })
};

const actions = {};

export const usePreferencesEntry = () => ({
  ...getters,
  ...actions
});
