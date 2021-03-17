import { userActionTypes } from '../Constants/userConstants';
import { setToken } from '../../utils'
import { Redirect } from 'react-router-dom';

import axios from 'axios';
import cogoToast from 'cogo-toast';
import * as Routes from '../../component/routes';

const baseUrl = process.env.REACT_APP_BASE_URL || "http://localhost:9000"


export const signup = (data, history) => {
    return async (dispatch) => {
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json"
                }
            }
            cogoToast.loading('Registering....')
            const response = await axios.post(`/api/route/user/register`, config, data);
            if (response) {
                await dispatch({ type: userActionTypes.SIGN_UP_SUCESS, payload: response.data });
                cogoToast.success('Register successfully');
                history.push('/')
            }
        } catch (error) {
            console.log(error.message)
            if (error.response) {
                await dispatch({ type: userActionTypes.SIGN_UP_FAIL, payload: error.response.data })
                cogoToast.error(`${error.response.data.msg}`)
            }
        }
    }
};

export const signin = (data, history) => {
    return async (dispatch) => {

        try {
            const config = {
                headers: {
                    "Content-Type": "application/json"
                }
            };
            const response = await axios.post(`/api/route/user/login`, data, config);
            if (response) {
                await dispatch({ type: userActionTypes.LOG_IN_SUCCESS, payload: response.data });
                await localStorage.setItem('authToken', response.data.jwtToken);
                await cogoToast.success('sign in success', { position: 'bottom-right' });
                history.push(Routes.Dashboard);

            }
        } catch (error) {
            if (error.response) {
                await dispatch({ type: userActionTypes.LOG_IN_FAIL, payload: error.response.data });
                cogoToast.error(`${error.response.data.msg}`)
            }
        }
    }
};

export const loaduser = (history) => {

    return async (dispatch) => {
        const token = localStorage.getItem('authToken');

        try {
            if (token) { setToken(token) }
            const response = await axios.get("/api/route/user/getUser");
            if (response) {
                await dispatch({ type: userActionTypes.LOAD_USER_SUCCESS, payload: response.data.user[0] })

            }
        } catch (error) {
            if (error.response) {
                await dispatch({ type: userActionTypes.LOAD_USER_FAIL, payload: error.response.data })
                cogoToast.warn(`${error.response.data.msg}`, { position: "top-right" });
                if (error.response.data.msg === "jwt expired" || error.response.data.msg === `you're not authorised`) {
                    history.push('/')
                    localStorage.removeItem('authToken');
                    cogoToast.info('session expired');
                }
            }

        }
    }
};

export const LogOut = (history) => {
    return async (dispatch) => {
        try {
            await localStorage.removeItem('authToken');
            dispatch({ type: userActionTypes.LOG_OUT_SUCCESS, payload: "sign out sucessful" })
            history.push(Routes.Login);
            cogoToast.success('Sign out success');
        } catch (error) {
            console.log(error.message)
            dispatch({ type: userActionTypes.LOG_OUT_FAIL, payload: error.message })
        }
    }
}