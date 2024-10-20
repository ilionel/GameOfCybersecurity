import React from 'react';
import {
  Button,
  Container,
  Col,
  Tooltip,
  OverlayTrigger,
} from 'react-bootstrap';
import '../App.css';
import '../translations.json';

import { FaArrowLeft } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

// Constants for styles
const buttonStyle = {
  marginLeft: '-80%',
  borderRadius: '50%',
  backgroundColor: '#01d976',
  borderColor: '#01d976',
};

const beginnerButtonStyle = {
  fontWeight: 'bold',
  fontSize: '17px',
  marginRight: '2%',
  backgroundColor: '#01d976',
  borderColor: '#01d976',
};

const advancedButtonStyle = {
  marginRight: '1%',
  fontWeight: 'bold',
  fontSize: '17px',
};

// Constants for image paths
const logoSrc = require('../Assets/logo.png');

function ChooseQuiz() {
  const { t } = useTranslation();
  const username = sessionStorage.getItem('username');

  // Tooltip components
  const renderTooltipBeginner = props => (
    <Tooltip id='button-tooltip' {...props}>
      {t('beginner_tooltip')}
    </Tooltip>
  );

  const renderTooltipAdvanced = props => (
    <Tooltip id='button-tooltip' {...props}>
      {t('advanced_tooltip')}
    </Tooltip>
  );

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
              src={logoSrc}
              style={{ width: '20%' }}
              alt='Logo'
            />
          </div>
          <Col xs={12} md={8}>
            <div
              id='chooseQuiz'
              className='col-size offset-md-3'
              style={{ marginTop: '10%' }}
            >
              <Button
                href='/home'
                className='button-user'
                style={buttonStyle}
              >
                <FaArrowLeft />
              </Button>
              <h2 className='text-center'>
                {t('welcome')} {username} !
              </h2>
              <h2 className='text-center'>{t('choose_quiz')}</h2>
              <br />
              <div className='d-flex col-md-10 offset-md-2'>
                <OverlayTrigger
                  placement='left'
                  delay={{ show: 250, hide: 400 }}
                  overlay={renderTooltipBeginner}
                >
                  <Button
                    href='/quiz-minor'
                    className='col-md-5 rounded-pill button-user'
                    style={beginnerButtonStyle}
                  >
                    {t('beginner_quiz')}
                  </Button>
                </OverlayTrigger>
                <OverlayTrigger
                  placement='right'
                  delay={{ show: 250, hide: 400 }}
                  overlay={renderTooltipAdvanced}
                >
                  <Button
                    href='/quiz-major'
                    className='col-md-5 rounded-pill button-major'
                    style={advancedButtonStyle}
                    variant='danger'
                  >
                    {t('advanced_quiz')}
                  </Button>
                </OverlayTrigger>
              </div>
            </div>
          </Col>
        </div>
      </Col>
    </Container>
  );
}

export default ChooseQuiz;
