import React, { useState, useEffect, Fragment } from 'react'
import { useSelector } from 'react-redux';
import './style.scss';
import cogoToast from 'cogo-toast';
import Avatar from '../../assets/default-avatar.png';
import Loader from '../Loader';

function EditProFileForm() {

    const user = useSelector(({ user }) => user.currentUser);
    const [name, setName] = useState('');
    const [username, setUsername] = useState('')
    const [bio, setBio] = useState('')
    const [email, setEmail] = useState('');
    const [profileImg, setProfileImg] = useState(null)
    const [isLoading, setIsLoading] = useState(false)


    useEffect(() => {
        document.title = 'Edit Profile • Photoshare';
    }, []);

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            setIsLoading(true)
            await cogoToast.info('button has been clicked')
            setIsLoading(false)
        } catch (error) {
            throw new Error('something went wrong')
        }

    }

    return (
        <div className="Edit__profile__form__wrapper">

            <form action="" className="Edit_profile_form" onSubmit={handleFormSubmit}>
                <div className="profile__header">
                    <img src={user ? user.avatar : Avatar} alt="" />

                    <div className="profile__avatar__wrapper">
                        <h4> {user && user.username}</h4>
                        <input
                            id="avatar-upload"
                            type="file" accept="image/*"
                            style={{ display: "none" }}
                            onChange={(e) => setProfileImg(e.target.files[0])}
                        />
                        <label className="change__photo__link" htmlFor="avatar-upload">Change Profile Photo</label>
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
