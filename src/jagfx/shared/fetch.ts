import { createFetch } from '@vueuse/core';
import { Method, Path } from 'ets2-dashboard-skin-lib';

import { ParametersCollection } from '@/jagfx/shared/fetch.type';

const fetch = createFetch({
  baseUrl: 'http://localhost:3000',
  fetchOptions: {
    mode: 'cors'
  }
});

export const call = async (
  path: Path,
  parameters?: ParametersCollection,
  body?: object
) => {
  const url = buildUrl(path.path, parameters);

  switch (path.method) {
    case Method.GET: {
      const { data } = await fetch(url).get().json();
      return data;
    }
    case Method.PUT: {
      const { data } = await fetch(url).patch(body).json();
      return data;
    }
    default:
      throw new Error('You never be there');
  }
};

export const buildUrl = (
  path: string,
  parameters?: ParametersCollection
): string => {
  const parts = path.split(/(:[a-zA-Z]+\([\\a-zA-Z+]+\))/);
  let url = '';

  parts.map((value) => {
    const routeNameMatches = value.match(/([a-zA-Z]+)\((.*)\)/);

    if (
      parameters !== undefined &&
      routeNameMatches !== null &&
      routeNameMatches.length > 2
    ) {
      const propertyName = ':' + routeNameMatches[1];

      const propertyRegex = new RegExp(routeNameMatches[2]);

      if (!parameters.has(propertyName)) {
        throw Error(
          'The route variable was not found on property list: ' + propertyName
        );
      }

      if (!propertyRegex.test(parameters.get(propertyName) as string)) {
        throw Error(
          'The route variable do not match with expected value: ' + propertyName
        );
      }

      url += parameters.get(propertyName);
    } else {
      url += value;
    }
  });

  return url;
};
