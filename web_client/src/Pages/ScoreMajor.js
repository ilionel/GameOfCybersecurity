import React from 'react';
import Score from './Score';
import '../i18n';
import { useTranslation } from 'react-i18next';

const ScoreMajor = () => {
  const { t } = useTranslation();

  // Set the difficulty level for the advanced quiz
  const difficulty = 1;

  // Set the title and quiz type for the advanced leaderboard
  const title = t('advanced_leaderboard');
  const quizType = t('advanced_quiz');

  return (
    <Score
      difficulty={difficulty}
      title={title}
      quizType={quizType}
    />
  );
};

export default ScoreMajor;
