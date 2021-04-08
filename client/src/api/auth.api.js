import axios from 'axios';
import { setToken } from '../utils';
import cogoToast from 'cogo-toast';
import * as Routes from '../component/routes';
const baseUrl = process.env.REACT_APP_BASE_URL
const token = localStorage.getItem('authToken');




export const loadUser = async (history) => {

    if (token) {
        setToken(token);
    }
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };
    try {
        const res = await axios.get(`${baseUrl}/api/route/user/getUser`, config);
        if (res) {
            return res.data.user[0]
        }
    } catch (error) {
        if (error.response) {

            console.log(error.message)
            if (
                error.response.data.msg === 'jwt expired' ||
                error.response.data.msg === `you're not authorised`
            ) {
                cogoToast.info('session expired');
                localStorage.removeItem('authToken');
            }
        }
    }
}