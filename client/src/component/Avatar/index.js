import React from 'react';
import './style.scss';

const Avatar = ({

    imageSrc = require('../../assets/default-avatar.png'),
    className,
    onClick,
    style,
}) => {
    const avatarClasses = classNames({
        avatar: true,
        [className]: className,
    });
    return (
        <img
            className={avatarClasses}
            onClick={onClick}
            style={style}
            src={imageSrc}
            alt="Avatar"
        />
    )
};


export default Avatar;