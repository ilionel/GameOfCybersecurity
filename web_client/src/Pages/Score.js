import React, { useState, useEffect } from 'react';
import { Button, Table } from 'react-bootstrap';
import '../i18n';
import { useTranslation } from 'react-i18next';
import { BACKEND_URL } from '../config.js';

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
    fetch(
      `${BACKEND_URL}/getLeaderboard?difficulty=${difficulty}`,
      requestOptions
    )
      .then(response => response.json())
      .then(response => {
        console.log(response);
        setScore(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <div className=''>
        <img
          src={require('../Assets/logo.png')}
          style={{ width: '20%' }}
          alt='Logo'
        />
      </div>
      <div style={{ marginTop: '5%' }}>
        <h1>{title}</h1>
        <br />
        <div style={{ padding: '5px 45px 15px 45px' }}>
          <Table
            striped
            bordered
            hover
            style={{
              border: '2px solid #01d976',
              color: 'white',
              boxShadow: '0px 0px 20px 0px rgba(1,217,118, 0.8)',
            }}
          >
            <thead style={{ border: '2px solid #01d976' }}>
              <tr style={{ border: '2px solid #01d976' }}>
                <th style={{ border: '2px solid #01d976' }} width='10%'>
                  {t('place')}
                </th>
                <th style={{ border: '2px solid #01d976' }} width='20%'>
                  {t('player_username')}
                </th>
                <th style={{ border: '2px solid #01d976' }} width='10%'>
                  {t('difficulty')}
                </th>
                <th style={{ border: '2px solid #01d976' }} width='10%'>
                  {t('score')}
                </th>
                <th style={{ border: '2px solid #01d976' }} width='10%'>
                  {t('date')}
                </th>
              </tr>
            </thead>
            <tbody style={{ border: '2px solid #01d976' }}>
              {score
                .sort((a, b) => {
                  return b.score - a.score;
                })
                .map((scores, index) => (
                  <tr
                    key={index}
                    style={{ border: '2px solid #01d976', color: 'white' }}
                  >
                    <td
                      style={{
                        border: '2px solid #01d976',
                        color:
                          username === scores.username ? '#01d976' : 'white',
                        backgroundColor: index ? '' : 'red',
                        fontWeight: username === scores.username ? 'bold' : '',
                      }}
                    >
                      {index ? index + 1 : t('winner')}
                    </td>
                    <td
                      style={{
                        border: '2px solid #01d976',
                        color:
                          username === scores.username ? '#01d976' : 'white',
                        backgroundColor: index ? '' : 'red',
                        fontWeight: username === scores.username ? 'bold' : '',
                      }}
                    >
                      {scores.username}
                    </td>
                    <td
                      style={{
                        border: '2px solid #01d976',
                        color:
                          username === scores.username ? '#01d976' : 'white',
                        backgroundColor: index ? '' : 'red',
                        fontWeight: username === scores.username ? 'bold' : '',
                      }}
                    >
                      {quizType}
                    </td>
                    <td
                      style={{
                        border: '2px solid #01d976',
                        color:
                          username === scores.username ? '#01d976' : 'white',
                        backgroundColor: index ? '' : 'red',
                        fontWeight: username === scores.username ? 'bold' : '',
                      }}
                    >
                      {scores.score}
                    </td>
                    <td
                      style={{
                        border: '2px solid #01d976',
                        color:
                          username === scores.username ? '#01d976' : 'white',
                        backgroundColor: index ? '' : 'red',
                        fontWeight: username === scores.username ? 'bold ' : '',
                      }}
                    >
                      {scores.date}
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </div>
        <div style={{ textAlign: 'center' }}>
          <Button
            href='/choose-quiz'
            style={{
              backgroundColor: '#01d976',
              color: 'white',
              border: 'none',
              padding: '10px 20px',
              fontSize: '16px',
              cursor: 'pointer',
            }}
            //onClick={() => window.location.reload()}
          >
            {t('playAgain')}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Score;

