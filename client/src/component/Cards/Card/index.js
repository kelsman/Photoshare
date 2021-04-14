import React, { useState, useRef } from 'react';
import './style.scss';
// component
import { ReactComponent as CardButton } from '../../../assets/cardButton.svg';
import CardMenu from '../CardMenu';
import CommentList from '../../CommentList';
import Loader from '../../Loader'
import ModalComponent from '../../Modal'
import Profile from '../../Profile';
import * as Routes from '../../routes';
import Divider from '../../Divider';

//  Api
import { likePost, CommentPost, deletePost } from '../../../api/posts.api';

// External libraries
import moment from 'moment';
import Moment from 'react-moment';
import dayjs from 'dayjs';
import ExploreCardMenu from '../../ExplorePostCardMenu';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { LazyLoadImage } from 'react-lazy-load-image-component';

// react-query
import { useQueryClient, useMutation, useQuery } from 'react-query';
import Heart from 'react-animated-heart';
import copy from 'copy-to-clipboard'

function Card(props) {
  const [commentText, setCommentText] = useState('');
  const [isLiked, setIsLiked] = React.useState(undefined);
  const [showModal, setShowModal] = useState(false);

  const closeModal = () => {
    setShowModal(prev => false)
  }


  const history = useHistory();

  const dispatch = useDispatch();
  const inputRef = useRef();
  const currentUser = useSelector(({ user }) => user.currentUser)
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
    invalidate
  } = props;

  // check if user has liked the post before;
  let hasUserLiked;
  if (feed && feed.likes && currentUser) {
    hasUserLiked = feed.likes.find(d => d.user === currentUser._id)

  }
  // query client
  const queryClient = useQueryClient();

  const likeMutation = useMutation(() => likePost(feed._id), {

    onSuccess: (data) => {
      if (data === "like success") {
        setIsLiked(true)
      }
      if (data === "unlike success") {
        setIsLiked(false)
      }
      // invalidate()
    },

    onSettled: () => {
      queryClient.invalidateQueries('fetchfeeds')
    }

  });

  const commentPostMutation = useMutation(() => CommentPost(feed._id, commentText), {

    onSuccess: (data) => {

      queryClient.setQueryData('fetchfeeds', prev => {
        const post = prev.find(d => d._id === feed._id)
        if (post) {
          return prev.map(postItem => postItem._id === feed._id ? { ...postItem, comments: [...postItem.comments, data.newComment] } : postItem)
        }

      })

    },
    onSettled: (data, error, variables) => {
      // invalidate the query 
      queryClient.invalidateQueries('fetchfeeds');
    }
  });
  const { mutateAsync: deletePostAsync, isLoading: deleteLoading } = useMutation(deletePost, {



    omSucces: () => {
      queryClient.refetchQueries('fetchfeeds')

    }
  })
  const likeFunc = async () => {
    try {
      await likeMutation.mutateAsync()
      // setIsLikedButtonClicked(true)
    } catch (error) {
      console.log(error);
    }
  };

  const commentPostFunc = async () => {
    try {
      await commentPostMutation.mutateAsync()

      // setIsLikedButtonClicked(true)
    } catch (error) {
      console.log(error);
    }
  }
  const deletePostFunc = async () => {
    try {
      deletePostAsync(feed._id)
    } catch (error) {
      console.log(error)
    }
  }

  const focus = () => {
    inputRef.current.focus();
  };

  const copyUrl = () => {
    copy(window.location.href)
  }
  if (deleteLoading) {
    return <Loader />;
  }
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
        <CardButton className="cardButton" onClick={() => setShowModal(true)} />
      </header>
      <LazyLoadImage
        src={image}
        alt={"cardcontent"}
        className="cardImage"
        effect="blur"
      />
      {/* <img className="cardImage" src={image} alt="cardcontent" /> */}
      {/*  <CardMenu /> */} <ExploreCardMenu hasUserLiked={hasUserLiked} setIsLiked={setIsLiked} isLiked={isLiked} focus={focus} likeFunc={likeFunc} userpost={feed} />
      <div className="likedBy">
        {!feed.likes || feed.likes.length < 1 ? (
          <span className="like-title">
            {' '}
            Be the first to <b>like this</b>
          </span>
        ) : (
          <span>{feed.likes.length}  Likes</span>
        )}
      </div>
      <div className="comments">
        {comments &&
          comments.map((comment) => {
            return (
              <CommentList
                key={uuidv4()}
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
      <div className="timePosted">
        {/* moment(feed.date).fromNow() */}
        <Moment date={feed.date} format={'DD MMM '} />
      </div>
      <form onSubmit={(event) => {
        event.preventDefault();
        commentPostFunc()

      }} className="addComment">
        <input
          ref={inputRef}
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          type="text"
          placeholder="Add a comment..."
          className="commentText"
        />
        {commentPostMutation.isLoading && <Loader />}
        <button
          type="submit"
          disabled={commentText ? false : true}
          className="postText-btn"
        >
          Post
        </button>

      </form>
      <ModalComponent open={showModal} hide={closeModal}>
        <ul className="options__modal__container">
          <li onClick={() => history.push(Routes.PostPage + `/${feed._id}`)}>Go to Post</li>
          <Divider />
          {/* <li onClick={copyUrl}>Copy Link</li> */}
          {currentUser && currentUser._id === feed.author._id && <li style={{ color: "navy" }} onClick={async () => {

            await deletePostFunc()
            closeModal()
          }}> Delete Post</li>}
          <Divider />
          <li style={{ color: "tomato" }} onClick={closeModal}>Cancel</li>
        </ul>
      </ModalComponent>
    </div>
  );
}

export default Card;
