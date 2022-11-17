import { matchersWithOptions } from 'jest-json-schema';

import userPreferenceDev from '@core/configuration/user-preference/user-preference.dev.json';
import userPreferenceDevSchema from '@core/configuration/user-preference/user-preference.dev.schema.json';

describe('User preference developement file validation', () => {
  expect.extend(
    matchersWithOptions({
      verbose: true
    })
  );

  it('List file must match with schema', () => {
    expect(userPreferenceDev).toMatchSchema(userPreferenceDevSchema);
  });
});
