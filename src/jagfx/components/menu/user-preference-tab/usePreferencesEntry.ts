import { computed, inject, provide, reactive, readonly } from 'vue';

import { preferenceEntryMatchWithFilter } from 'ets2-dashboard-core/src/configuration/preference-entry/filter';
import {
  PreferenceEntryFilterEdit,
  PreferenceEntryFilters
} from 'ets2-dashboard-core/src/configuration/preference-entry/filter.type';
import { findPreferenceEntryById } from 'ets2-dashboard-core/src/configuration/preference-entry/finder';
import {
  PreferenceEntry,
  PreferenceEntryId
} from 'ets2-dashboard-core/src/configuration/preference-entry/preference-entry.type';

import { useTranslator } from '@/jagfx/components/shared/translator/useTranslator';

const PROVIDE_PREFERENCE_ENTRY = 'provider-preference-entry-id';

const state = reactive<PreferenceEntryFilters>({
  search: '',
  categories: []
});

const { currentLocale } = useTranslator();

const getters = {
  current: computed<PreferenceEntryFilters>(() => state),
  isMatchWithFilter: (preferenceEntry: PreferenceEntry): boolean =>
    preferenceEntryMatchWithFilter(
      preferenceEntry,
      {
        search: state.search,
        categories: state.categories
      },
      currentLocale.value
    )
};

const actions = {
  initProvider: (preferenceEntryId: PreferenceEntryId): PreferenceEntry => {
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
  },
  update: (value: PreferenceEntryFilterEdit) => {
    if (value.search !== undefined) {
      state.search = value.search;
    }

    if (value.category !== undefined) {
      state.categories.push(value.category);
    }
  },
  reset: () => {
    state.search = '';
    state.categories = [];
  }
};

export const usePreferencesEntry = () => ({
  ...getters,
  ...actions
});
