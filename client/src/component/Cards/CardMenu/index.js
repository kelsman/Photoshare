
import React from 'react';
import Notifications from "../../../assets/notifications.svg";
import Inbox from "../../../assets/inbox.svg";
import Bookmark from "../../../assets/bookmark.svg";
import LikeButton from '../../Button/LikeButton';
import './style.scss';
import * as Icon from 'react-feather'

import { connect } from 'react-redux';


const CardMenu = ({ focus, likeFunc, unlikeFunc, userpost, user }) => {

    // const handleButtonClicked = () => {
    //     try {
    //         likeFunc()
    //         checkUserLiked()
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }
    const [likeStatus, setLikedStatus] = React.useState(undefined)

    const checkUserLiked = userpost.likes.some((like) => {
        return like.likedBy.toString() == user._id.toString();
    });





    return (
        <div className="cardMenu">
            <div className="interactions">

                <Icon.Heart
                    className="icon" fill={checkUserLiked ? 'tomato' : "transparent"} onClick={likeFunc} />
                <Icon.ThumbsDown className="icon" onClick={unlikeFunc} />
                <Icon.MessageCircle className="icon" onClick={focus} />
                <Icon.Share className="icon" />
            </div>
            <Icon.Bookmark className="icon" />
        </div>
    )
}

function mapStateToProps({ user }) {
    return {
        user: user.currentUser
    };
}
export default connect(mapStateToProps, null)(CardMenu);