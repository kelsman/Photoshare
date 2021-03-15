import { combineReducers } from 'redux';
import postReducer from './Reducers/postReducer';
import userReducer from "./Reducers/userReducer";
import socketReducer from './Socket/socketReducer'
import feedReducer from './feed/feedReducer'
import modalReducer from './modal/modalReducer'
const rootReducer = combineReducers({
    user: userReducer,
    post: postReducer,
    socket: socketReducer,
    feed: feedReducer,
    modal: modalReducer,
});

export default rootReducer;
