import { PostTypes } from '../../actions/post/post.types';
import axios from 'axios'
import setToken from '../../utils';
import { toast } from 'react-toastify';

/**
 * @description getall posts
 */
export const getposts = () => {
    return async (dispatch) => {
        try {

            const CancelToken = axios.CancelToken;
            const source = CancelToken.source();
            const res = await axios.get('/api/route/post/allposts', {
                source
            });

            dispatch({ type: PostTypes.GET_POSTS, payload: res.data })
        } catch (err) {

            if (err) {
                dispatch({
                    type: PostTypes.POST_ERROR, payload: {
                        msg: err.response.msg,
                        status: err.response.status
                    }
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

            const res = await axios.post('/api/route/post', formData, config);
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

            const res = await axios.put(`/api/route/post/like/:${id}`);
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
            const res = axios.put(`/api/route/post/unlike/:${id}`);
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
        };
        try {
            const res = await axios.put(`/api/route/post/comment/${id}`, formData, config);
            dispatch({ type: PostTypes.ADD_COMMENT, payload: res.data })

        } catch (err) {
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
 * @description Remove a comment
 */
export const deleteComment = (postId, commentId) => {
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
            const res = await axios.delete(`/api/route/post/comment/${postId}/${commentId}}`, config);
            dispatch({ type: PostTypes.REMOVE_COMMENT, paylad: res.data })
        } catch (err) {

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

            const res = await axios.get(`/api/route/post/${id}`, config);

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
            await axios.delete(`/api/route/post/${id}`, config);

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