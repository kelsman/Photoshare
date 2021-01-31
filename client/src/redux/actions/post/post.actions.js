import { PostTypes } from '../../actions/post/post.types';
import axios from 'axios'
import setToken from '../../utils';
import { toast } from 'react-toastify';

import cogoToast from 'cogo-toast';
import Pusher from 'pusher-js'

const pusher = new Pusher(process.env.REACT_APP_PUSHER_KEY, {
    encoded: true,
    cluster: 'mt1'
});
const channel = pusher.subscribe('flash-comments')

const url = "http://localhost:8000"

/**
 * @description getall posts
 */
export const getposts = () => {
    return async (dispatch) => {
        try {

            const CancelToken = axios.CancelToken;
            const source = CancelToken.source();
            const res = await axios.get(`${url}/api/route/post/allposts`, {
                source
            });

            dispatch({ type: PostTypes.GET_POSTS, payload: res.data })
        } catch (err) {

            if (err) {
                dispatch({
                    type: PostTypes.POST_ERROR, payload: err
                })
            }
        }
    }
};

/**
 * @description Add Post
 */
export const createPost = (formData) => {
    return async (dispatch) => {

        const { authToken } = localStorage;
        if (authToken) {
            setToken(authToken);
        }

        try {
            const config = {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "multipart/form-data"
                }
            }

            const res = await axios.post(`${url}/api/route/post`, formData, config);
            await dispatch({ type: PostTypes.ADD_POST, payload: res.data });

            toast.success('success', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,

            });





        } catch (err) {
            if (err) {
                dispatch({
                    type: PostTypes.POST_ERROR,
                    payload: {
                        msg: err.message
                    },
                });
            }
        }
    }
};

/**
 * @description like a post 
 */

export const addLike = (id) => {
    return async (dispatch) => {
        try {
            const { authToken } = localStorage;
            if (authToken) {
                await setToken(authToken);
            };

            const res = await axios.put(`${url}/api/route/post/like/:${id}`);
            dispatch({
                type: PostTypes.UPDATE_LIKES, payload: {
                    id, likes: res.data
                }
            })
        } catch (err) {
            if (err) {
                dispatch({
                    type: PostTypes.POST_ERROR,
                    payload: {
                        msg:
                            err.response.statusText +
                            " - UPDATE_LIKES error - addLike" +
                            " " +
                            (id && id),
                        status: err.response.status,
                    },
                })
            }
        }
    }
};

/**
 * @description remove like
 */

export const removeLike = (id) => {
    return async (dispatch) => {
        try {
            const { authToken } = localStorage;
            if (authToken) {
                await setToken(authToken);
            };
            const res = axios.put(`${url}/api/route/post/unlike/:${id}`);
            dispatch({
                type: PostTypes.UPDATE_LIKES, payload: {
                    id, likes: res.data
                }
            });
        } catch (err) {
            if (err) {
                dispatch({
                    type: PostTypes.POST_ERROR,
                    payload: {
                        msg: err.response.statusText + " - UPDATE_LIKES error - removeLike",
                        status: err.response.status,
                    },
                });
            }
        }
    }
};

/**
 * @description Add comment
 */


export const addComment = (id, formData) => {
    return async (dispatch) => {
        const { authToken } = localStorage;
        if (authToken) {
            await setToken(authToken);
        };
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
            params: {
                id
            }
        };
        try {
            cogoToast.loading('adding comment')
            const res = await axios.post(`${url}/api/route/post/comment/${id}`, formData, config);
            const data = await res.data;
            channel.bind('new-comment', function (data) {
                alert('An event was triggered with message: ' + data.message);
            });

            dispatch({ type: PostTypes.ADD_COMMENT, payload: data })
            cogoToast.success('comment added');
        } catch (err) {
            cogoToast.error(`${err.message}`);
            dispatch({
                type: PostTypes.POST_ERROR,
                payload: {
                    msg: err.response.statusText + " - ADD_COMMENT error - addComment",
                    status: err.response.status,
                },
            });
        }
    }
};
/**
 * @description GET COMMENTS
 */

export const getComments = () => {
    return async (dispatch) => {
        const { authToken } = localStorage;
        if (authToken) {
            await setToken(authToken);
        };

        try {

            const res = await axios.get(`${url}/api/route/post/comments/all-comments`);
            dispatch({ type: PostTypes.GET_COMMENTS, payload: res.data })
        } catch (error) {
            console.log(error);
        }
    }
}
/**
 * @description Get User post
 */

export const post = (id) => {
    return async (dispatch) => {

        const { authToken } = localStorage;
        if (authToken) {
            await setToken(authToken);
        };
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        try {

            const res = await axios.get(`{url}/api/route/post/${id}`, config);

            dispatch({
                type: PostTypes.GET_POST,
                payload: res.data,
            });
        } catch (err) {

            dispatch({
                type: PostTypes.POST_ERROR,
                payload: {
                    msg:
                        err.response.statusText +
                        " - GET_POST error - getPost - " +
                        "Post Id: " +
                        id,
                    status: err.response.status,
                },
            });
        }
    }
}

/**
 * @description delete User post by Id
 */


export const deletePost = (id) => {
    return async (dispatch) => {

        const { authToken } = localStorage;
        if (authToken) {
            await setToken(authToken);
        };
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        try {
            await axios.delete(`{url}/api/route/post/${id}`, config);

            dispatch({
                type: PostTypes.DELETE_POST,
                payload: id,
            });


        } catch (err) {
            dispatch({
                type: PostTypes.POST_ERROR, payload: {
                    msg: err.response.statusText + " - DELETE_POST error - deletePost",
                    status: err.response.status,
                }
            })
        }
    }
}