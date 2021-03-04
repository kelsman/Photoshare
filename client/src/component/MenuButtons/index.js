import React from 'react';
import * as Icon from 'react-feather';
import ProfileIcon from '../ProfileIcon';
import './style.scss';

const Menu = () => {
    return (
        <div className="menu">
            <Icon.Home className="icon" />
            <Icon.Compass className="icon" />
            <Icon.Heart className="icon" />
            <ProfileIcon iconSize="medium" />
            {/* profile icon */}

        </div>
    )
};

export default Menu;