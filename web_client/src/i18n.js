import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import translation files statically
import translations from './translations.json';
import questionsEn from './questions/questions-en.json';
import questionsFr from './questions/questions-fr.json';

// Function to load translation files
const loadTranslations = (language) => {
  const translationsData = translations[language];
  const questions = language === 'en' ? questionsEn : questionsFr;
  return { translation: translationsData, questions: questions };
};

// Get the language code (e.g. "en" or "fr")
const language = navigator.language.split('-')[0];

// i18next configuration options
const i18nOptions = {
  resources: {
    en: loadTranslations('en'),
    fr: loadTranslations('fr'),
  },
  lng: language, // set the initial language based on the browser's language
  fallbackLng: 'en', // Fallback language
  interpolation: {
    escapeValue: false,
  },
  ns: ['translation'],
  defaultNS: 'translation',
};

// Initialize i18next
i18n
  .use(initReactI18next)
  .init(i18nOptions);

export default i18n;
