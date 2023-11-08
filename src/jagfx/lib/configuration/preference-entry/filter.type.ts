import {
  PreferenceEntryCategories,
  PreferenceEntryCollection
} from './preference-entry.type';

export type PreferenceEntryFilters = {
  search: string;
  categories: PreferenceEntryCategories[];
  preferences: PreferenceEntryCollection;
};

export type PreferenceEntryFilterEdit = {
  search?: string;
  category?: PreferenceEntryCategories;
  preferences: PreferenceEntryCollection;
};
