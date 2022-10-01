export enum TranslationLocale {
  FR_FR = 'fr-FR',
  CN_CN = 'cn-CN',
  RU_RU = 'ru-RU',
  PT_PT = 'pt-PT'
}

export type Translation = {
  [key: string]: string;
};

export type Translations = {
  [key in TranslationLocale]: Record<string, string>;
};
