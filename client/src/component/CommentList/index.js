import React from 'react';
import './style.scss';
import ProfileIcon from '../ProfileIcon';
import moment from 'moment';


moment.relativeTimeThreshold('d', 30 * 12);
moment.updateLocale('en', {
    relativeTime: {
        dd: "%dd",
    }
});

const CommentList = ({ accountName, comment, commentImage, commentTime }) => {

    return (
        <React.Fragment>
            <div className="commentContainer">
                {commentImage && (
                    <div className="profile-icon">
                        <img src={commentImage ? commentImage : require('../../assets/default-avatar.png')} alt="image" aria-label="poster-iamge" />
                    </div>
                )}
                <div className="accountName">{accountName}</div>
                <div className="comment">{comment}</div>
            </div>

            <h3 className="comment-time"> {moment(commentTime).fromNow(true)}</h3>

        </React.Fragment>

    )
};

export default CommentList;