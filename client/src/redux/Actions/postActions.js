import * as postActionTypes from '../Constants/postConstants';
import { setToken } from '../../utils'


import axios from 'axios';
import cogoToast from 'cogo-toast';
import * as Routes from '../../component/routes';

const token = localStorage.getItem('authToken');

const baseUrl = process.env.REACT_APP_BASE_URL || "http://localhost:9000"



//  load explore posts 
export const getPosts = (history) => {
    return async (dispatch) => {
        const token = localStorage.getItem('authToken')
        try {
            if (token) {
                await setToken(token)
            };
            const response = await axios.get(`/api/route/post/allPosts`);
            if (response) {
                dispatch({ type: postActionTypes.GET_POSTS_SUCCESS, payload: response.data.posts })
                // console.log(response.data.msg);
            };

        } catch (error) {
            if (error.response) {
                console.log(error.response.data)
                await dispatch({ type: postActionTypes.GET_POSTS_FAIL, payload: error.response.data })
                if (error.response.data.msg === "jwt expired" || error.response.data.msg === `you're not authorised`) {
                    localStorage.removeItem('authToken');
                    history.push('/')
                }
                // cogoToast.error(`${error.response.data.msg}`, { position: "top-right" })
            }
        }

    }
}

//  @comment on a post with a given post id passed as a param to the url
export const commentPost = (postId, commentText, socket, history) => {
    return async (dispatch) => {
        if (token) {
            await setToken(token)
        };

        try {
            const config = {
                headers: {
                    "Content-Type": "application/json"
                }
            }
            const response = await axios.post(`/api/route/post/comment/${postId}`, { commentText });
            if (response) {
                socket.on('addComment', (data) => {
                    dispatch({ type: postActionTypes.COMMENT_POST_SUCCESS, payload: data })

                })
                console.log(response.data);
            };

        } catch (error) {
            if (error.response) {
                console.log(error.response.data)
                await dispatch({ type: postActionTypes.COMMENT_POST_FAIL, payload: error.response.data.msg })
                if (error.response.data.msg === "jwt expired" || error.response.data.msg === `you're not authorised`) {
                    localStorage.removeItem('authToken');
                    history.push('/')
                }
                // cogoToast.error(`${error.response.data.msg}`, { position: "top-right" })
            }
        }
    }
}

export const getSinglePost = (postId, history) => {

    return async (dispatch) => {

        if (token) {
            await setToken(token)
        };
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }
        try {
            const response = await axios.get(`/api/route/post/singlePost/${postId}`, config)
            if (response) {
                dispatch({ type: postActionTypes.GET_SINGLE_POST_SUCCESS, payload: response.data.msg })
                // console.log(response.data.msg);
            };

        } catch (error) {
            if (error.response) {
                console.log(error.response.data)
                await dispatch({ type: postActionTypes.GET_SINGLE_POST_FAIL, payload: error.response.data.msg })
                if (error.response.data.msg === "jwt expired" || error.response.data.msg === `you're not authorised`) {
                    localStorage.removeItem('authToken');
                    history.push('/');

                }
            }
        }
    }
}

//  like a post 

export const likePost = (postId, socket, history) => {

    return async (dispatch) => {

        const token = localStorage.getItem('authToken');

        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }
        if (token) {
            await setToken(token)
        };
        try {
            const response = await axios.put(`/api/route/post/likePost/${postId}`, config);
            if (response) {
                socket.on('likePost', (data) => {
                    dispatch({ type: postActionTypes.LIKE_POST_SUCCESS, payload: data })
                });
                console.log(response.data);
            }
        } catch (error) {
            if (error.response) {
                console.log(error.response.data)
                await dispatch({ type: postActionTypes.LIKE_POST_FAIL, payload: error.response.data.msg })
                cogoToast.info(`${error.response.data.msg}`, { position: 'top-center' })
                if (error.response.data.msg === "jwt expired" || error.response.data.msg === `you're not authorised`) {
                    localStorage.removeItem('authToken');
                    history.push('/');
                }

            }

        }

    }

}
//  unlike a post function

export const unLikePost = (postId, socket, history) => {
    return async (dispatch) => {

        const token = localStorage.getItem('authToken');

        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }
        if (token) {
            await setToken(token)
        };
        try {
            const response = await axios.put(`/api/route/post/unlikePost/${postId}`, config);
            if (response) {
                socket.on('unlikePost', (data) => {
                    dispatch({ type: postActionTypes.UNLIKE_POST_SUCCESS, payload: data })
                });
                console.log(response.data);
            }
        } catch (error) {
            if (error.response) {
                console.log(error.response.data)

                await dispatch({ type: postActionTypes.UNLIKE_POST_FAIL, payload: error.response.data.msg })
                cogoToast.error(`${error.response.data.msg}`, { position: 'top-right' })
                if (error.response.data.msg === "jwt expired" || error.response.data.msg === `you're not authorised`) {
                    localStorage.removeItem('authToken');
                    history.push('/');
                }
            }

        }

    }
}