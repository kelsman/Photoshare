import * as postActionTypes from '../Constants/postConstants'

const initState = {
    isLoading: true,
    post: [],
    posts: null,
    myposts: [],
    error: {
        getError: '',
        postError: '',
        commentError: '',
        likeError: '',
    }
};


const postReducer = (state = initState, { type, payload }) => {

    switch (type) {
        case postActionTypes.GET_POSTS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                posts: payload
            }
        case postActionTypes.GET_POSTS_FAIL:
            return {
                ...state,
                isLoading: false,
                error: {
                    getError: payload
                }
            };
        case postActionTypes.CREATE_POST_SUCCESS:
            return {
                ...state,
                isLoading: false,
                post: [payload, ...state.post]
            };
        case postActionTypes.CREATE_POST_FAIL:

            return {
                ...state,
                isLoading: false,
                error: {
                    getError: payload
                }
            }
        case postActionTypes.LIKE_POST_SUCCESS:
            return {
                ...state,
                isLoading: false
            }
        case postActionTypes.LIKE_POST_FAIL:
            return {
                ...state,
                isLoading: false,
                error: {
                    likeError: payload
                }
            }
        case postActionTypes.COMMENT_POST_SUCCESS:
            return {
                ...state,
                isLoading: false
            }
        case postActionTypes.COMMENT_POST_FAIL:
            return {
                ...state,
                isLoading: false,
                error: {
                    commentError: payload
                }
            }
        default:
            return state;


    }
};

export default postReducer;