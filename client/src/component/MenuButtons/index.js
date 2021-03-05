import React from 'react';
import * as Icon from 'react-feather';
import ProfileIcon from '../ProfileIcon';
import './style.scss';

import { useHistory } from 'react-router-dom';
import * as Routes from '../routes'


const Menu = () => {
    const history = useHistory()

    return (
        <div className="menu">
            <Icon.Home className="icon" />
            <Icon.Compass className="icon" onClick={() => { history.push(Routes.Explore) }} />
            <Icon.Heart className="icon" />
            <ProfileIcon iconSize="medium" />
            {/* profile icon */}

        </div>
    )
};

export default Menu;