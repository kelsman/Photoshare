import { useFormik } from 'formik';
import React, { useState } from 'react';
import { BiHide, BiShowAlt } from 'react-icons/bi';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import * as Yup from 'yup';
import { ReactComponent as LoaderSpinner } from '../../../assets/loader.svg';
import { signup } from '../../../redux/Actions/userActions';
import './style.scss';





const validationSchema = Yup.object().shape({
  name: Yup.string().required('fullname is required'),
  username: Yup.string().required('username is required'),
  email: Yup.string().email('please enter a valid email address').required(),
  password: Yup.string().required('password is required'),
});


function SignUpForm({ history, signup }) {


  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleShowToggle = () => {
    setShowPassword((prev) => !prev);
  };

  const handleFormSubmit = async (values) => {

    try {
      setIsSubmitting(true)
      await signup(values, history);
      setIsSubmitting(false)
    } catch (error) {
      throw new Error(error.message)
    }
  };
  const formik = useFormik({
    initialValues: {
      name: '',
      username: '',
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: handleFormSubmit,
  });

  const { values, errors, handleChange, handleSubmit, touched, setFieldValue } = formik;
  return (
    <div className="sign_up_form_container">
      <form className="sign__up__form" onSubmit={handleSubmit}>
        <h2>Sign up</h2>
        <div className="name-input">
          <input
            name="name"
            type="text"
            placeholder="Full Name"
            value={values.name}
            onChange={handleChange('name')}
          />
        </div>
        {errors.name && touched.name && <small className="error">{errors.fullName}</small>}
        <div className="username-input">
          <input
            type="text"
            name="username"
            placeholder="username"
            value={values.username}
            onChange={handleChange('username')}
          />
        </div>
        {errors.username && touched.username && <small className="error">{errors.username}</small>}
        <div className="email-input">
          <input
            type="email"
            name="email"
            placeholder="email"
            value={values.email}
            onChange={handleChange('email')}
          />
        </div>
        {errors.email && touched.email && <small className="error">{errors.email}</small>}
        <div className="password-input">
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            placeholder="password"
            value={values.password}
            onChange={handleChange('password')}
          />
          {showPassword ? (
            <button className="btn-icon" type="button" onClick={handleShowToggle}>
              {' '}
              <BiShowAlt />
            </button>
          ) : (
            <button type="button" className="btn-icon" onClick={handleShowToggle}>
              <BiHide />
            </button>
          )}
        </div>
        {errors.password && touched.password && <small className="error">{errors.password}</small>}

        <button
          type="submit"
          className="signup-btn"
          disabled={isSubmitting ? true : false}
        >

          {isSubmitting ? <LoaderSpinner /> : 'Sign up'}
        </button>
      </form>
      <p className="existing_user_link">
        {' '}
        <span>already have an account? </span>
        {' '}
        <Link className="sign-in-link" to="/">
          Log in
          </Link>
      </p>
    </div>
  );
}

export default connect(null, { signup })(withRouter(SignUpForm));
