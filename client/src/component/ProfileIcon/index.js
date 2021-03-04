import React from 'react';
import Avatar from '../../assets/default-avatar.png'
import { connect } from 'react-redux'
import './style.scss';

const ProfileIcon = ({ user, iconSize, storyBorder }) => {


    return (
        <div className={storyBorder ? "storyBorder" : ""}>
            <img
                src={user && user.avatar ? user.avatar : Avatar}
                className={`profileIcon ${iconSize}`}
                alt=""
            />
        </div>
    )
}

const mapStateToProps = ({ user }) => ({
    user: user.currentUser
});

export default connect(mapStateToProps, null)(ProfileIcon);


