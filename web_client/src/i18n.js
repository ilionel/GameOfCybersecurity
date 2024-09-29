import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const language = navigator.language.split('-')[0]; // get the language code (e.g. "en" or "fr")

i18n
  .use(initReactI18next) // <--- Add this line
  .init({
    resources: {
      en: {
        translation: require('./translations.json').en,
        questions: require('./questions/questions-en.json'),
      },
      fr: {
        translation: require('./translations.json').fr,
        questions: require('./questions/questions-fr.json'),
      },
    },
    lng: language, // set the initial language based on the browser's language
    fallbackLng: 'en', // Fallback language
    interpolation: {
      escapeValue: false,
    },
    ns: ['translation'],
    defaultNS: 'translation',
  });

