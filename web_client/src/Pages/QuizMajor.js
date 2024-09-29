import React from 'react';
import Quiz from './Quiz';
import '../i18n';
import { useTranslation } from 'react-i18next';

const QuizMajor = () => {
  const { t } = useTranslation();
  const questions = t('questions:Questions_Adult', { returnObjects: true });
  const difficulty = 1;

  return (
    <Quiz questions={questions} difficulty={difficulty} />
  );
};

export default QuizMajor;
