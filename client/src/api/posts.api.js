import axios from 'axios';
import { setToken } from '../utils';
import cogoToast from 'cogo-toast'
const token = localStorage.getItem('authToken');

if (token) {
    setToken(token);
}


//  fetch single post 

export const fetchSinglePost = async (postId, history) => {

    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    const response = await axios.get(`/api/route/post/singlePost/${postId}`, config);
    const userpost = response.data.post[0]
    return userpost

}
// like and unlike post 
export const likePost = async (postId, history) => {

    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };
    try {
        const response = await axios.put(`/api/route/post/likePost/${postId}`, config);
        return response.data.msg

    } catch (error) {
        if (error.response) {
            const msg = error.response.msg
            cogoToast.error(`${error.message}`)
        }
    }



};

// @comment post 
export const CommentPost = async (postId, commentText) => {

    const config = {
        headers: {
            'Content-Type': 'application/json',
        }
    }
    try {
        const res = await axios.post(`/api/route/post/comment/${postId}`, { commentText });
        console.log(res.data)
        return res.data

    } catch (error) {
        console.log(error.message)
    }

}

//  delete a comment on a post 

export const deleteComment = async (postid, commentid) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        }
    }
    try {
        const res = await axios.put(
            `/api/route/post/deleteComment/${postid}/${commentid}`,
            config)

        return res.data;
    } catch (error) {
        console.log(error.response.message)
    }
}

export const retrieveFeedPosts = async (history) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };
    try {
        const res = await axios.get(`api/route/post/retrieveFeedPosts`, config);
        return res.data.posts

    } catch (error) {
        if (error.response) {
            console.log(error.response.data);

            cogoToast.info(`${error.response.data.msg}`, { position: 'top-center' });
            if (
                error.response.data.msg === 'jwt expired' ||
                error.response.data.msg === `you're not authorised`
            ) {
                history.push('/');
                localStorage.removeItem('authToken');
            }
        }
    }
};
