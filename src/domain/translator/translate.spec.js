//import {
//  getTranslationToGivenLocale,
//  translations
//} from '@/domain/translator/translate.js';
//import { jest } from '@jest/globals';
//
//const mockedFrTranslations = {
//  'English target': 'Cible français'
//};
//
//jest.mock('@/domain/translator/translate.js', () => ({
//  translations: () => jest.fn(() => mockedFrTranslations)
//}));
//
//describe('Translator translate', () => {
//  it('Translation must be return to a supported locale successfully', () => {
//    expect(getTranslationToGivenLocale('fr-FR')).toBe(mockedFrTranslations);
//  });
//});
