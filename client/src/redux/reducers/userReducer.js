import { userTypes } from '../actions/user/user.types';


const initState = {

    // token: '',
    currentUser: null,
    isAuthenticated: false,
    errors: {
        signup: '',
        login: '',
        logout: '',
        loadUser: ''
    }

}

const userReducer = (state = initState, action) => {

    switch (action.type) {
        case userTypes.SIGN_UP_SUCCESS:
            return {
                ...state,
                isAuthenticated: false

            };
        case userTypes.SIGN_UP_FAIL:
            return {
                ...state,
                isAuthenticated: false,
                currentUser: null,
                error: {
                    signup: action.payload
                }
            }
        case userTypes.SIGN_IN_SUCCESS:
            return {
                ...state,
                isAuthenticated: true,

            };
        case userTypes.SIGN_IN_FAIL:
            return {
                ...state,
                error: {
                    login: action.payload
                }
            };
        case userTypes.LOG_OUT_FAIL:
            return {
                ...state,
                error: {
                    logout: action.payload
                }
            };
        case userTypes.LOG_OUT_SUCCESS:
            return {
                ...state,
                currentUser: null,
                isAuthenticated: false
            };
        case userTypes.LOAD_USER_FAILURE:
            return {
                ...state,
                isAuthenticated: false,


                error: {
                    loadUser: action.payload
                }
            }
        case userTypes.LOAD_USER_SUCCESS:
            return {
                ...state,
                currentUser: action.payload,
                isAuthenticated: true
            }
        default:
            return state;
    }
}
export default userReducer;