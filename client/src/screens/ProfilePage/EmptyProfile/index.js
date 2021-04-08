import React from 'react'
import './style.scss';
import * as Icon from 'react-feather';

const EmptyProfile = () => {

    return (
        <div className="empty-profile-container">
            no posts to show
            <Icon.Camera size={30} />
            <h1>Share Photos</h1>
            <p>When you share Photos they will appear on your profile</p>
        </div>
    )
}

export default EmptyProfile;