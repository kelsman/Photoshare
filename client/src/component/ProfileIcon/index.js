import React from 'react';
import Avatar from '../../assets/default-avatar.png'
import { connect } from 'react-redux'
import './style.scss';

const ProfileIcon = ({ user, iconSize, storyBorder, image }) => {


    return (
        <div className={storyBorder ? "storyBorder" : ""}>
            <img
                src={image ? image : Avatar}
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


