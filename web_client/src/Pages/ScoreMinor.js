// ScoreMinor.js
import React from 'react';
import Score from './Score';
import '../i18n';
import { useTranslation } from 'react-i18next';

const ScoreMinor = () => {
  const { t } = useTranslation();
  return (
    <Score
      difficulty={0}
      title={t('beginner_leaderboard')}
      quizType={t('beginner_quiz')}
    />
  );
};

export default ScoreMinor;

