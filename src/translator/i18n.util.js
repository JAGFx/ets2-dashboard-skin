/**
 * @author:	Emmanuel SMITH <hey@emmanuel-smith.me>
 * project:	ets2-dashboard-skin
 * file: 	_i18n.js
 * Date: 	15/09/2021
 * Time: 	21:52
 */
import fr_fr from '@/translator/translations/fr-FR.yaml';
import cn_cn from '@/translator/translations/cn-CN.yaml';
import ru_ru from '@/translator/translations/ru-RU.yaml';
import pt_pt from '@/translator/translations/pt-PT.yaml';
import { useTranslator } from '@/translator/useTranslator';

export const availableLocale = ['fr-FR', 'en-EN', 'cn-CN', 'ru-RU', 'pt-PT'];

export const fallbackLocale = 'en-EN';

export const changeLocale = (locale) => {
  if (availableLocale.indexOf(locale) === -1)
    throw new Error(`Unsupported locale: ${locale}`);
};

export const currentLocaleTranslations = () => {
  const { currentLocale } = useTranslator();

  switch (currentLocale.value) {
    case 'fr-FR':
      return fr_fr;
    case 'cn-CN':
      return cn_cn;
    case 'ru-RU':
      return ru_ru;
    case 'pt-PT':
      return pt_pt;
    default:
      return {};
  }
};

export const translate = (target) => {
  if (!(target in currentLocaleTranslations())) return target;

  return currentLocaleTranslations()[target];
};
