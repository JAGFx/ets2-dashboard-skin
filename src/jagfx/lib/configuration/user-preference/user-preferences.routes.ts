import { Method, Path } from '../../application/route.type';

const prefix = '/user-preferences';

export const userPreferencesRoutes: { [key: string]: Path } = {
  list: {
    method: Method.GET,
    path: prefix
  },
  access: {
    method: Method.GET,
    path: prefix + '/:userPreferenceId(^[a-z]+[a-z_]+[a-z]$)'
  },
  update: {
    method: Method.PATCH,
    path: prefix
  }
};
