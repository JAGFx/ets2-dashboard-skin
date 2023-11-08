/**
 * @author:	Emmanuel SMITH <hey@emmanuel-smith.me>
 * project:	ets2-dashboard-skin
 * file: 	_i18n.js
 * Date: 	15/09/2021
 * Time: 	21:52
 */
import { TranslationLocale, Translations } from './translate.type';

export const translate = (
  target: string,
  locale: TranslationLocale,
  translations: Translations
): string => {
  const translationLocale = translations[locale];

  if (!(target in translationLocale)) return target;

  return translationLocale[target] as string;
};
