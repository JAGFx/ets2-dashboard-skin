/**
 * @author:	Emmanuel SMITH <hey@emmanuel-smith.me>
 * project:	ets2-dashboard-skin
 * file: 	_i18n.js
 * Date: 	15/09/2021
 * Time: 	21:52
 */
import fr_fr from '@/domain/translator/translations/fr-FR.yaml';
import cn_cn from '@/domain/translator/translations/cn-CN.yaml';
import ru_ru from '@/domain/translator/translations/ru-RU.yaml';
import pt_pt from '@/domain/translator/translations/pt-PT.yaml';

export const translations = {
  'fr-FR': fr_fr,
  'cn-CN': cn_cn,
  'ru-RU': ru_ru,
  'pt-PT': pt_pt
};

export const getTranslationToGivenLocale = (locale) => {
  if (
    typeof locale !== 'string' ||
    Object.keys(translations).indexOf(locale) === -1
  )
    return {};

  return translations[locale];
};

export const translate = (target, locale) => {
  if (!(target in getTranslationToGivenLocale(locale))) return target;

  return getTranslationToGivenLocale(locale)[target];
};
