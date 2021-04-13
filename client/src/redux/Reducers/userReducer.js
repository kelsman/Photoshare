
import { userActionTypes } from '../Constants/userConstants';

const initState = {
    token: localStorage.getItem('authToken'),
    isLoading: true,
    currentUser: null,
    isAuthenticated: null,
    authError: {
        signInError: "",
        signUpError: "",
        signOutError: '',
        loadUserError: ''
    }
}

const userReducer = (state = initState, { type, payload }) => {

    switch (type) {
        case userActionTypes.LOG_IN_SUCCESS:
            return {
                ...state,
                isLoading: false,
            };
        case userActionTypes.LOG_IN_FAIL:
            return {
                ...state,
                isLoading: false,
                authError: {
                    signInError: payload
                }
            }
        case userActionTypes.SIGN_UP_SUCESS:
            return {
                ...state,
                isLoading: false,
            };
        case userActionTypes.SIGN_UP_FAIL:
            return {
                ...state,
                isLoading: false,
                authError: {
                    signUpError: payload
                }
            };
        case userActionTypes.LOG_OUT_FAIL:
            return {
                ...state,
                isLoading: false,
                authError: {
                    signOutError: payload
                }
            };
        case userActionTypes.LOG_OUT_SUCCESS:
            localStorage.removeItem('authToken')
            return {
                ...state,
                isLoading: false,
                currentUser: null,
                isAuthenticated: false,
            }

        case userActionTypes.LOAD_USER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isAuthenticated: true,
                currentUser: payload

            };
        case userActionTypes.LOAD_USER_FAIL:
            localStorage.removeItem('authToken')
            return {
                ...state,
                isLoading: false,
                isAuthenticated: false,
                token: null,
                authError: {
                    loadUserError: payload
                }
            }
        default:
            return state;
    }
};

export default userReducer;