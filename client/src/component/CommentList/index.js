import React from 'react';
import './style.scss';
import ProfileIcon from '../ProfileIcon';
import moment from 'moment';
import * as Icon from 'react-feather';
import { useSelector, useDispatch } from 'react-redux';
import { deleteComment } from '../../redux/Actions/postActions';
import { useHistory } from 'react-router-dom';
moment.relativeTimeThreshold('d', 30 * 12);
moment.updateLocale('en', {
  relativeTime: {
    dd: '%dd',
  },
});

const CommentList = ({
  accountName,
  commentuser,
  commentImage,
  commentText,
  commentId,
  commentTime,
  userpost,
}) => {
  const userData = useSelector(({ user }) => user.currentUser);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleDelete = async () => {
    try {
      await dispatch(deleteComment(userpost._id, commentId, history));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <React.Fragment>
      <div className="commentContainer">
        {commentImage && (
          <div className="profile-icon">
            <img
              src={commentImage ? commentImage : require('../../assets/default-avatar.png')}
              alt="image"
              aria-label="poster-iamge"
            />
          </div>
        )}
        <div className="accountName">{accountName}</div>
        <div className="comment">{commentText}</div>

        {userData && commentuser == userData._id && (
          <span onClick={handleDelete} className="deletebtn">
            <Icon.Trash2 size={13} />
          </span>
        )}
      </div>

      <h3 className="comment-time"> {moment(commentTime).fromNow(true)}</h3>
    </React.Fragment>
  );
};

export default CommentList;
