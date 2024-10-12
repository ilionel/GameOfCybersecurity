import React from 'react';
import Quiz from './Quiz';
import '../i18n';
import { useTranslation } from 'react-i18next';

const QuizMajor = () => {
  const { t } = useTranslation();

  // Fetch the questions for the adult quiz from the translation file
  const questions = t('questions:Questions_Adult', { returnObjects: true });

  // Set the difficulty level for the adult quiz
  const difficulty = 1;

  return (
    <Quiz questions={questions} difficulty={difficulty} />
  );
};

export default QuizMajor;
