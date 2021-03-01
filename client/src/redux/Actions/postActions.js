import * as postActionTypes from '../Constants/postConstants';
import { setToken } from '../../utils'


import axios from 'axios';
import cogoToast from 'cogo-toast';
import * as Routes from '../../component/routes';

const baseUrl = process.env.REACT_APP_BASE_URL || "http://localhost:9000"

//  load explore posts 
export const getPosts = () => {
    return async (dispatch) => {
        const token = localStorage.getItem('authToken');

        try {
            if (token) {
                setToken(token)
            };

            const response = await axios.get(`${baseUrl}/api/route/post/allPosts`);
            if (response) {
                dispatch({ type: postActionTypes.GET_POSTS_SUCCESS, payload: response.data.posts })
                console.log(response.data);
            };

        } catch (error) {
            if (error.response) {
                console.log(error.message)
                await dispatch({ type: postActionTypes.GET_POSTS_FAIL, payload: error.response.data })
                cogoToast.error(`${error.response.data.msg}`, { position: "top-right" })
            }
        }

    }
}
