import React from 'react';
import Stats from './Stats';
import '../i18n';
import { useTranslation } from 'react-i18next';

const StatsMinor = () => {
  const { t } = useTranslation();

  // Fetch the questions for the child quiz from the translation file
  const questions = t('questions:Questions_Child', { returnObjects: true });

  // Set the difficulty level for the child quiz
  const difficulty = 0;

  return (
    <Stats questions={questions} difficulty={difficulty} />
  );
};

export default StatsMinor;
