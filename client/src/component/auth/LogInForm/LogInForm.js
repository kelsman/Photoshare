import React, { Fragment, useState, useEffect } from 'react';
import './style.scss';
import * as Yup from 'yup';
import * as Icon from 'react-feather'


import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { signin, loaduser } from '../../../redux/Actions/userActions';
// import { Formik } from 'formik';
import { useFormik } from 'formik';
import { AiOutlineLock, AiOutlineMail } from 'react-icons/ai';
import { IconContext } from 'react-icons';
import { ReactComponent as LoaderSpinner } from '../../../assets/loader.svg';
// import cogoToast from 'cogo-toast';

// Routes
import * as Routes from '../../routes';

import { useHistory } from 'react-router-dom';

const validationSchema = Yup.object().shape({
  email: Yup.string().email().required('please provide a valid email'),
  password: Yup.string().required(`password can't be empty`),
});

const LogInForm = ({ signin, isAuthenticated, currentUser }) => {
  const history = useHistory();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFormSubmit = async (values) => {
    try {
      setIsSubmitting(true);
      await signin(values);
      setIsSubmitting(false);
      values.email = '';
      values.password = '';


    } catch (error) {
      console.log(error.message);
    }
  };
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: handleFormSubmit,
  });

  //  Redirect if Logged in 
  if (isAuthenticated && currentUser) {
    // return <Redirect to={Routes.Dashboard} />
    window.location.href = Routes.Dashboard
  }

  const { values, errors, handleChange, handleSubmit } = formik;

  return (
    <div>
      {/* <h1 className="logo">Photogram</h1> */}
      <form onSubmit={handleSubmit} className="login-form">
        <h1 className="logo"> PhotoShare</h1>
        <h6> Welcome Back</h6>
        <h6> Sign in to continue</h6>
        <div className="form__material">
          <div className="email-container">
            <Icon.Mail size={15} />
            <input
              className="email-input"
              id="email"
              type="email"
              name="email"
              value={formik.values.email}
              onChange={handleChange}
              required
              autoComplete="off"
              placeholder="email"
            />

          </div>
          {errors.email && (
            <small className="error" style={{ color: 'red', opacity: 0.7 }}>
              {' '}
              {errors.email}
            </small>
          )}
        </div>
        <div>
          <div className="password-container">
            <Icon.Lock size={15} />
            <input
              id="password"
              className="password-input"
              type="password"
              name="password"
              value={values.password}
              onChange={handleChange}
              autoComplete="off"
              placeholder="Password"
            />

          </div>
          {errors.password && (
            <small className="error" style={{ color: 'red', opacity: 0.7 }}>
              {' '}
              {errors.password}
            </small>
          )}
        </div>
        <Link className="password-reset-link" to="/accounts/password/reset">
          Forgot your password?{''}
        </Link>

        <button type="submit" className="login-btn" disabled={isSubmitting ? true : false}>
          {isSubmitting ? <LoaderSpinner /> : 'Log in'}
        </button>
      </form>
      <p className="new_user_link">
        {' '}
        <span> I'm a new user?</span>
        {' '}
        <Link className="sign-up-link" to="/accounts/signup">
          {' '}
            Sign up
          </Link>
      </p>
    </div>
  );
};

const mapStateToProps = ({ user }) => {
  return {
    loadUserErrorr: user.authError.loadUserError,
    isAuthenticated: user.isAuthenticated,
    currentUser: user.currentUser
  };
};

export default connect(mapStateToProps, { signin, loaduser })(LogInForm);
