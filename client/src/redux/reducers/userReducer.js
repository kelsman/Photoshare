import { userTypes } from '../actions/user/user.types';


const initState = {

    // token: '',
    user: null,
    isAuthenticated: false,
    errors: {
        signup: '',
        login: '',
        logout: ''
    }

}

const userReducer = (state = initState, action) => {

    switch (action.type) {
        case userTypes.SIGN_UP_SUCCESS:
            return {
                ...state
            };
        case userTypes.SIGN_UP_FAIL:
            return {
                ...state,
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
        case userTypes.LOG_OUT_SUCESS:
            return {
                ...state
            }
        default:
            return state;
    }
}
export default userReducer;