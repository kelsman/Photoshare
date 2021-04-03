import React, { useRef, useState, useEffect, useCallback } from 'react';

// react-query
import { useQueryClient, useMutation, useQuery } from 'react-query';

import './style.scss';
import { useHistory, useParams, withRouter } from 'react-router-dom';

// componnets
import NavigationHeader from '../../component/NavigationHeader';
import CommentList from '../../component/CommentList';
import Profile from '../../component/Profile';
import ExploreCardMenu from '../../component/ExplorePostCardMenu';
import MobileTabMenu from '../../component/MobileTabMenu';
import Card from '../../component/Cards/Card';
import Footer from '../../component/Footer';
import Loader from '../../component/Loader'

// external liberires
import * as Icon from 'react-feather';
import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';

// redux imports
// import { commentPost, getPosts, getSinglePost } from '../../redux/Actions/postActions';
import { connect } from 'react-redux';

// api
import {
  fetchSinglePost,
  likePost,
  CommentPost,


} from '../../api/posts.api';



function PostPage({ socket, user, history, }) {
  //    get postId from params
  const { postId } = useParams();

  //  states
  const [commentText, setCommentText] = React.useState('');
  // const [isLikedButtonClicked, setIsLikedButtonClicked] = useState(false)
  const inputRef = useRef();

  // query client
  const queryClient = useQueryClient()

  const focus = () => {
    inputRef.current.focus();
  }

  // const { location: { pathname, state } } = history;

  const handleCommentTextChange = (e) => {
    setCommentText(e.target.value);
  };


  //  react-query
  const { isFetching, isLoading, data: userpost, error, isSuccess } = useQuery('fetchsinglePost', () => fetchSinglePost(postId))


  const likeMutation = useMutation(() => likePost(userpost._id), {
    onSuccess: () => {
      queryClient.invalidateQueries('fetchsinglePost')
    },

  });

  const commentMutation = useMutation(() => CommentPost(userpost._id, commentText), {
    onSuccess: (data) => {
      queryClient.invalidateQueries('fetchsinglePost')
    }
  })



  const commentPostFunc = async (event) => {
    event.preventDefault()
    const { mutateAsync } = commentMutation
    await mutateAsync();
    setCommentText('');
  }


  const likeFunc = async () => {
    const { mutateAsync } = likeMutation
    await mutateAsync()
  }



  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="post-page">
      <main>
        <div className="post_content">
          <div className="post_image">
            <img src={userpost.postMedia} alt="image" />
          </div>
          <div className="post_details">
            <div className="profile">
              <Profile
                image={userpost.author.avatar}
                iconSize="medium"
                username={userpost.author.username}
              />
              <Icon.MoreHorizontal className="more-icon" size={26} />
            </div>

            {/* comment section */}
            <div className="comment-section">
              {userpost.comments &&
                userpost.comments.map((comment) => (
                  <CommentList
                    key={uuidv4()}
                    commentId={comment._id}
                    commentuser={comment._user}
                    commentText={comment.commentText}
                    userpost={userpost}
                    accountName={comment.username}
                    comment={comment.commentText}
                    commentImage={comment.avatar}
                    commentTime={comment.commentDate}
                  />
                ))}
            </div>

            {/* icons*/}
            <div className="card_icon_menu">
              <div className="card-menu">
                <ExploreCardMenu
                  userpost={userpost}
                  focus={focus}
                  likeFunc={likeFunc}
                // isLiked={isLikedButtonClicked}
                />
              </div>
              {!userpost.likes ? (
                <small className="like-title">
                  {' '}
                  Be the first to <b>like this</b>
                </small>
              ) : (
                <small>{userpost.likes.length} Likes</small>
              )}

              <small className="post-date">{moment(userpost.date).format('MMM D')}</small>
            </div>

            {/*  add a comment form */}
            <form className="addComment" onSubmit={commentPostFunc}>
              <input
                ref={inputRef}
                value={commentText}
                onChange={handleCommentTextChange}
                type="text"
                data-emoji="true"
                placeholder="Add a comment..."
                className="commentText"
                name="commentText"
              />
              {commentMutation.isLoading && <Loader />}
              <button disabled={commentText ? false : true} type="submit" className="postText-btn">
                Post
              </button>
            </form>
          </div>
        </div>
      </main>
      <section>
        <Card
          feed={userpost}
          accountName={userpost.author.username}
          avatar={userpost.avatar}
          comments={userpost.comments}
          image={userpost.postMedia}
          storyBorder={true}
          invalidate={() => queryClient.invalidateQueries('fetchsinglePost')}

        />

      </section>

    </div>
  );
}
const mapStateToProps = ({ socket, post, user }) => {
  return {
    socket: socket.socket,
    userpost: post.post,
    user: user.currentUser,
  };
};
export default connect(mapStateToProps, {})(
  withRouter(PostPage),
);
