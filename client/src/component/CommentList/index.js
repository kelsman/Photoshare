import React from 'react';
import './style.scss';
import ProfileIcon from '../ProfileIcon';
import moment from 'moment';
import * as Icon from 'react-feather';
import { useSelector, useDispatch } from 'react-redux';

import { useHistory } from 'react-router-dom';
import { useMutation, useQueryClient } from 'react-query';
import { deleteComment } from '../../api/posts.api'
import { ReactComponent as LoaderSvg } from '../../assets/loader.svg';
import Loader from 'react-loader-spinner';
import * as Routes from '../routes'

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
  comment,
  userpost,
  feed
}) => {
  const userData = useSelector(({ user }) => user.currentUser);
  const dispatch = useDispatch();


  const {
    history,
    location: { pathname },
  } = useHistory();
  const queryClient = useQueryClient();

  const { mutateAsync, isLoading } = useMutation(() => deleteComment(userpost._id, commentId), {

    onSuccess: (data) => {

      if (queryClient.getQueryData(['fetchsinglePost', `${userpost._id}`])) {
        queryClient.invalidateQueries(['fetchsinglePost', `${userpost._id}`]);

      }

      // if (queryClient.getQueryData('fetchfeeds')) {
      //   queryClient.setQueryData('fetchsinglePost', prev => {
      //     return {
      //       ...prev,
      //       comments: [...prev.comments]
      //     }
      //   })
      // }
      // queryClient.invalidateQueries('fetchfeeds');

    },
    onSettled: () => {
      queryClient.invalidateQueries('fetchfeeds');
      queryClient.invalidateQueries('fetchsinglePost');
    }
  })

  const deleteCommentFunc = async () => {
    await mutateAsync();
  }
  return (
    <React.Fragment>
      <div className="commentContainer">
        {commentImage && (
          <div className="profile-icon">
            <img
              src={commentImage ? commentImage : require('../../assets/default-avatar.png')}
              alt="image"
              aria-label="poster-iamge"
              onClick={() => history.push(Routes.ProfilePage + `/${accountName}`)}
            />
          </div>
        )}
        <div className="accountName">{accountName}</div>
        <div className="comment">{commentText}</div>

        {userData && commentuser == userData._id && (
          <span onClick={deleteCommentFunc} className="deletebtn">
            {isLoading ?
              <Loader
                type="Oval"
                color="black"
                height={10}
                width={30}
              />
              :
              <Icon.Trash2 size={13} />}
          </span>
        )}
      </div>

      {/* <h3 className="comment-time"> {moment(commentTime).fromNow(true)}</h3> */}
    </React.Fragment>
  );
};

export default CommentList;
