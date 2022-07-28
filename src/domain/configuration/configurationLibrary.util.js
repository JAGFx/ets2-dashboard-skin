import configurationMap from '@/domain/configuration/configuration.library.json';
import { ConfigurationLibrary } from '@/domain/configuration/configurationLibrary.model.js';

export const retrieveConfigurationSettings = (configurationId) => {
  const matches = configurationMap.filter(
    (configuration) => configuration.id === configurationId
  );

  if (matches.length !== 1)
    throw new Error(`Unable to find ${configurationId} on configuration map`);

  return matches.at(0);
};

export const applyFiltersToConfigurationsSettingsList = (filters, list) => {
  return list.filter((configurationSetting) => {
    const filterMatches = [true];

    if (Object.hasOwn(filters, 'label') && filters.label.length !== 0) {
      filterMatches.push(
        configurationSetting.label
          .toLowerCase()
          .includes(filters.label.toLowerCase())
      );
    }

    if (Object.hasOwn(filters, 'target') && filters.target.length !== 0) {
      filterMatches.push(
        configurationSetting.target.includes(filters.target.toLowerCase())
      );
    }

    return filterMatches.every((match) => match);
  });
};

export const convertJsonObjectToConfigurationItem = (json) =>
  Object.assign(new ConfigurationLibrary(), json);
