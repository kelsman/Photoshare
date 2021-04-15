import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import './style.scss';
import { signup } from '../../../redux/Actions/userActions';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import * as Icons from 'react-feather';
import { BiHide, BiShowAlt } from 'react-icons/bi';
import { IconContext } from 'react-icons';
import { ReactComponent as LoaderSpinner } from '../../../assets/loader.svg';





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
      // const data = await new FormData();
      // await data.append('name', values.name);
      // await data.append('username', values.username);
      // await data.append('email', values.email);
      // await data.append('password', values.password);
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

  const { values, errors, handleChange, handleSubmit, setFieldValue } = formik;
  return (
    <div className="sign_up_form_container">
      <form className="sign__up__form" onSubmit={handleSubmit}>
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
        {/*  <div className="file-input">
          <label htmlFor="avatar" className="avatar-label">

            <span>select Avatar <Icons.Image /></span>
          </label>
          <input
            type="file"
            name="avatar"
            id="avatar"
            onChange={(event) => setFieldValue('avatar', event.target.files[0])}
            style={{ display: "none" }}
            placeholder="select avatar"
          />
          <span></span>

        </div> */}
        {errors.file && <small className="error">{errors.file}</small>}
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
