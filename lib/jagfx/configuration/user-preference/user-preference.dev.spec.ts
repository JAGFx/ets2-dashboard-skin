import { matchersWithOptions } from 'jest-json-schema';

import userPreferenceDev from './user-preference.dev.json';
import userPreferenceDevSchema from './user-preference.dev.schema.json';

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
