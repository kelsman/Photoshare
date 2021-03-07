
import React from 'react';
import Notifications from "../../../assets/notifications.svg";
import Inbox from "../../../assets/inbox.svg";
import Bookmark from "../../../assets/bookmark.svg";
import LikeButton from '../../Button/LikeButton';
import './style.scss';
import * as Icon from 'react-feather'

const CardMenu = ({ focus, likeFunc, isLiked, unlikeFunc }) => {
    return (
        <div className="cardMenu">
            <div className="interactions">

                <Icon.Heart className="icon" fill={isLiked ? "tomato" : "white"} onClick={likeFunc} />
                <Icon.ThumbsDown className="icon" onClick={unlikeFunc} />
                <Icon.MessageCircle className="icon" onClick={focus} />
                <Icon.Share className="icon" />
            </div>
            <Icon.Bookmark className="icon" />
        </div>
    )
};

export default CardMenu;