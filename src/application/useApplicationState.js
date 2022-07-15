import { reactive } from 'vue';

import packageJson from '../../package.json';

export const version = packageJson.version;
export const isOnDevEnvironment = import.meta.env.MODE.startsWith('dev');
export const useFakeData = import.meta.env.VITE_USE_FAKE_DATA === 'true';

export const useApplicationState = () =>
  reactive({
    version,
    isOnDevEnvironment,
    useFakeData
  });
