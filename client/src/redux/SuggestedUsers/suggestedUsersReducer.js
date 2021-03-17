
import { suggestedUserTypes } from './ActionTypes';

const initState = {
    suggestedUsers: null,
}

const suggestedUsersReducer = (state = initState, { type, payload }) => {

    switch (type) {
        case suggestedUserTypes.FETCH_SUGGESTED_USERS_SUCCESS:
            return {
                ...state,
                suggestedUsers: payload

            };
        case suggestedUserTypes.FETCH_SUGGESTED_USERS_FAIL:
            return {
                ...state
            }

        default:
            return state;
    }
}

export default suggestedUsersReducer;