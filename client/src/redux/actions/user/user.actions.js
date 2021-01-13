import { userTypes } from './user.types';
import axios from 'axios';
import setToken from '../../utils';
import { toast } from "react-toastify";





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

            await dispatch({ type: userTypes.SIGN_IN_SUCCESS });
            await localStorage.setItem("authToken", res.data.token);

            const { authToken } = localStorage;
            if (authToken) {
                setToken(authToken);
            }

            await toast.success("Log in Successful");

            setTimeout(() => {
                history.push('/userFeeds');
            }, 1500)

        } catch (err) {
            console.log(err);
            dispatch({ type: userTypes.SIGN_IN_FAIL, paylaod: err.message });
            toast.error(`${err.response.data.msg}`);
        }

    }


}
export const LogOut = (history) => {

    return async (dispatch) => {

        try {
            await history.push('/')
            await localStorage.removeItem('authToken');
            await dispatch({ type: userTypes.LOG_OUT_SUCCESS });
            await toast.success('sign out succesful');
        } catch (err) {
            console.log(err.message);
            dispatch({ type: userTypes.LOG_OUT_FAIL, payload: err })
        }
    }
};

export const loadUser = (setUser) => {
    return async (dispatch) => {
        try {
            const { authToken } = localStorage;
            if (authToken) {
                setToken(authToken);
            }

            const res = await axios.get(url + '/api/route/user/userInfo'

            );
            await dispatch({ type: userTypes.LOAD_USER_SUCCESS, payload: res.data });
            setUser(false)

        } catch (err) {
            console.log(err.message);
            dispatch({ type: userTypes.LOAD_USER_FAILURE, payload: err.response.data.msg });

        }
    }
}