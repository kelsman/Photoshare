import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import './style.scss';
import { signup } from '../../../redux/Actions/userActions';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { BiHide, BiShowAlt } from 'react-icons/bi';
import { IconContext } from 'react-icons';
import axios from 'axios';

function SignUpForm({ history, signup }) {
  const validationSchema = Yup.object().shape({
    name: Yup.string().required('fullname is required'),
    username: Yup.string().required('username is required'),
    email: Yup.string().email('please enter a valid email address').required(),
    password: Yup.string().required('required'),
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleShowToggle = () => {
    setShowPassword((prev) => !prev);
  };

  const handleFormSubmit = async (values) => {
    try {
      const data = await new FormData();
      data.append('name', values.name);
      data.append('username', values.username);
      data.append('email', values.email);
      data.append('password', values.password);
      data.append('avatar', values.avatar);

      await signup(data, history);
    } catch (error) {
      console.log(error.message);
    }
  };
  const formik = useFormik({
    initialValues: {
      name: '',
      username: '',
      email: '',
      password: '',
      avatar: null,
    },
    validationSchema,

    onSubmit: handleFormSubmit,
  });

  const { values, errors, handleChange, handleSubmit, setFieldValue } = formik;
  return (
    <Fragment>
      <form className="sign__up__form" encType="multipart/form-data" onSubmit={handleSubmit}>
        <h2>Sign up</h2>
        <div className="name-input">
          <input
            name="name"
            type="text"
            placeholder="Full Name"
            value={values.fullName}
            onChange={handleChange('name')}
          />
        </div>
        {errors.fullName && <small className="error">{errors.fullName}</small>}

        <div className="username-input">
          <input
            type="text"
            name="username"
            placeholder="username"
            value={values.username}
            onChange={handleChange('username')}
          />
        </div>
        {errors.username && <small className="error">{errors.username}</small>}
        <div className="email-input">
          <input
            type="email"
            name="email"
            placeholder="email"
            value={values.email}
            onChange={handleChange('email')}
          />
        </div>
        {errors.email && <small className="error">{errors.email}</small>}
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
        {errors.password && <small className="error">{errors.password}</small>}
        <div className="file-input">
          <input
            type="file"
            name="avatar"
            onChange={(event) => setFieldValue('avatar', event.target.files[0])}
          />
        </div>
        {errors.file && <small className="error">{errors.file}</small>}
        <button type="submit" className="signup-btn">
          {' '}
          Sign Up
        </button>
        <p>
          {' '}
          already have an account? <Link to="/"> Log in</Link>
        </p>
      </form>
    </Fragment>
  );
}

export default connect(null, { signup })(withRouter(SignUpForm));
