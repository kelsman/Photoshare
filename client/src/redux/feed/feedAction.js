import { setToken } from '../../utils'

import feedTypes from './feedTypes';

import axios from 'axios';
import cogoToast from 'cogo-toast';
import * as Routes from '../../component/routes';



export const retrieveFeedPostsStart = (history) => async dispatch => {

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

        const response = await axios.get(`api/route/post/retrieveFeedPosts`, config)
        if (response) {
            dispatch({ type: feedTypes.FETCH_POSTS_SUCCESS, payload: response.data.posts })

        }
    } catch (error) {
        if (error.response) {
            console.log(error.response.data)
            await dispatch({ type: feedTypes.FETCH_POSTS_FAILURE, payload: error.response.data.msg })
            cogoToast.info(`${error.response.data.msg}`, { position: 'top-center' })
            if (error.response.data.msg === "jwt expired" || error.response.data.msg === `you're not authorised`) {
                history.push('/');
                localStorage.removeItem('authToken');
            }

        }
    }
}