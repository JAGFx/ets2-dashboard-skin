import { usePreferencesEntry } from '@/jagfx/preference-entry/hook/usePreferencesEntry';
import { useUserPreference } from '@/jagfx/user-preference/hook/useUserPreference';

const { load: loadPreferenceEntries } = usePreferencesEntry();
const { load: loadUserPreferences } = useUserPreference();

export const initSplashScreen = () => {
  loadPreferenceEntries().then(loadUserPreferences);
};
