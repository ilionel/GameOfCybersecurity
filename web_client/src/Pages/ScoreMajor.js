// ScoreMajor.js
import React from 'react';
import Score from './Score';
import '../i18n';
import { useTranslation } from 'react-i18next';

const ScoreMajor = () => {
  const { t } = useTranslation();
  return (
    <Score
      difficulty={1}
      title={t('advanced_leaderboard')}
      quizType={t('advanced_quiz')}
    />
  );
};

export default ScoreMajor;

