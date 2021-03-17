import React from 'react';
import './style.scss';
import ProfileIcon from '../ProfileIcon'
import './style.scss';

import Avatar from '../../assets/default-avatar.png'




const Profile = (props) => {
    const {
        username,
        caption,
        urlText,
        userId,
        authorUsername,
        iconSize,
        captionSize,
        storyBorder,
        hideAccountName,
        image,
    } = props;

    let accountName = username
        ? username
        : null

    return (


        <div className="profile">
            <ProfileIcon
                iconSize={iconSize}
                storyBorder={storyBorder}
                image={image}
                iconSize="medium"
                authorUsername={authorUsername}

            />
            {(accountName || caption) && !hideAccountName && (
                <div className="textContainer">
                    <span className="accountName">{accountName}</span>
                    <span className={`caption ${captionSize}`}>{caption}</span>
                </div>
            )}


        </div>

    )
};

export default Profile;