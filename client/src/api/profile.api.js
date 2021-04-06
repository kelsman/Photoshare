import axios from 'axios';
import { setToken } from '../utils';
import cogoToast from 'cogo-toast';

const baseUrl = process.env.REACT_APP_BASE_URL;



export const getProfile = async (username) => {

    if (localStorage.getItem('authToken')) {
        setToken(localStorage.getItem('authToken'))
    }
    const config = {
        header: {
            'Content-Type': 'application/json'
        }
    }
    try {
        const { data } = await axios.get(`${baseUrl}/api/route/user/userprofile/${username}`, config);
        return data.userProfile[0]
    } catch (error) {
        if (error.response) {
            console.log(error.message)
            if (
                error.response.data.msg === 'jwt expired' ||
                error.response.data.msg === `you're not authorised`
            ) {
                cogoToast.info('session expired');
                localStorage.removeItem('authToken');
                window.location.assign('/')
            }
        }
    }

};