import {
  existingConfiguration,
  existingConfigurationId
} from '@/jagfx/core/configuration/preference-entry/finder.mock';
import { PreferenceEntry } from '@/jagfx/core/configuration/preference-entry/PreferenceEntry';
import {
  convertJsonObjectToPreferenceEntry,
  findPreferenceEntryById
} from '@/jagfx/core/configuration/preference-entry/finder';

jest.mock(
  '@/jagfx/core/configuration/preference-entry/list.json',
  () => existingConfiguration,
  { virtual: true }
);

describe('Preference entries finder', () => {
  it('An existing preference entry must return data successfully', () => {
    const configuration = findPreferenceEntryById(existingConfigurationId);

    expect(configuration).toMatchObject(existingConfiguration.at(0));
  });

  it('An unknown preference entry must thrown an exception', () => {
    const unknownPreferenceEntryId = 'an_unknown_preference_entry_id';
    expect(() =>
      findPreferenceEntryById(unknownPreferenceEntryId)
    ).toThrowError(
      `Unable to find ${unknownPreferenceEntryId} on preference entries list`
    );
  });

  it('An object typed of PreferenceEntry must be returned by the converter successfully', () => {
    const anonymousObject = existingConfiguration.at(0);
    const convertedObject = convertJsonObjectToPreferenceEntry(anonymousObject);

    expect(convertedObject instanceof PreferenceEntry).toBeTruthy();
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
