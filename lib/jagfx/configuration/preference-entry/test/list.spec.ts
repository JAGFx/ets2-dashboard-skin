import { matchersWithOptions } from 'jest-json-schema';

import list from '../list.json';
import listSchema from './list.schema.json';

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
