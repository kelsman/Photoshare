import axios from 'axios';
import { setToken } from '../utils';

const token = localStorage.getItem('authToken');

if (token) {
    setToken(token);
}

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