import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import ChooseQuiz from './Pages/ChooseQuiz';
import QuizMajor from './Pages/QuizMajor';
import QuizMinor from './Pages/QuizMinor';
import ScoreMinor from './Pages/ScoreMinor';
import ScoreMajor from './Pages/ScoreMajor';
import StatsMinor from './Pages/StatsMinor';
import StatsMajor from './Pages/StatsMajor';

// Constants for route paths
const PATHS = {
  HOME: '/',
  CHOOSE_QUIZ: '/choose-quiz',
  QUIZ_MAJOR: '/quiz-major',
  QUIZ_MINOR: '/quiz-minor',
  SCORE_MINOR: '/score-minor',
  SCORE_MAJOR: '/score-major',
  STATS_MINOR: '/stats-minor',
  STATS_MAJOR: '/stats-major',
};

function App() {
  // Set the document title
  document.title = 'Cybersecurity challenge!';

  return (
    <Router>
      <Routes>
        <Route path={PATHS.HOME} element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path={PATHS.CHOOSE_QUIZ} element={<ChooseQuiz />} />
        <Route path={PATHS.QUIZ_MAJOR} element={<QuizMajor />} />
        <Route path={PATHS.QUIZ_MINOR} element={<QuizMinor />} />
        <Route path={PATHS.SCORE_MINOR} element={<ScoreMinor />} />
        <Route path={PATHS.SCORE_MAJOR} element={<ScoreMajor />} />
        <Route path={PATHS.STATS_MINOR} element={<StatsMinor />} />
        <Route path={PATHS.STATS_MAJOR} element={<StatsMajor />} />
      </Routes>
    </Router>
  );
}

export default App;
