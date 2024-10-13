import React, { useState, useEffect } from 'react';
import { Button, Table } from 'react-bootstrap';
import '../i18n';
import { useTranslation } from 'react-i18next';
import { BACKEND_URL } from '../config.js';

// Constants for styles
const tableStyle = {
  border: '2px solid #01d976',
  color: 'white',
  boxShadow: '0px 0px 20px 0px rgba(1,217,118, 0.8)',
};

const cellStyle = (username, scoresUsername, index) => ({
  border: '2px solid #01d976',
  color: username === scoresUsername ? '#01d976' : 'white',
  backgroundColor: index ? '' : 'red',
  fontWeight: username === scoresUsername ? 'bold' : '',
});

const buttonStyle = {
  backgroundColor: '#01d976',
  color: 'white',
  border: 'none',
  padding: '10px 20px',
  fontSize: '16px',
  cursor: 'pointer',
};

const questionStyle = {
  border: '2px solid #01d976',
  color: 'white'
};

const thStyle = {
  border: '2px solid #01d976'
};

const Score = ({ difficulty, title, quizType }) => {
  const { t } = useTranslation();
  const [score, setScore] = useState([]);
  const username = sessionStorage.getItem('username');

  useEffect(() => {
    const myHeaders = new Headers();
    myHeaders.append('Access-Control-Allow-Origin', '*');
    myHeaders.append('Content-Type', 'application/json; charset=UTF-8');
    const requestOptions = {
      method: 'GET',
      headers: myHeaders,
    };

    fetch(`${BACKEND_URL}/getLeaderboard?difficulty=${difficulty}`, requestOptions)
      .then(response => response.json())
      .then(response => {
        setScore(response);
      })
      .catch(error => {
        console.log(error);
      });
  }, [difficulty]);

  return (
    <div>
      <div className=''>
        <img
          src={require('../Assets/logo.png')}
          style={{ width: '20%' }}
          alt='Logo'
        />
      </div>
      <div style={{ marginTop: '5%', width: '70%'}}>
        <h1>{title}</h1>
        <br />
        <div style={{ padding: '5px 45px 15px 45px' }}>
          <Table striped bordered hover style={tableStyle}>
            <thead style={thStyle}>
              <tr style={thStyle}>
                <th style={thStyle} width='10%'>
                  {t('place')}
                </th>
                <th style={thStyle} width='20%'>
                  {t('player_username')}
                </th>
                <th style={thStyle} width='10%'>
                  {t('difficulty')}
                </th>
                <th style={thStyle} width='10%'>
                  {t('score')}
                </th>
                <th style={thStyle} width='10%'>
                  {t('date')}
                </th>
              </tr>
            </thead>
            <tbody style={thStyle}>
              {score
                .sort((a, b) => b.score - a.score)
                .map((scores, index) => (
                  <tr
                    key={index}
                    style={questionStyle}
                  >
                    <td style={cellStyle(username, scores.username, index)}>
                      {index ? index + 1 : t('winner')}
                    </td>
                    <td style={cellStyle(username, scores.username, index)}>
                      {scores.username}
                    </td>
                    <td style={cellStyle(username, scores.username, index)}>
                      {quizType}
                    </td>
                    <td style={cellStyle(username, scores.username, index)}>
                      {scores.score}
                    </td>
                    <td style={cellStyle(username, scores.username, index)}>
                      {scores.date}
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </div>
        <div style={{ textAlign: 'center' }}>
          <Button href='/choose-quiz' style={buttonStyle}>
            {t('playAgain')}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Score;
