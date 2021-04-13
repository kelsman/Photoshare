import React, { useState, useEffect, Fragment } from 'react'
import { useSelector } from 'react-redux';
import './style.scss';
import cogoToast from 'cogo-toast';
import Avatar from '../../assets/default-avatar.png';
import Loader from '../Loader';
import { changeAvatar, editProfile } from '../../api/profile.api';
import { useMutation, useQueryClient } from 'react-query'
import LoaderSpinner from '../LoaderSpinner';

function EditProFileForm() {

    const user = useSelector(({ user }) => user.currentUser);
    const [name, setName] = useState('');
    const [username, setUsername] = useState('')
    const [bio, setBio] = useState('')
    const [email, setEmail] = useState('');
    const [profileImg, setProfileImg] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    const queryClient = useQueryClient()
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
        try {
            await setProfileImg(event.target.files[0]);
            if (profileImg) {
                const data = new FormData;
                await data.append('avatar', profileImg)
                await mutateAsync(data)
            }

        } catch (error) {
            console.log(error)
        }
    }


    return (
        <div className="Edit__profile__form__wrapper">

            <form action="" className="Edit_profile_form" onSubmit={(e) => { e.preventDefault(); handleFormSubmit() }}>
                <div className="profile__header">
                    <div className="avatar__container">
                        <img src={user ? user.avatar : Avatar} alt="avatar" />
                        {changingAvatar && <Loader />}
                    </div>
                    <div className="profile__avatar__wrapper">
                        <h4> {user && user.username}</h4>
                        <input
                            id="avatar"
                            type="file" accept="image/*"
                            style={{ display: "none" }}
                            onChange={handleAvatarChange}
                        />
                        <label className="change__photo__link" htmlFor="avatar">Change Profile Photo</label>
                    </div>


                </div>
                <div className="label__wraper">
                    <label>Name</label>
                    <input
                        id="name"
                        type="text"
                        name="name"
                        placeholder={'Name'}
                        value={user && user.name ? user.name : name}
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
                        value={user && user.username ? user.username : username}
                        onChange={(e) => setUsername(e.target.value)}
                    />

                </div>
                <div className="label__wraper">
                    <label >Bio</label>
                    <input
                        id="bio"
                        name="bio"
                        placeholder={'Bio'}
                        value={user && user.bio ? user.bio : bio}
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
                        value={user && user.email ? user.email : email}
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
