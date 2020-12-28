import { combineReducers } from 'redux';
import userReducer from './userReducer'
import postReducer from './posts/postReducer';
export const rootReducer = combineReducers({
    user: userReducer,
    post: postReducer
})