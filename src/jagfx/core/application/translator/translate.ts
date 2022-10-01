/**
 * @author:	Emmanuel SMITH <hey@emmanuel-smith.me>
 * project:	ets2-dashboard-skin
 * file: 	_i18n.js
 * Date: 	15/09/2021
 * Time: 	21:52
 */
import {
  TranslationLocale,
  Translations
} from '@/jagfx/core/application/translator/translate.type';
import cn_cn from '@/jagfx/core/application/translator/translations/cn-CN.yaml';
import fr_fr from '@/jagfx/core/application/translator/translations/fr-FR.yaml';
import pt_pt from '@/jagfx/core/application/translator/translations/pt-PT.yaml';
import ru_ru from '@/jagfx/core/application/translator/translations/ru-RU.yaml';

export const translations: Translations = {
  'fr-FR': fr_fr,
  'cn-CN': cn_cn,
  'ru-RU': ru_ru,
  'pt-PT': pt_pt
};

export const getTranslationToGivenLocale = (
  locale: TranslationLocale
): Record<string, string> => {
  return translations[locale];
};

export const translate = (
  target: string,
  locale: TranslationLocale
): string => {
  const translationLocale = getTranslationToGivenLocale(locale);

  if (!(target in translationLocale)) return target;

  return translationLocale[target] as string;
};
