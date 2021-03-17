import React from 'react';
import Avatar from '../../assets/default-avatar.png'
import { connect } from 'react-redux'
import './style.scss';
import { Link, useHistory } from 'react-router-dom'
import * as Routes from '../routes';

const ProfileIcon = ({ user, iconSize, storyBorder, image, authorUsername }) => {

    const history = useHistory()
    return (
        <div className={storyBorder ? "storyBorder" : ""}>

            <img
                src={image ? image : Avatar}
                className={`profileIcon ${iconSize}`}
                alt=""
                onClick={() => history.push(Routes.ProfilePage + `/${authorUsername}`)}
            />

        </div>
    )
}

const mapStateToProps = ({ user }) => ({
    user: user.currentUser
});

export default connect(mapStateToProps, null)(ProfileIcon);


