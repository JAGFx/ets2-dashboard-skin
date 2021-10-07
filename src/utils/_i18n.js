/**
 * @author:	Emmanuel SMITH <hey@emmanuel-smith.me>
 * project:	ets2-dashboard-skin
 * file: 	_i18n.js
 * Date: 	15/09/2021
 * Time: 	21:52
 */
import store from '@/store';
import fr_fr     from '@/translations/fr-FR.yaml';

const locales = {
	EN_EN: 'en-EN',
	FR_FR: 'fr-FR',
}

const availableLocale = [
	locales.FR_FR,
	locales.EN_EN,
];

const fallbackLocale = locales.EN_EN;

const changeLocale = locale => {
	if( availableLocale.indexOf( locale ) === -1 )
		throw new Error(`Unsupported locale: ${locale}`)
	
	store.commit( 'i18n/setLocale', locale )
}

const currentLocaleTranslations = () => {
	const currentLocaleName = store.getters['i18n/locale'];
	
	switch ( currentLocaleName ) {
		case locales.FR_FR:return fr_fr;
		default: return {}
	}
};

const translate = target => {
	if ( !(target in currentLocaleTranslations()) )
		return target;
	
	return currentLocaleTranslations()[ target ];
};

export {
	fallbackLocale,
	locales,
	availableLocale,
	translate,
	currentLocaleTranslations,
	changeLocale
};