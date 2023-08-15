import { buildUrl } from '@/jagfx/shared/fetch';
import { ParametersCollection } from '@/jagfx/shared/fetch.type';

describe('Fetch test', () => {
  it.each([
    {
      givenPath: '/user',
      givenParameters: null,
      expectedUrl: '/user'
    },
    {
      givenPath: '/user/toto',
      givenParameters: null,
      expectedUrl: '/user/toto'
    },
    {
      givenPath: '/',
      givenParameters: null,
      expectedUrl: '/'
    },
    {
      givenPath: '/user/:id(\\d+)',
      givenParameters: [
        {
          key: ':id',
          value: 4
        }
      ],
      expectedUrl: '/user/4'
    },
    {
      givenPath: '/user/:id(\\d+)/toto',
      givenParameters: [
        {
          key: ':id',
          value: 4
        }
      ],
      expectedUrl: '/user/4/toto'
    },
    {
      givenPath: '/user/:id(\\d+)/toto/:oth(\\w+)',
      givenParameters: [
        {
          key: ':id',
          value: 4
        },
        {
          key: ':oth',
          value: 'plop'
        }
      ],
      expectedUrl: '/user/4/toto/plop'
    },
    {
      givenPath: '/user/:id(\\d+)/toto/:oth(\\w+)/yellow',
      givenParameters: [
        {
          key: ':id',
          value: 4
        },
        {
          key: ':oth',
          value: 'plop'
        }
      ],
      expectedUrl: '/user/4/toto/plop/yellow'
    }
  ])('Should give a correct path', (dataset) => {
    const givenParameters =
      dataset.givenParameters !== null
        ? new ParametersCollection(
            dataset.givenParameters.map((parameter) => [
              parameter.key,
              parameter.value
            ])
          )
        : undefined;

    expect(buildUrl(dataset.givenPath, givenParameters)).toStrictEqual(
      dataset.expectedUrl
    );
  });
});
