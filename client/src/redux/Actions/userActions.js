import { userActionTypes } from '../Constants/userConstants';
import { setToken } from '../../utils'

import axios from 'axios';
import cogoToast from 'cogo-toast';

const baseUrl = "http://localhost:9000"

export const signup = (data, history) => {
    return async (dispatch) => {
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json"
                }
            }
            cogoToast.loading('Registering....')
            const response = await axios.post(`${baseUrl}/api/route/user/register`, config, data);
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

export const signin = (data) => {
    return async (dispatch) => {
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json"
                }
            };
            const response = await axios.post(`${baseUrl}/api/route/user/login`, data, config);
            if (response) {
                await dispatch({ type: userActionTypes.LOG_IN_SUCCESS, payload: response.data });
                await localStorage.setItem('authToken', response.data.jwtToken);
            }
        } catch (error) {
            if (error.response) {
                await dispatch({ type: userActionTypes.LOG_IN_FAIL, payload: error.response.data });
            }
        }
    }
};

export const loaduser = () => {
    return async (dispatch) => {
        setToken(localStorage.getItem('authToken'));
        try {
            const response = await axios.get("http://localhost:9000/api/route/user/getUser");
            if (response) {
                console.log(response.headers)
                await dispatch({ type: userActionTypes.LOAD_USER_SUCCESS, payload: response.data.user })
            }
        } catch (error) {
            if (error.response) {
                await dispatch({ type: userActionTypes.LOAD_USER_FAIL, payload: error.response.data })
            }
        }
    }
}