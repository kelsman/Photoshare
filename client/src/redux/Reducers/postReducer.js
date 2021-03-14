import * as postActionTypes from '../Constants/postConstants'
import { updateComment } from '../Helpers';
const initState = {
    isLoading: true,
    post: null,
    posts: null,
    myposts: [],
    error: {
        getError: '',
        postError: '',
        commentError: '',
        likeError: '',
        deleteCommentError: ''
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

        case postActionTypes.LIKE_POST_SUCCESS:
            return {
                ...state,
                isLoading: false,
                post: {
                    ...state.post,
                    likes: payload.likes
                }
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
                isLoading: false,
                post: {
                    ...state.post,
                    comments: payload.comments
                }
            }
        case postActionTypes.COMMENT_POST_FAIL:
            return {
                ...state,
                isLoading: false,
                error: {
                    commentError: payload
                }
            }

        case postActionTypes.DELETE_COMMENT_SUCCESS:
            return {
                ...state,
                isLoading: false,
                post: {
                    ...state.post,
                    comments: payload.comments
                }
            }

        case postActionTypes.DELETE_COMMENT_FAIL:
            return {
                ...state,
                isLoading: false,
                deleteCommentError: payload
            }


        case postActionTypes.GET_SINGLE_POST_SUCCESS:
            return {
                ...state,
                isLoading: false,
                post: payload
            }
        default:
            return state;


    }
};

export default postReducer;