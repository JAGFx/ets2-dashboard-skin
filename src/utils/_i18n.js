/**
 * @author:	Emmanuel SMITH <hey@emmanuel-smith.me>
 * project:	ets2-dashboard-skin
 * file: 	_i18n.js
 * Date: 	15/09/2021
 * Time: 	21:52
 */
import store from '@/store';
import fr_fr from '@/translations/fr-FR.yaml';
import cn_cn from '@/translations/cn-CN.yaml';
import ru_ru from '@/translations/ru-RU.yaml';

const availableLocale = ['fr-FR', 'en-EN', 'cn-CN', 'ru-RU'];

const fallbackLocale = 'en-EN';

const changeLocale = (locale) => {
  if (availableLocale.indexOf(locale) === -1)
    throw new Error(`Unsupported locale: ${locale}`);

  store.commit('i18n/setLocale', locale);
};

const currentLocaleTranslations = () => {
  const currentLocaleName = store.getters['i18n/locale'];

  switch (currentLocaleName) {
    case 'fr-FR':
      return fr_fr;
    case 'cn-CN':
      return cn_cn;
    case 'ru-RU':
      return ru_ru;
    default:
      return {};
  }
};

const translate = (target) => {
  if (!(target in currentLocaleTranslations())) return target;

  return currentLocaleTranslations()[target];
};

export { fallbackLocale, translate, currentLocaleTranslations, changeLocale };
