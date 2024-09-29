import React from 'react';
import { Button, Form, Container, Col } from 'react-bootstrap';
import { FaArrowRight } from 'react-icons/fa';
import '../i18n';
import { useTranslation } from 'react-i18next';
import '../App.css';

function Home() {
  const { t } = useTranslation();

  const sendUsername = () => {
    const inputUsername = document.getElementById('usernameInput');

    if (inputUsername.value === '') {
      sendAnonymously();
    } else if (inputUsername.value !== '') {
      sessionStorage.setItem('username', inputUsername.value);
      window.location.href = '/choose-quiz';
    }
  };

  const handleKeyDown = event => {
    if (event.key === 'Enter') {
      sendUsername();
    }
  };

  const sendAnonymously = () => {
    sessionStorage.setItem('username', 'Anonymous');
    window.location.href = '/choose-quiz';
  };

  return (
    <Container fluid='md'>
      <Col md='auto'>
        <div
          className='App col-md-12'
          style={{ backgroundColor: 'transparent' }}
        >
          <br />
          <div className='justify-content-center d-flex'>
            <img
              src={require('../Assets/logo.png')}
              style={{ width: '20%' }}
              alt='Logo'
            />
          </div>
          <Col xs={12} md={8}>
            <div
              id='username'
              className='text-center'
              style={{ marginTop: '5%' }}
            >
              <br />
              <div className='offset-md-3 col-size'>
                <h2 style={{ fontWeight: 'bold' }}>{t('username')}</h2>
                <br />
                <div className='col-md-6 d-flex'>
                  <Form.Control
                    style={{
                      backgroundColor: '#292a3e',
                      borderColor: '#191a28',
                      color: 'white',
                      boxShadow: '0px 0px 20px 0px rgba(1,217,118, 0.8)',
                    }}
                    type='username'
                    id='usernameInput'
                    className='col-md-1 offset-md-6 input-user'
                    placeholder={t('username')}
                    onKeyDown={handleKeyDown}
                  />
                  <Button
                    className='button-user'
                    type='button'
                    style={{
                      marginLeft: '3%',
                      borderRadius: '50%',
                      backgroundColor: '#01d976',
                      borderColor: '#01d976',
                    }}
                    onClick={sendUsername}
                  >
                    <FaArrowRight />
                  </Button>
                </div>
                <br />
                <span style={{ color: 'white', fontWeight: 'bold' }}>
                  ‒‒‒‒‒‒‒‒‒‒ {t('or')} ‒‒‒‒‒‒‒‒‒‒
                </span>
                <br />
                <br />
                <Button
                  style={{ backgroundColor: '#01d976', borderColor: '#01d976' }}
                  className='rounded-pill col-md-4 button-user'
                  onClick={sendAnonymously}
                >
                  {t('anonymously')}
                </Button>
                <br />
                <br />
              </div>
            </div>
          </Col>
        </div>
      </Col>
    </Container>
  );
}

export default Home;

