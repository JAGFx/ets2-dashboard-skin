import { computed, reactive } from 'vue';

import { preferenceEntryMatchWithFilter } from '@/jagfx/core/configuration/preference-entry/filter';
import { PreferenceEntry } from '@/jagfx/core/configuration/preference-entry/preference-entry.type';

type PreferencesEntryState = {
  search: string;
};

const state: PreferencesEntryState = reactive({
  search: ''
});

const getters = {
  search: computed<string>({
    get() {
      return state.search;
    },
    set(search: string) {
      state.search = search;
    }
  }),
  isMatchWithFilter: (preferenceEntry: PreferenceEntry) =>
    preferenceEntryMatchWithFilter(preferenceEntry, {
      label: state.search
    })
};

// const actions = {};

export const usePreferencesEntry = () => ({
  ...getters
  // ...actions
});
