import { preferenceEntryMatchWithFilter } from "@/jagfx/module/user-preferences/core/preference-entry.util.js";
import { computed, reactive } from "vue";

const state = reactive({
  search: "",
});

const getters = {
  search: computed({
    get() {
      return state.search;
    },
    set(search) {
      state.search = search;
    },
  }),
  isMatchWithFilter: (preferenceEntry) =>
    preferenceEntryMatchWithFilter(preferenceEntry, {
      label: state.search,
    }),
};

const actions = {};

export const usePreferencesEntry = () => ({
  ...getters,
  ...actions,
});