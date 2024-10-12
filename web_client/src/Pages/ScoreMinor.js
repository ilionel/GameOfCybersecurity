import React from 'react';
import Score from './Score';
import '../i18n';
import { useTranslation } from 'react-i18next';

const ScoreMinor = () => {
  const { t } = useTranslation();

  // Set the difficulty level for the beginner quiz
  const difficulty = 0;

  // Set the title and quiz type for the beginner leaderboard
  const title = t('beginner_leaderboard');
  const quizType = t('beginner_quiz');

  return (
    <Score
      difficulty={difficulty}
      title={title}
      quizType={quizType}
    />
  );
};

export default ScoreMinor;
