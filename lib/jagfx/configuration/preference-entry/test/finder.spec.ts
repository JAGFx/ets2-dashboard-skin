import {
  anonymousObject,
  convertedObject,
  existingConfiguration,
  expectedPreferenceEntry,
  preferenceEntry,
  unknownPreferenceEntryId
} from './finder.mock';

import { findPreferenceEntryById } from '../finder';
import { PreferenceEntry } from '../preference-entry.type';

jest.mock(
  '@/jagfx/core/configuration/preference-entry/list.json',
  () => existingConfiguration,
  { virtual: true }
);

// FinderMock();

// Fixme Correct auto reorder. Jest mock must be before this import

describe('Preference entries finder', () => {
  it('An existing preference entry must return data successfully', () => {
    expect(preferenceEntry).toMatchObject(expectedPreferenceEntry);
  });

  it('An unknown preference entry must thrown an exception', () => {
    expect(() =>
      findPreferenceEntryById(unknownPreferenceEntryId)
    ).toThrowError(
      `Unable to find ${unknownPreferenceEntryId} on preference entries list`
    );
  });

  it('An object typed of PreferenceEntry must be returned by the converter successfully', () => {
    expect(convertedObject).toMatchObject(
      new PreferenceEntry(
        anonymousObject.id,
        anonymousObject.target,
        anonymousObject.label,
        anonymousObject.description,
        anonymousObject.values
      )
    );
  });
});
