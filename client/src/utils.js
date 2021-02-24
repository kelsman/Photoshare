import axios from 'axios'

export const setToken = (token) => {
    if (token) {
        axios.defaults.headers.common['x-auth-token'] = token;
    } else {
        axios.defaults.haeders.common['x-auth-token'] = null
    }
};