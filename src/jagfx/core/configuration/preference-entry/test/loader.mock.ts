import {
  PreferenceEntry,
  PreferenceEntryInterface,
  PreferenceEntryValue
} from '@/jagfx/core/configuration/preference-entry/preference-entry.type';

export const mockPreferenceEntry = (
  values: PreferenceEntryValue[] | null
): PreferenceEntry => ({
  id: 'plop',
  target: 'target',
  label: 'label',
  description: 'description',
  values
});
export const preferenceEntry: PreferenceEntryInterface = mockPreferenceEntry([
  { label: 'some', value: 'some' },
  { label: 'stuff', value: 'stuff' }
]);
