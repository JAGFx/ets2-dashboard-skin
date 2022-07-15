export const availableLocale = ['fr-FR', 'en-EN', 'cn-CN', 'ru-RU', 'pt-PT'];

export const fallbackLocale = 'en-EN';

export const changeLocale = (locale) => {
  if (availableLocale.indexOf(locale) === -1)
    throw new Error(`Unsupported locale: ${locale}`);

  return locale;
};
