import axios from 'axios';

const setToken = async (token) => {
    axios.defaults.headers.common['x-auth-token'] = '';
    if (token) {
        axios.defaults.headers.common['x-auth-token'] = token
    } else {
        delete axios.defaults.headers.common['x-auth-token'];
    }

};

export default setToken