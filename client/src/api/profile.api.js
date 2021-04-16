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

export const changeAvatar = async (file) => {
    try {
        if (localStorage.authToken) {
            setToken(localStorage.authToken)
        }
        const config = {
            header: {
                "Content-Type": "multipart/form-data"
            }
        }
        const { data } = await axios.put(`${baseUrl}/api/route/profile/change-avatar`, file, config)
        cogoToast.success(`${data.msg}`)
    } catch (error) {
        console.log(error)
    }
}

export const editProfile = async (info) => {

    try {
        if (localStorage.authToken) {
            setToken(localStorage.authToken)
        }
        const config = {
            header: {
                "Content-Type": "application/json"
            }
        }
        const { data } = await axios.put(`${baseUrl}/api/route/profile/edit-profile`, info, config)
        cogoToast.success(`${data.msg}`)
    } catch (error) {
        console.log(error)
    }
}

export const forgetPassword = async (data) => {
    const config = {
        header: {
            "Content-Type": "application/json"
        }
    }
    try {
        const res = await axios.post(`${baseUrl}/api/route/user/forgetpassword`, data, config)
        cogoToast.success('Email Sent')
    } catch (error) {
        console.log(error.message)
    }
}

export const resetPassword = async (resetToken, data) => {
    const config = {
        header: {
            "Content-Type": "application/json"
        }
    }
    try {
        const res = await axios.put(`${baseUrl}/api/route/user/resetpassword/${resetToken}`, data, config)
        if (res) {
            cogoToast.success(`${res.data.msg}`)

        }
    } catch (error) {
        if (error.response) {
            cogoToast.error(`${error.response.data.msg}`)
        }
        console.log(error)
    }

}

export const changePassword = async (data) => {
    const config = {
        header: {
            "Content-Type": "application/json"
        }
    }
    try {
        const res = await axios.put(`${baseUrl}/api/route/profile/changePassword/`, data, config)
        cogoToast.success(`${res.data.msg}`)
    } catch (error) {
        if (error.response) {
            cogoToast.error(`${error.response.data.msg}`)
        }
        console.log(error)
    }
}