import {
  existingConfiguration,
  existingConfigurationId,
  expectedPreferenceEntry,
  unknownPreferenceEntryId
} from './finder.mock';

// import { findPreferenceEntryById } from '../finder';

jest.mock('./list.json', () => existingConfiguration.entries(), {
  virtual: true
});

const finder = await import('../finder');

// Fixme Correct auto reorder. Jest mock must be before this import

beforeEach(() => {
  jest.resetModules();
});

describe('Preference entries finder', () => {
  it('An existing preference entry must return data successfully', () => {
    expect(
      finder.findPreferenceEntryById(existingConfigurationId)
    ).toMatchObject(expectedPreferenceEntry);
  });

  it('An unknown preference entry must thrown an exception', () => {
    expect(() =>
      finder.findPreferenceEntryById(unknownPreferenceEntryId)
    ).toThrowError(
      `Unable to find ${unknownPreferenceEntryId} on preference entries list`
    );
  });
});
