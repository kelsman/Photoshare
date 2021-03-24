import React from 'react';
import './style.scss';

import SignUpForm from '../../component/auth/SignUpForm/SignUpForm';
// import Header from '../../component/Header'
function SignUpScreen() {
  return (
    <div className="signup-screen">
      {/*   <Header /> */}
      <section className="form-section">
        <SignUpForm />
      </section>
    </div>
  );
}

export default SignUpScreen;
