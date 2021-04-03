import axios from 'axios';
import { setToken } from '../utils';
import cogoToast from 'cogo-toast';

const baseUrl = process.env.REACT_APP_BASE_URL
const token = localStorage.getItem('authToken');





//  fetch single post 

export const fetchSinglePost = async (postId, history) => {

    if (token) {
        setToken(token);
    }

    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    const response = await axios.get(`${baseUrl}/api/route/post/singlePost/${postId}`, config);
    const userpost = response.data.post[0]
    return userpost

}
// like and unlike post 
export const likePost = async (postId, history) => {

    if (token) {
        setToken(token);
    }

    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };
    try {
        const response = await axios.put(`${baseUrl}/api/route/post/likePost/${postId}`, config);
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

    if (token) {
        setToken(token);
    }

    const config = {
        headers: {
            'Content-Type': 'application/json',
        }
    }
    try {
        const res = await axios.post(`${baseUrl}/api/route/post/comment/${postId}`, { commentText }, config);
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
            `${baseUrl}/api/route/post/deleteComment/${postid}/${commentid}`,
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
        const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/route/post/retrieveFeedPosts`, config);
        return res.data.posts

    } catch (error) {
        if (error.response) {
            console.log(error.response.data);

            cogoToast.info(`${error.message}`, { position: 'top-center' });
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
