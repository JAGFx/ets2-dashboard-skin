import { jest } from '@jest/globals';

const existingConfigurationId = 'an_existing_configuration_id';
const existingConfiguration = {
  id: existingConfigurationId,
  target: 'application',
  label: 'Configuration 1',
  description: 'Description 1',
  values: [
    {
      label: 'Value 1',
      value: 'value1'
    }
  ]
};
jest.mock('@/domain/configuration/configuration.library.json', () => [
  existingConfiguration
]);

import { retrieveConfigurationSettings } from '@/domain/user-preferences/configurationLibrary.util.js';

beforeEach(() => {
  jest.resetModules();
});

describe('Configuration', () => {
  it('An existing configuration ID must return the configuration data successfully', () => {
    const configuration = retrieveConfigurationSettings(
      existingConfigurationId
    );

    expect(configuration).toMatchObject(existingConfiguration);
  });
});
