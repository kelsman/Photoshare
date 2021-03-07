import { combineReducers } from 'redux';
import postReducer from './Reducers/postReducer';
import userReducer from "./Reducers/userReducer";
import socketReducer from './Socket/socketReducer'
const rootReducer = combineReducers({
    user: userReducer,
    post: postReducer,
    socket: socketReducer,
});

export default rootReducer;
