import packageJson from '../../../../package.json';

type ApplicationState = {
  version: string;
  isOnDevEnvironment: boolean;
  useFakeData: boolean;
};
const getters: ApplicationState = {
  version: packageJson.version,
  isOnDevEnvironment: import.meta.env.MODE.startsWith('dev'),
  useFakeData: import.meta.env.VITE_USE_FAKE_DATA === 'true'
};
export const useApplicationState = () => ({ ...getters });
