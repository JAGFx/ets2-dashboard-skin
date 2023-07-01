import { translations } from '@/jagfx/components/shared/translator/useTranslator';

import {
  TranslationLocale,
  translate
} from '../../../../../ets2-dashboard-skin-lib';
import {
  PreferenceEntry,
  PreferenceEntryCategories,
  PreferenceEntryFilters
} from '../../../../../ets2-dashboard-skin-lib';

export const preferenceEntryMatchWithFilter = (
  preferenceEntry: PreferenceEntry,
  filters: PreferenceEntryFilters,
  locale: TranslationLocale
): boolean => {
  const filterMatches: boolean[] = [true];

  if (filters.search.length !== 0) {
    filterMatches.push(
      translatedValueMatch(preferenceEntry.label, filters.search, locale) ||
        translatedValueMatch(
          preferenceEntry.description,
          filters.search,
          locale
        ) ||
        preferenceEntry.categories.some((category) =>
          translatedValueMatch(category, filters.search, locale)
        ) ||
        preferenceEntry.id.toLowerCase().includes(filters.search.toLowerCase())
    );
  }

  if (filters.categories.length > 0) {
    filterMatches.push(
      filters.categories.every((category: PreferenceEntryCategories) =>
        preferenceEntry.categories.includes(category)
      )
    );
  }

  return filterMatches.every((match: boolean) => match);
};

const translatedValueMatch = (
  a: string,
  b: string,
  locale: TranslationLocale
): boolean => {
  const translatedA = translate(a, locale, translations);
  const translatedB = translate(b, locale, translations);

  return translatedA.toLowerCase().includes(translatedB.toLowerCase());
};
