import React, { useState, useRef } from 'react';
import { ReactComponent as CardButton } from '../../../assets/cardButton.svg'
import './style.scss';
import CommentList from '../../../component/CommentList'
import Profile from '../../../component/Profile'
import moment from 'moment'
import ExploreCardMenu from '../../../component/ExplorePostCardMenu'
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Loader from '../../../component/Loader'
import { v4 as uuidv4 } from 'uuid';

const PostPagePostCard = ({
    feed,
    accountName,
    avatar,
    comments,
    storyBorder,
    image,
    commentText,
    setCommentText,
    likeFunc,
    commentPostFunc,
    commentPostMutation,
    isLiked,
    setIsLiked,
}) => {
    const inputRef = useRef();
    const focus = () => {
        inputRef.current.focus();
    };

    return (
        <div className="card_container">
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
            <ExploreCardMenu isLiked={isLiked} setIsLiked={setIsLiked} focus={focus} likeFunc={likeFunc} userpost={feed} />
            <div className="likedBy">
                {/*  <Profile iconSize="small" hideAccountName={true} /> */}
                {/*  <span>
                    Liked by <strong>{likedByText}</strong> and{" "}
                    <strong>{likedByNumber} others</strong>
                </span> */}
                {!feed.likes || feed.likes.length < 1 ? (
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
            <div className="timePosted">{moment(feed.date).fromNow()} </div>
            <form onSubmit={commentPostFunc} className="addComment">
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
        </div>
    )
}

export default PostPagePostCard;
