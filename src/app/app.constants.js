import packageJson from "../../package.json";

export const version = packageJson.version;
export const isOnDevEnvironment = import.meta.env.MODE.startsWith('dev');
export const useFakeData = import.meta.env.VUE_APP_USE_FAKE_DATA === 'true';
