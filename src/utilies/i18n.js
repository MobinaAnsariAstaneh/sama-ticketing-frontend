import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const EnJSON = require('./locales/en.json');
const FAJSON = require('./locales/fa.json');

let fallback = null;

const languageDetector = {
  type: 'languageDetector',
  async: true,
  detect: (cb) => {
    cb(fallback || 'en');
  },
  init: () => {},
  cacheUserLanguage: () => {},
};

i18n
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    initImmediate: false,
    fallbackLng: 'en',
    debug: true,
    resources: {
      en: {
        translation: EnJSON,
      },
      fa: {
        translation: FAJSON,
      },
    },
  });
  


export default i18n;
