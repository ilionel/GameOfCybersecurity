import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import '../i18n';
import { useTranslation } from 'react-i18next';
import '../App.css';
import { BACKEND_URL } from '../config.js';

// Constants for styles

const inputStyle = {
  backgroundColor: '#292a3e',
  borderColor: '#191a28',
  color: 'white',
  boxShadow: '0px 0px 20px 0px rgba(1,217,118, 0.8)',
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
  display: 'block'
};

// Constants for image paths
const logoSrc = require('../Assets/logo.png');

const Stats = ({ questions, difficulty }) => {
  const { t } = useTranslation();
  const [stats, setStats] = useState([]);


  useEffect(() => {
    const myHeaders = new Headers();
    myHeaders.append('Access-Control-Allow-Origin', '*');
    myHeaders.append('Content-Type', 'application/json; charset=UTF-8');
    const requestOptions = {
      method: 'GET',
      headers: myHeaders,
    };

    fetch(`${BACKEND_URL}/getStatistics?difficulty=${difficulty}`, requestOptions)
      .then(response => response.json())
      .then(response => {
        setStats(response)
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  }, [difficulty]);


  return (
    <div>
      <div className=''>
        <img src={logoSrc} style={{ width: '20%' }} alt='Logo' />
      </div>
      <div id='details' style={iconStyle}>
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
                <th style={thStyle} width='6%'>
                  {"✅ / ❌ / 🕒"}
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
                  {stats[index] ? `${stats[index][0]} / ${stats[index][1]} / ${stats[index][2]}` : 'N/A'}
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

export default Stats;
