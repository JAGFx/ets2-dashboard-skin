import { PreferenceEntryCategories } from '@core/configuration/preference-entry/preference-entry.type';

export type PreferenceEntryFilters = {
  search: string;
  categories: PreferenceEntryCategories[];
};

export type PreferenceEntryFilterEdit = {
  search?: string;
  category?: PreferenceEntryCategories;
};
