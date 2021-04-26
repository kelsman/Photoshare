import React, { useState, useEffect, Fragment } from 'react'
import { useSelector } from 'react-redux';
import './style.scss';
import cogoToast from 'cogo-toast';
import Avatar from '../../assets/default-avatar.png';
import Loader from '../Loader';
import { changeAvatar, editProfile } from '../../api/profile.api';
import { useMutation, useQueryClient } from 'react-query';
import { loaduser } from '../../redux/Actions/userActions'
import MobileHeader from '../NavigationHeader/MobileHeader';
import { useDispatch } from 'react-redux';

function EditProFileForm() {
    const user = useSelector(({ user }) => user.currentUser);
    const [name, setName] = useState(user && user.name ? user.name : '');
    const [username, setUsername] = useState(user && user.username ? user.username : '')
    const [bio, setBio] = useState(user && user.bio ? user.bio : '')
    const [email, setEmail] = useState(user && user.email ? user.email : '');
    const [profileImg, setProfileImg] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    const queryClient = useQueryClient();
    const dispatch = useDispatch()
    useEffect(() => {
        document.title = 'Edit Profile • Photoshare';
    }, []);

    const { mutateAsync: editProfileAsync, isLoading: updateProfileLoading } = useMutation(editProfile, {
        onSucces: () => {
            queryClient.invalidateQueries(['profile', `${user.username}`])
        }
    })
    const { mutateAsync, isLoading: changingAvatar } = useMutation(changeAvatar, {

        onSucces: () => {
            queryClient.invalidateQueries(['profile', `${user.username}`])
            dispatch(loaduser())
        }
    })
    const handleFormSubmit = async () => {

        try {
            await editProfileAsync({ name, username, bio, email })
        } catch (error) {
            throw new Error('something went wrong')
        }
    }

    const handleAvatarChange = async (event) => {
        console.log(event.target.files[0])
        await setProfileImg(event.target.files[0])

    }
    const changePicture = async () => {
        const data = new FormData();
        data.append('avatar', profileImg)
        await mutateAsync(data)
        setProfileImg(null)
    }
    if (profileImg) {
        changePicture();
    }

    return (
        <div className="Edit__profile__form__wrapper">
            <MobileHeader backArrow>
                <h5 style={{ textAlign: "center" }}> Edit Profile</h5>
            </MobileHeader>
            <form action="" className="Edit_profile_form" onSubmit={(e) => { e.preventDefault(); handleFormSubmit() }}>
                <div className="profile__header">
                    <div className="avatar__container">
                        <img src={user.avatar ? user.avatar : Avatar} alt="avatar" />
                        {changingAvatar && <Loader />}
                    </div>
                    <div className="profile__avatar__wrapper">
                        <h4> {user && user.username}</h4>
                        <label className="change__photo__link" htmlFor="avatar">Change Profile Photo</label>
                        <input
                            id="avatar"
                            type="file" accept="image/*"
                            style={{ dislay: "none" }}
                            onChange={(event) => {
                                handleAvatarChange(event)
                            }}
                        />
                    </div>


                </div>
                <div className="label__wraper">
                    <label>Name</label>
                    <input
                        id="name"
                        type="text"
                        name="name"
                        placeholder={'Name'}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="label__wraper">
                    <label >Username</label>
                    <input
                        id="username"
                        type="text"
                        name="username"
                        placeholder={'Username'}
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />

                </div>
                <div className="label__wraper">
                    <label >Bio</label>
                    <input
                        id="bio"
                        name="bio"
                        placeholder={'Bio'}
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                    />


                </div>
                <div className="label__wraper">
                    <label>Email</label>
                    <input
                        id="email"
                        type="text"
                        name="email"
                        placeholder={'Email'}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div className="label__wraper">
                    <label></label>
                    <button
                        className="submit__btn"
                        type="submit"
                        style={{ height: "2rem" }}>
                        Submit
                    {isLoading && <Loader />}
                    </button>
                </div>


            </form>

        </div>
    )
}

export default EditProFileForm
