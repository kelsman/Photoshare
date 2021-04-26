import axios from 'axios';
import { setToken } from '../utils';
import cogoToast from 'cogo-toast';
import * as Routes from '../component/routes';
const baseUrl = process.env.REACT_APP_BASE_URL
const token = localStorage.getItem('authToken');



// create a post 

export const createPost = async (data, history) => {
    if (token) {
        setToken(token);
    }
    const config = {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    };
    try {
        const res = await axios.post(`${baseUrl}/api/route/post/createPost`, data, config);
        if (res) {
            console.log('post created')
            history.push(Routes.Dashboard);
        }
    } catch (error) {
        console.log(error.messge)
        if (
            error.response.data.msg === 'jwt expired' ||
            error.response.data.msg === `you're not authorised`
        ) {
            history.push('/');
            localStorage.removeItem('authToken');
            cogoToast.info('session expired');
        }
    }
}




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

export const retrieveFeedPosts = async ({ pageParam: offset = 0 }) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };
    if (token) {
        setToken(token);
    }
    try {
        const res = await axios.get(`${baseUrl}/api/route/post/retrieveFeedPosts/?offset=${offset}`, config);


        return {
            posts: res.data.posts,
            next: res.data.next === null ? false : res.data.next
        }


    } catch (error) {
        if (error.response) {
            console.log(error.response.data);

            cogoToast.info(`${error.message}`, { position: 'top-center' });
            if (
                error.response.data.msg === 'jwt expired' ||
                error.response.data.msg === `you're not authorised`
            ) {
                window.location.replace('/');
                localStorage.removeItem('authToken');
            }
        }
    }
};

export const deletePost = async (postId) => {

    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };
    if (token) {
        setToken(token);
    }
    try {
        const res = await axios.delete(`${baseUrl}/api/route/post/deletePost/${postId}`, config)
        if (res) {
            console.log(res.data.msg)
        }
    } catch (error) {
        console.log(error.message)
    }

}