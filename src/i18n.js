import i18n from 'i18next';
import XHR from 'i18next-xhr-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import resBundle from 'i18next-resource-store-loader!./locales/index.js';

const languageDetectorOptions = {
  // order and from where user language should be detected
  order: ['querystring', 'cookie', 'localStorage'],

  // keys or params to lookup language from
  lookupQuerystring: 'lang',
  lookupCookie: 'lang',
  lookupLocalStorage: 'lang',

  // cache user language on
  caches: ['localStorage', 'cookie']
};

i18n
  .use(LanguageDetector)
  .init({
    fallbackLng: 'en',

    // have a common namespace used around the full app
    ns: ['common'],
    defaultNS: 'common',

    debug: false,

    interpolation: {
      escapeValue: false // not needed for react!!
    },
    resources: resBundle,

    detection: languageDetectorOptions
  });

export default i18n;
