import { useUserPreference } from '@/jagfx/user-preference/hook/useUserPreference';

const { load } = useUserPreference();
export const loadUserPreferences = () => {
  load();
};
