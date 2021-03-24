import React, { useState } from 'react';
import LogInForm from '../../component/auth/LogInForm/LogInForm';
import './style.scss';

import people from '../../assets/OBJECTS.png';
const LoginScreen = () => {
  return (
    <div className="login-screen">
      <div className="svg">
        <img src={people} alt="people" />
        <p> Share images and videos with Friends</p>
      </div>
      <LogInForm />
    </div>
  );
};

export default LoginScreen;
