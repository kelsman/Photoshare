import { userActionTypes } from '../Constants/userConstants';
import { setToken } from '../../utils';
import { Redirect } from 'react-router-dom';

import axios from 'axios';
import cogoToast from 'cogo-toast';
import * as Routes from '../../component/routes';

const baseUrl = process.env.REACT_APP_BASE_URL
const token = localStorage.getItem('authToken');
export const signup = (data, history) => {
  return async (dispatch) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };
      cogoToast.loading('Registering....');
      const response = await axios.post(`${baseUrl}/api/route/user/register`, data, config);
      if (response) {
        await dispatch({ type: userActionTypes.SIGN_UP_SUCESS, payload: response.data });
        cogoToast.success('signup success');
        history.push('/');
      }
    } catch (error) {
      console.log(error.message);
      if (error.response) {
        await dispatch({ type: userActionTypes.SIGN_UP_FAIL, payload: error.response.data });
        cogoToast.error(`${error.response.data.msg}`);
      }
    }
  };
};

export const signin = (data) => {
  return async (dispatch) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const response = await axios.post(`${baseUrl}/api/route/user/login`, data, config);
      if (response) {
        await dispatch({ type: userActionTypes.LOG_IN_SUCCESS, payload: response.data });
        await localStorage.setItem('authToken', response.data.jwtToken);
        cogoToast.success('sign in success', { position: 'bottom-right' });

      }
    } catch (error) {
      if (error.response) {
        await dispatch({ type: userActionTypes.LOG_IN_FAIL, payload: error.response.data });
        cogoToast.error(`${error.message}`);
      }
    }
  };
};

export const loaduser = () => {
  return async (dispatch) => {

    try {
      const response = await axios.get(`${baseUrl}/api/route/user/getUser`);
      if (response) {
        await dispatch({ type: userActionTypes.LOAD_USER_SUCCESS, payload: response.data.user[0] });
      }
    } catch (error) {
      if (error.response) {
        await dispatch({ type: userActionTypes.LOAD_USER_FAIL, payload: error.response.data });
        console.log(error.message)
        if (
          error.response.data.msg === 'jwt expired' ||
          error.response.data.msg === `you're not authorised`
        ) {
          cogoToast.info('session expired');
          localStorage.removeItem('authToken');
        }
      }
    }
  };
};

export const LogOut = (history) => {
  return async (dispatch) => {
    try {
      await localStorage.removeItem('authToken');
      dispatch({ type: userActionTypes.LOG_OUT_SUCCESS, payload: 'sign out sucessful' });
      history.push(Routes.Login);
      cogoToast.success('Sign out success');
    } catch (error) {
      console.log(error.message);
      dispatch({ type: userActionTypes.LOG_OUT_FAIL, payload: error.message });
    }
  };
};
