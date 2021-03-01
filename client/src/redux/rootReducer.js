import { combineReducers } from 'redux';
import postReducer from './Reducers/postReducer';
import userReducer from "./Reducers/userReducer";

const rootReducer = combineReducers({
    user: userReducer,
    post: postReducer,
});

export default rootReducer;
