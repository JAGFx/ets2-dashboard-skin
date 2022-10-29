import { TranslationLocale } from 'ets2-dashboard-lib/jagfx/application/translator/translate.type';
import { preferenceEntryMatchWithFilter } from 'ets2-dashboard-lib/jagfx/configuration/preference-entry/filter';
import {
  PreferenceEntryFilterEdit,
  PreferenceEntryFilters
} from 'ets2-dashboard-lib/jagfx/configuration/preference-entry/filter.type';
import { findPreferenceEntryById } from 'ets2-dashboard-lib/jagfx/configuration/preference-entry/finder';
import { PreferenceEntry } from 'ets2-dashboard-lib/jagfx/configuration/preference-entry/preference-entry.type';
import { computed, inject, provide, reactive, readonly } from 'vue';

const PROVIDE_PREFERENCE_ENTRY = 'provider-preference-entry-id';

const state = reactive<PreferenceEntryFilters>({
  search: '',
  categories: []
});

const getters = {
  current: computed<PreferenceEntryFilters>(() => state),
  isMatchWithFilter: (preferenceEntry: PreferenceEntry): boolean =>
    preferenceEntryMatchWithFilter(
      preferenceEntry,
      {
        search: state.search,
        categories: state.categories
      },
      TranslationLocale.FR_FR
    )
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
