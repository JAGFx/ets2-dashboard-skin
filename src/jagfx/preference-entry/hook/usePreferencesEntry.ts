import {
  PreferenceEntry,
  PreferenceEntryCollection,
  PreferenceEntryFilterEdit,
  PreferenceEntryFilters,
  PreferenceEntryId,
  findPreferenceEntryById
} from 'ets2-dashboard-skin-lib';
import preferenceEntriesList from 'ets2-dashboard-skin-lib/src/configuration/preference-entry/list.json';
import { computed, inject, provide, reactive, readonly } from 'vue';

import { preferenceEntryMatchWithFilter } from '@/jagfx/shared/filter';
import { useTranslator } from '@/jagfx/ui/translator/hook/useTranslator';

const PROVIDE_PREFERENCE_ENTRY = 'provider-preference-entry-id';

const state = reactive<PreferenceEntryFilters>({
  search: '',
  categories: [],
  preferences: PreferenceEntryCollection
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
  load: (): Promise<void> => {
    return new Promise<void>((resolve) => {
      state.preferences = PreferenceEntryCollection.fromArray(
        preferenceEntriesList
      );

      resolve();
    });
  },
  initProvider: (preferenceEntryId: PreferenceEntryId): PreferenceEntry => {
    const preferenceEntry: PreferenceEntry = findPreferenceEntryById(
      preferenceEntryId,
      state.preferences
    );

    // TODO: Maybe find a better way
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
