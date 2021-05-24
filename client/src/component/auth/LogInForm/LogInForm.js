// import { Formik } from 'formik';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import * as Icon from 'react-feather';
import { connect } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import * as Yup from 'yup';
import { ReactComponent as LoaderSpinner } from '../../../assets/loader.svg';
import { loaduser, signin } from '../../../redux/Actions/userActions';
// import cogoToast from 'cogo-toast';
// Routes
import * as Routes from '../../routes';
import './style.scss';




const validationSchema = Yup.object().shape({
  usernameoremail: Yup.string().required('please provide a valid email or username'),
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
      values.usernameoremail = '';
      values.password = '';


    } catch (error) {
      console.log(error.message);
    }
  };
  const formik = useFormik({
    initialValues: {
      usernameoremail: '',
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

  const { values, errors, handleChange, touched, handleSubmit } = formik;

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
              type="text"
              name="usernameoremail"
              value={formik.values.usernameoremail}
              onChange={handleChange}
              required
              autoComplete="off"
              placeholder="username or email"
            />

          </div>
          {errors.usernameoremail && touched.usernameoremail && (
            <small className="error" style={{ color: 'red', opacity: 0.7 }}>
              {' '}
              {errors.usernameoremail}
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
          {errors.password && touched.password && (
            <small className="error" style={{ color: 'red', opacity: 0.7 }}>
              {' '}
              {errors.password}
            </small>
          )}
        </div>
        <Link className="password-reset-link" to={Routes.ForgotPassword}>
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
