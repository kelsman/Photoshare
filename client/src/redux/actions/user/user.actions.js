import { userTypes } from './user.types';
import axios from 'axios';
import setToken from '../../utils';

const url = "http://localhost:8000"

export const signUp = (formData, history) => {
    return async (dispatch) => {

        try {
            const res = await axios.post(url + '/api/route/user/signup', formData);
            console.log(res.data);
            dispatch({ type: userTypes.SIGN_UP_SUCCESS, payload: res.data });
            history.push('/')
        } catch (err) {
            console.error(err.message);
            dispatch({ type: userTypes.SIGN_UP_FAIL, payload: err.message });
        }
    }
};

export const signIn = (formData, history) => {
    return async (dispatch) => {
        try {

            const res = await axios.post(url + '/api/route/user/login', formData);

            await localStorage.setItem("authToken", res.data.token);
            if (JSON.stringify(localStorage.getItem('authToken'))) {
                setToken(localStorage.getItem('authToken'))
            }
            dispatch({ type: userTypes.SIGN_IN_SUCCESS });
            history.push('/user/dashboard');
        } catch (err) {
            console.log(err);
            dispatch({ type: userTypes.SIGN_IN_FAIL, paylaod: err.message });
        }

    }


}
export const logOut = () => {
    return async (dispatch) => {

        try {
            await localStorage.removeItem('authToken');
            dispatch({ type: userTypes.LOG_OUT_SUCCESS });
        } catch (err) {
            console.log(err.message);
            dispatch({ type: userTypes.LOG_OUT_FAIL, payload: err })
        }
    }
};

export const loadUser = () => {

}