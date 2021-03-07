import React, { useRef, useState, useEffect } from 'react';

import './style.scss';
import { useHistory, useParams, withRouter } from 'react-router-dom';

// componnets
import NavigationHeader from '../../component/NavigationHeader';
import CommentList from '../../component/CommentList';
import Profile from '../../component/Profile';
import ExploreCardMenu from '../../component/ExplorePostCardMenu';
import MobileTabMenu from '../../component/MobileTabMenu';
import Card from '../../component/Cards/Card'

// external liberires
import * as Icon from 'react-feather'
import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';


// redux imports
import { commentPost, getPosts, getSinglePost, likePost, unLikePost } from '../../redux/Actions/postActions';
import { connect } from 'react-redux';



function PostPage({ commentPost, socket, getPosts, user, userpost, getSinglePost, history, likePost, unLikePost }) {

    //    get postId from params
    const { postId } = useParams();

    //  states 
    const [commentText, setCommentText] = React.useState('');
    const [isLoading, setIsLoading] = useState(true);
    // const [isLikedButtonClicked, setIsLikedButtonClicked] = useState(false)
    const inputRef = useRef()

    const focus = () => {
        inputRef.current.focus()
    };


    useEffect(async () => {
        let subscribe = true;
        if (subscribe) {
            try {
                await getSinglePost(postId)
                setIsLoading(false)
            } catch (error) {
                console.log(error.message)
            }

        }
        return () => subscribe = null;
    }, [getSinglePost]);



    //  @ functions  all functions defined here


    const likeFunc = async () => {
        try {
            await likePost(userpost._id, socket, history)
            // setIsLikedButtonClicked(true)
        } catch (error) {
            console.log(error)
        }
    }
    const unlikeFunc = async () => {
        try {
            await unLikePost(userpost._id, socket, history)


        } catch (error) {
            console.error(error)
        }
    }
    // const getUserPost = async (postId) => {
    //     try {
    //         await getSinglePost(postId)
    //     } catch (error) {
    //         console.log(error)
    //     }
    // };

    const handleCommentPost = async (event) => {
        event.preventDefault();
        console.info('submitting btn')
        try {
            await commentPost(userpost._id, commentText, socket, history);
            setCommentText('');


        } catch (error) {
            console.log(error.message)
        }
    }

    // const { location: { pathname, state } } = history;

    const handleCommentTextChange = (e) => {
        setCommentText(e.target.value)
    }

    if (isLoading) {
        return <p>Loading...</p>
    }
    return (
        <div className="post-page">


            <header>
                <NavigationHeader />
            </header>

            <main>
                <div className="post_content">


                    <div className="post_image">
                        <img src={userpost.postMedia} alt="image" />
                    </div>
                    <div className="post_details">
                        <div className="profile">
                            <Profile image={userpost.postedBy.avatar} iconSize="medium" username={userpost.postedBy.username} />
                            <Icon.MoreHorizontal className="more-icon" size={26} />
                        </div>

                        {/* comment section */}
                        <div className="comment-section">
                            {userpost.comments.map((comment) => (
                                <CommentList
                                    key={uuidv4()}
                                    accountName={comment.name}
                                    comment={comment.text}
                                    commentImage={comment.avatar}
                                    commentTime={comment.date}
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
                                    unlikeFunc={unlikeFunc} />
                            </div>
                            {!userpost.likes.length ?
                                <small className="like-title"> Be the first to <b>like this</b></small>
                                :
                                <small>{userpost.likes.length} Likes</small>
                            }


                            <small className="post-date">
                                {
                                    moment(userpost.date).format('MMM D')
                                }
                            </small>
                        </div>

                        {/*  add a comment form */}
                        <form className="addComment" onSubmit={handleCommentPost}>
                            <input
                                ref={inputRef}
                                value={commentText}
                                onChange={handleCommentTextChange}
                                type="text"
                                placeholder="Add a comment..."
                                className="commentText"
                                name="commentText"
                            />
                            <button

                                disabled={commentText ? false : true}
                                type="submit"
                                className="postText-btn">Post</button>
                        </form>

                    </div>

                </div>


            </main>





        </div>
    )
}
const mapStateToProps = ({ socket, post, user }) => {
    return {
        socket: socket.socket,
        userpost: post.post,
        user: user.currentUser
    }
}
export default connect(mapStateToProps,
    { commentPost, getPosts, getSinglePost, likePost, unLikePost }
)(withRouter(PostPage))




