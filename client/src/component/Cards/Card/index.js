import React, { useState, useRef } from 'react';
import './style.scss';
import { ReactComponent as CardButton } from '../../../assets/cardButton.svg';
import CardMenu from '../CardMenu';
import CommentList from '../../CommentList';
import Profile from '../../Profile';
import moment from 'moment';
import dayjs from 'dayjs';
import ExploreCardMenu from '../../ExplorePostCardMenu';
import { commentPost } from '../../../redux/Actions/postActions';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { likePost } from '../../../redux/Actions/postActions';
import Loader from '../../Loader'
function Card(props) {
  const [commentText, setCommentText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false)
  const history = useHistory();
  const dispatch = useDispatch();
  const inputRef = useRef();

  const {
    storyBorder,
    feed,
    image,
    comments,
    likedByText,
    likedByNumber,
    accountName,
    avatar,
    hours,
  } = props;

  React.useEffect(() => {
    return () => null;
  });
  const handlePost = async (e) => {
    e.preventDefault();
    try {
      setIsSubmitting(true)
      await dispatch(commentPost(feed._id, commentText, history));
      setCommentText('');
      setIsSubmitting(false)
    } catch (error) {
      console.log(error.message);
    }
  };
  const likeFunc = async () => {
    try {
      await dispatch(likePost(feed._id, history));
      // setIsLikedButtonClicked(true)
    } catch (error) {
      console.log(error);
    }
  };

  const focus = () => {
    inputRef.current.focus();
  };
  return (
    <div className="card">
      <header>
        <Profile
          iconSize="medium"
          image={avatar}
          authorUsername={feed.author.username}
          username={accountName}
          storyBorder={storyBorder}
        />
        <CardButton className="cardButton" />
      </header>
      <img className="cardImage" src={image} alt="card content" />
      {/*  <CardMenu /> */} <ExploreCardMenu focus={focus} likeFunc={likeFunc} userpost={feed} />
      <div className="likedBy">
        {/*  <Profile iconSize="small" hideAccountName={true} /> */}
        {/*  <span>
                    Liked by <strong>{likedByText}</strong> and{" "}
                    <strong>{likedByNumber} others</strong>
                </span> */}
        {!feed.likes ? (
          <span className="like-title">
            {' '}
            Be the first to <b>like this</b>
          </span>
        ) : (
          <span>{feed.likes.length} Likes</span>
        )}
      </div>
      <div className="comments">
        {comments &&
          comments.map((comment) => {
            return (
              <CommentList
                key={comment._id}
                accountName={comment.user}
                comment={comment}
                commentId={comment._id}
                commentuser={comment._user}
                commentText={comment.commentText}
                userpost={feed}
                accountName={comment.username}
                comment={comment.commentText}
                commentImage={comment.avatar}
                commentTime={comment.commentDate}
              />
            );
          })}
      </div>
      <div className="timePosted">{moment(feed.date).fromNow()} </div>
      <form onSubmit={handlePost} className="addComment">
        <input
          ref={inputRef}
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          type="text"
          placeholder="Add a comment..."
          className="commentText"
        />
        {isSubmitting && <Loader />}
        <button
          type="submit"
          disabled={commentText ? false : true}
          className="postText-btn"
          onSubmit={handlePost}
        >
          Post
        </button>
      </form>
    </div>
  );
}

export default Card;
