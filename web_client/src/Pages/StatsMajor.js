import React from 'react';
import Stats from './Stats';
import '../i18n';
import { useTranslation } from 'react-i18next';

const StatsMajor = () => {
  const { t } = useTranslation();

  // Fetch the questions for the adult quiz from the translation file
  const questions = t('questions:Questions_Adult', { returnObjects: true });

  // Set the difficulty level for the adult quiz
  const difficulty = 1;

  return (
    <Stats questions={questions} difficulty={difficulty} />
  );
};

export default StatsMajor;
