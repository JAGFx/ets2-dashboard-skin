import { UserPreference, UserPreferenceTarget } from './user-preference.type';

export const findUserPreference = (
  userPreferences: UserPreference[],
  userPreferenceId: string
): UserPreference | null => {
  const userPreference: UserPreference | undefined = userPreferences
    .filter(
      (userPreference: UserPreference) => userPreference.id === userPreferenceId
    )
    ?.at(0);

  return userPreference || null;
};

export const getTargetOfUserPreference = (
  userPreferences: UserPreference[],
  userPreferenceId: string
): UserPreferenceTarget | null => {
  const userPreference = userPreferences
    .filter(
      (userPreference: UserPreference) => userPreference.id === userPreferenceId
    )
    ?.at(0);

  return userPreference !== undefined ? userPreference.target : null;
};
