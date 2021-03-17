import React from 'react';
import * as Icon from 'react-feather';
import ProfileIcon from '../ProfileIcon';
import './style.scss';

import { useHistory } from 'react-router-dom';
import * as Routes from '../routes'
import { useSelector } from 'react-redux';
import NewPostButton from '../NewPost/NewPostButton';


const Menu = () => {
    const history = useHistory()
    const user = useSelector(({ user }) => user.currentUser)
    return (
        <div className="menu">
            <Icon.Home className="icon" />
            <Icon.Compass className="icon" onClick={() => { history.push(Routes.Explore) }} />
            <Icon.Heart className="icon" />
            <NewPostButton />
            <ProfileIcon iconSize="medium" image={user && user.avatar} authorUsername={user && user.username} user={user} />
            {/* profile icon */}

        </div>
    )
};

export default Menu;