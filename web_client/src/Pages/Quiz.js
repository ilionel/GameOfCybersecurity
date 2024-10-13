import React, { useState, useMemo, useEffect } from 'react';
import TinderCard from 'react-tinder-card';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import { Button, Table, Spinner } from 'react-bootstrap';
import { FaRegTimesCircle, FaRegCheckCircle } from 'react-icons/fa';
import '../i18n';
import { useTranslation } from 'react-i18next';
import '../App.css';
import { BACKEND_URL, TIMER, WIN_TIME, WIN_SCORE } from '../config.js';

// Constants for styles
const buttonStyle = {
  borderRadius: '50%',
  backgroundColor: '#01d976',
  borderColor: '#01d976',
};

const inputStyle = {
  backgroundColor: '#292a3e',
  borderColor: '#191a28',
  color: 'white',
  boxShadow: '0px 0px 20px 0px rgba(1,217,118, 0.8)',
};

const cardStyle = {
  border: '2px solid',
  backgroundColor: '#292a3e',
  color: 'white',
  fontWeight: 'bold',
  fontSize: '16px',
  padding: '15px',
  width: '300px',
  margin: '0 auto',
};

const questionStyle = {
  border: '2px solid #01d976',
  color: 'white'
};

const thStyle = {
  border: '2px solid #01d976'
};

const iconStyle = {
  marginTop: '2%',
  display: 'none'
};

const spinStyle = {
  display: 'none',
  marginTop: '10%'
};

const spinnerStyle = {
  height: '150px',
  width: '150px',
  color: '#01d976'
};

const resultStyle = {
  backgroundColor: '#01d976',
  borderColor: '#01d976',
  fontWeight: 'bold',
};

// Constants for image paths
const logoSrc = require('../Assets/logo.png');
const botSrc = require('../Assets/Bot.png');

const Quiz = ({ questions, difficulty }) => {
  const { t } = useTranslation();
  const username = sessionStorage.getItem('username');
  const [currentIndex, setCurrentIndex] = useState(questions.length - 1);
  const [start, setStart] = useState(false);
  const [winTime, setWinTime] = useState(TIMER);
  const [score, setScore] = useState(0);
  const [saveAnswer, setSaveAnswer] = useState([]);

  const childRefs = useMemo(
    () => Array(questions.length).fill(0).map(() => React.createRef()),
    [questions.length]
  );

  const handleStart = () => {
    setStart(true);
  };

  const showQuizz = () => {
    const readyDiv = document.getElementById('ready');
    const quizDiv = document.getElementById('quiz');

    readyDiv.style.display = 'none';
    quizDiv.style.display = 'block';
    handleStart();
  };

  const updateCurrentIndex = (val) => {
    setCurrentIndex(val);
  };

  const sendScore = async () => {
    const userScore = sessionStorage.getItem('score');
    const myHeaders = new Headers();
    myHeaders.append('Access-Control-Allow-Origin', '*');
    myHeaders.append('Content-Type', 'application/json; charset=UTF-8');

    const raw = JSON.stringify({
      username: username,
      difficulty: difficulty,
      score: parseInt(userScore),
      answers: saveAnswer
    });
    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
    };

    try {
      const response = await fetch(`${BACKEND_URL}/addScore`, requestOptions);
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const swiped = async (direction, nameToDelete, index) => {
    const checkWin = document.getElementById('winIcon');
    const checkLoose = document.getElementById('looseIcon');
    const quizDiv = document.getElementById('quiz');
    const detailsDiv = document.getElementById('details');
    const spinn = document.getElementById('spin');
    const timer = sessionStorage.getItem('time');

    updateCurrentIndex(index - 1);
    if (direction === questions[index].good_answer) {
      checkWin.style.display = 'block';
      checkLoose.style.display = 'none';
      setScore(score => score + WIN_SCORE + (winTime / TIMER * 10 ) | 0 );
      setWinTime(winTime => winTime + WIN_TIME);
      saveAnswer.push('✅');
    } else {
      checkWin.style.display = 'none';
      checkLoose.style.display = 'block';
      saveAnswer.push('❌');
    }
    if (index === 0 || timer < 3) {
      while (saveAnswer.length < questions.length) {
        saveAnswer.push('🕒');
      }
      const reversed = saveAnswer.reverse();
      setSaveAnswer(reversed);
      quizDiv.style.display = 'none';
      spinn.style.display = 'block';
      await wait(1000);
      sendScore();
      await wait(2000);
      spinn.style.display = 'none';
      detailsDiv.style.display = 'block';
    }
  };

  const outOfFrame = (name, idx) => {
    const currentCardPackage = document.getElementById('card' + idx);
    let nextCardPackage;
    if (idx > 0) {
      nextCardPackage = document.getElementById('card' + (idx - 1));
    }

    currentCardPackage.style.display = 'none';
    if (nextCardPackage) {
      nextCardPackage.style.display = 'flex';
    }
  };

  const swipe = async (dir) => {
    if (currentIndex >= 0 && currentIndex < questions.length) {
      await childRefs[currentIndex].current.swipe(dir); // Swipe the card!
    }
  };

  const wait = (timeout) => {
    return new Promise(resolve => {
      setTimeout(resolve, timeout);
    });
  };

  useEffect(() => {
    sessionStorage.setItem('score', score);
  }, [score, winTime]);

  return (
    <div>
      <div className=''>
        <img src={logoSrc} style={{ width: '20%' }} alt='Logo' />
      </div>
      <div id='ready'>
        <div className='' style={{ marginTop: '5%' }}>
          <h1 className=''>
            {t('welcome')} {username} {t('to_the')}{' '}
            {difficulty === 0 ? t('beginner_quiz') : t('advanced_quiz')} !
          </h1>
          <br />
          <h2 className='text-center'>{t('are_you_ready')}</h2>
          <br />
          <br />
          <Button
            onClick={showQuizz}
            style={buttonStyle}
            className='button-user rounded-pill col-md-2'
          >
            {t('start')}
          </Button>
          <br />
          <br />
        </div>
        <br />
        <div className='mx-auto col-size' style={{ width: '50%', marginBottom: '100px' }}>
          <div className='d-flex offset-md-5'>
            <h2 className='text-center'>{t('how_to_play')}</h2>
            <img src={botSrc} style={{ width: '10%' }} alt='Logo' />
          </div>
          <p
            className='text-center'
            style={{ color: 'white', fontWeight: '', fontSize: '20px', marginLeft: '15px' }}
          >
            {t('how_to_play_description')}
          </p>
        </div>
      </div>
      <div id='quiz' style={{ display: 'none', width: '1350px' }}>
        <div className='d-flex offset-md-1'>
          <CountdownCircleTimer
            isPlaying={start}
            duration={winTime}
            colors={['#01d976', '#F7B801', '#A30000', '#A30000']}
            colorsTime={[10, 5, 2, 0]}
            initialRemainingTime={winTime}
            size={100}
          >
            {({ remainingTime }) => {
              sessionStorage.setItem('time', remainingTime);
              return <h1>{remainingTime}</h1>;
            }}
          </CountdownCircleTimer>
          <div
            className='col-md-1 offset-md-4'
            id='winIcon'
            style={iconStyle}
          >
            <FaRegCheckCircle color='#01d976' size={40} />
          </div>
          <br />
          <div
            className='col-md-1 offset-md-4'
            id='looseIcon'
            style={iconStyle}
          >
            <FaRegTimesCircle color='red' size={40} />
          </div>
          <br />
          <div className='offset-md-3' style={{ marginTop: '2%' }}>
            <h1 style={{ fontSize: '30px' }}>
              {username} {t('score')} : {score}
            </h1>
          </div>
        </div>

        <div className='cardContainer'>
          {questions.map((character, index) => (
            <div
              key={character.title}
              id={'card' + index}
              style={{
                display: index === questions.length - 1 ? '' : 'none',
              }}
            >
              <div style={{ margin: '20px 0' }} onClick={() => swipe('up')}>
                <p style={{ ...cardStyle, border: '2px solid fuchsia' }}>
                  3 : {character.up}
                </p>
              </div>
              <div className='cardMiddleRow'>
                <div style={{ margin: '0 20px' }} onClick={() => swipe('left')}>
                  <p style={{ ...cardStyle, border: '2px solid gold' }}>
                    1 : {character.left}
                  </p>
                </div>
                <TinderCard
                  ref={childRefs[index]}
                  className='swipe'
                  key={character.title}
                  onSwipe={dir => swiped(dir, character.title, index)}
                  onCardLeftScreen={() => outOfFrame(character.title, index)}
                >
                  <div>
                    <h4 style={{ marginBottom: '10px' }}>{character.title}</h4>
                  </div>
                  <div
                    style={{ backgroundImage: 'url(' + character.image + ')' }}
                    className='card'
                  ></div>
                </TinderCard>
                <div
                  style={{ margin: '0 20px' }}
                  onClick={() => swipe('right')}
                >
                  <p style={{ ...cardStyle, border: '2px solid aqua' }}>
                    2 : {character.right}
                  </p>
                </div>
              </div>
              <div style={{ margin: '20px 0' }} onClick={() => swipe('down')}>
                <p style={{ ...cardStyle, border: '2px solid lightsalmon' }}>
                  4 : {character.down}
                </p>
              </div>
            </div>
          ))}
        </div>
        <br />

        <div className='buttons offset-md2' style={{ marginTop: '20px' }}>
          <button
            className='button-go'
            style={{ backgroundColor: !currentIndex && '#c3c4d3' }}
            onClick={() => swipe('left')}
          >
            {t('answer_1')}
          </button>
          <button
            className='button-aqua'
            style={{ backgroundColor: !currentIndex && '#c3c4d3' }}
            onClick={() => swipe('right')}
          >
            {t('answer_2')}
          </button>
          <button
            className='button-fu'
            style={{ backgroundColor: !currentIndex && '#c3c4d3' }}
            onClick={() => swipe('up')}
          >
            {t('answer_3')}
          </button>
          <button
            className='button-lightsalmon'
            style={{ backgroundColor: !currentIndex && '#c3c4d3' }}
            onClick={() => swipe('down')}
          >
            {t('answer_4')}
          </button>
        </div>
      </div>
      <div id='spin' style={spinStyle}>
        <Spinner
          animation='border'
          variant='#01d976'
          size='500'
          style={spinnerStyle}
        />
        <br />
        <br />
        <h5 style={{ color: 'white', fontWeight: 'bold' }}>
          {t('loading_results')}
        </h5>
      </div>
      <div id='details' style={iconStyle}>
        <Button
          href={difficulty === 0 ? '/score-minor' : '/score-major'}
          style={resultStyle}
          className='rounded-pill col-md-2 button-user'
        >
          {t('view_leaderboard')}
        </Button>
        <br />
        <br />
        <div
          style={{ backgroundColor: '#292a3e', padding: '5px 45px 15px 45px' }}
        >
          <Table
            striped
            bordered
            hover
            style={inputStyle}
          >
            <thead style={thStyle}>
              <tr style={thStyle}>
                <th style={thStyle} width='20%'>
                  {t('question')}
                </th>
                <th style={thStyle} width='10%'>
                  {t('good_answer')}
                </th>
                <th style={thStyle} width='20%'>
                  {t('details')}
                </th>
                <th style={thStyle} width='4%'>
                  {t('your_answer')}
                </th>
              </tr>
            </thead>
            <tbody style={thStyle}>
              {questions.map((question, index) => (
                <tr
                  key={question.title}
                  style={questionStyle}
                >
                  <td style={questionStyle}>
                    {question.title}
                  </td>
                  <td style={questionStyle}>
                    {question[question.good_answer]}
                  </td>
                  <td style={questionStyle}>
                    {question.details}
                  </td>
                  <td style={questionStyle}>
                    {saveAnswer[index]}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
