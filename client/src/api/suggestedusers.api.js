import axios from 'axios';
import { setToken } from '../utils';
import cogoToast from 'cogo-toast';
import * as Routes from '../component/routes';
const baseUrl = process.env.REACT_APP_BASE_URL
const token = localStorage.getItem('authToken');


export const getSuggestedUsers = async () => {
    if (token) {
        setToken(token)
    }
    try {
        const res = await axios.get(`${baseUrl}/api/route/user/suggestedUsers`);
        if (res)
            return res.data
    } catch (error) {
        console.log(error.message)
    }
}