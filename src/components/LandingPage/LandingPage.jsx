import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './LandingPage.css';
import { 
  Button,
  Typography, } from '@material-ui/core';


// // CUSTOM COMPONENTS
// import RegisterForm from '../RegisterForm/RegisterForm';

function LandingPage() {
  const [heading, setHeading] = useState('Welcome');
  const history = useHistory();

  const onLogin = (event) => {
    history.push('/login');
  };

  return (
    <div className="container">
      <h2>{heading}</h2>

      <div className="grid">
        <div className="grid-col grid-col_8">
          <Typography>
         
          </Typography>

          <p>
      
          </p>

          <p>
  
          </p>
        </div>
        <div className="grid-col grid-col_4">
          {/* <RegisterForm /> */}

          <center>
            <h4>Already a Member?</h4>
            <Button
            color="primary"
            onClick={onLogin}>
              Login
            </Button>
          </center>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
