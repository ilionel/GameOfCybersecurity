import React from 'react';
import Quiz from './Quiz';
import '../i18n';
import { useTranslation } from 'react-i18next';

const QuizMinor = () => {
  const { t } = useTranslation();
  const questions = t('questions:Questions_Child', { returnObjects: true });
  const difficulty = 0;

  return <Quiz questions={questions} difficulty={difficulty} />;
};

export default QuizMinor;

