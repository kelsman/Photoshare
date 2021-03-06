
import React from 'react';
import Notifications from "../../../assets/notifications.svg";
import Inbox from "../../../assets/inbox.svg";
import Bookmark from "../../../assets/bookmark.svg";
import './style.scss';
import * as Icon from 'react-feather'

const CardMenu = ({ focus }) => {
    return (
        <div className="cardMenu">
            <div className="interactions">

                <Icon.Heart className="icon" />
                <Icon.MessageCircle className="icon" onClick={focus} />
                <Icon.Share className="icon" />
            </div>
            <Icon.Bookmark className="icon" />
        </div>
    )
};

export default CardMenu;