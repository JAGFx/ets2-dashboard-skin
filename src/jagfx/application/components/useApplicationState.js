import packageJson from '../../../../package.json';

const getters = {
  version: packageJson.version,
  isOnDevEnvironment: import.meta.env.MODE.startsWith('dev'),
  useFakeData: import.meta.env.VITE_USE_FAKE_DATA === 'true'
};

export const useApplicationState = () => ({
  ...getters
});
