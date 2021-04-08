import React from 'react'
import './style.scss';
import * as Icon from 'react-feather';
import NewPostButton from '../../../component/NewPost/NewPostButton';

const EmptyProfile = () => {

    return (
        <div className="empty-profile-container">
            no posts to show
            <Icon.Camera size={30} />
            <NewPostButton iconName="Share Post" style={{ color: "#0095f6" }} />
            <p>When you share Photos they will appear on your profile</p>
        </div>
    )
}

export default EmptyProfile;