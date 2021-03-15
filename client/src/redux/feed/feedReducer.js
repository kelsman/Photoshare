import feedTypes from './feedTypes';
import * as postActionTypes from '../Constants/postConstants'
const initState = {
    posts: null,
    fetching: true,
    error: false,
    hasMore: false,
};

const feedReducer = (state = initState, { type, payload }) => {

    switch (type) {
        case feedTypes.FETCH_POSTS_SUCCESS:
            return {
                ...state,
                error: false,
                fetching: false,
                posts: payload
            }

        case feedTypes.FETCH_POSTS_FAILURE:
            return {
                ...state,
                fetching: false,
                error: true
            }
        case postActionTypes.DELETE_COMMENT_SUCCESS:


            return {
                ...state,
                posts: state.posts.map((post) => {
                    return post._id === payload._post ? { ...post, comments: payload.comments } : post
                })
            }
        case postActionTypes.COMMENT_POST_SUCCESS:
            return {
                ...state,
                posts: state.posts.map((post) => {
                    return post._id === payload._post ? { ...post, comments: payload.comments } : post
                })
            }
        case postActionTypes.LIKE_POST_SUCCESS:
            return {
                ...state,
                posts: state.posts.map((post) => {
                    return post._id === payload._post ? { ...post, likes: payload.likes } : post
                })
            }
        default:
            return state;
    }
}

export default feedReducer;