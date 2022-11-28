import { UserPreferenceCollection } from 'ets2-dashboard-core/src/configuration/user-preference/user-preference.type.js';

import { ConfigFileEntries } from '@server/config/config.type';

export const toUserPreferencesCollection = (
  configFileEntries: ConfigFileEntries
) => {
  const collection = new UserPreferenceCollection();
  Object.entries(configFileEntries).map(
    ([userPreferenceId, userPreferenceValue]) => {
      collection.set(userPreferenceId, {
        id: userPreferenceId,
        value: userPreferenceValue
      });
    }
  );

  return collection;
};
