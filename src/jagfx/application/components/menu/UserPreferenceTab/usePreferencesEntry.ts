import { computed, inject, provide, reactive, readonly, ref } from 'vue';

import { preferenceEntryMatchWithFilter } from '@/jagfx/core/configuration/preference-entry/filter';
import { findPreferenceEntryById } from '@/jagfx/core/configuration/preference-entry/finder';
import { PreferenceEntry } from '@/jagfx/core/configuration/preference-entry/preference-entry.type';

type PreferencesEntryState = {
  search: string;
};

const PROVIDE_PREFERENCE_ENTRY = 'provider-preference-entry-id';

const state = reactive<PreferencesEntryState>({
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
  isMatchWithFilter: (preferenceEntry: PreferenceEntry): boolean =>
    preferenceEntryMatchWithFilter(preferenceEntry, {
      label: state.search
    })
};

const actions = {
  initProvider: (preferenceEntryId: string): PreferenceEntry => {
    const preferenceEntry: PreferenceEntry =
      findPreferenceEntryById(preferenceEntryId);
    provide(PROVIDE_PREFERENCE_ENTRY, readonly(preferenceEntry));

    return preferenceEntry;
  },
  initConsumer: (): PreferenceEntry => {
    const preferenceEntry = inject(PROVIDE_PREFERENCE_ENTRY);

    if (preferenceEntry === undefined) {
      throw new Error('Unable to inject the preference entry: Not found');
    }

    return preferenceEntry as PreferenceEntry;
  }
};

export const usePreferencesEntry = () => ({
  ...getters,
  ...actions
});
