import { combineReducers } from 'redux';
import userReducer from "./Reducers/userReducer";

export const rootReducer = combineReducers({
    user: userReducer,
});

