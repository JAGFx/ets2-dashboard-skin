import { matchersWithOptions } from 'jest-json-schema';

import list from '@core/configuration/preference-entry/list.json';
import listSchema from '@core/configuration/preference-entry/test/list.schema.json';

describe('List schema validation', () => {
  expect.extend(
    matchersWithOptions({
      verbose: true
    })
  );

  it('List file must match with schema', () => {
    expect(list).toMatchSchema(listSchema);
  });
});