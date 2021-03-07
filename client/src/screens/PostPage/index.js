import React, { useRef, useState, useEffect } from 'react';

import './style.scss';
import { useHistory, useParams } from 'react-router-dom';

// componnets
import NavigationHeader from '../../component/NavigationHeader';
import CommentList from '../../component/CommentList';
import Profile from '../../component/Profile';
import CardMenu from '../../component/Cards/CardMenu';
import MobileTabMenu from '../../component/MobileTabMenu';
import Card from '../../component/Cards/Card'
// external liberires
import * as Icon from 'react-feather'
import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';
import ExploreMobileCard from '../../component/Cards/ExploreCard';

import { commentPost, getPosts, getSinglePost } from '../../redux/Actions/postActions';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';


function PostPage({ commentPost, socket, getPosts, userpost, getSinglePost, history }) {

    //    get postId from params
    const { postId } = useParams();

    //  states 
    const [commentText, setCommentText] = React.useState('');
    const [isLoading, setIsLoading] = useState(true)
    // const [comments, setComments] = useState(userpost.comments)


    // const [post, setPost] = React.useState(history.location.state.post);
    const inputRef = useRef()

    const focus = () => {
        inputRef.current.focus()
    };
    //  loading ref
    const Loading = useRef(true)
    // console.log(Loading)

    useEffect(async () => {
        let subscribe = true;
        if (subscribe) {
            try {
                await getUserPost(postId)
                setIsLoading(false)
            } catch (error) {
                console.log(error.message)
            }

        }
        return () => subscribe = null;
    }, [getSinglePost]);



    //  @ functions 
    const getUserPost = async (postId) => {
        try {
            await getSinglePost(postId)
        } catch (error) {
            console.log(error)
        }
    };

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

    // if (Loading) {
    //     return <p> Loading</p>
    // }
    // const { postedBy, likes, date, postMedia, comments } = userpost
    console.log(userpost);
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
                                <CardMenu focus={focus} />
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
                <div className="mobile_post_content">
                    <ExploreMobileCard
                        likes={userpost.likes}
                        comments={userpost.comments}
                        image={userpost.postMedia}
                        postedBy={userpost.postedBy}
                        handleCommentPost={handleCommentPost}
                        commenText={commentText}
                        onChange={handleCommentTextChange}
                    />
                </div>

            </main>





        </div>
    )
}
const mapStateToProps = ({ socket, post }) => {
    return {
        socket: socket.socket,
        userpost: post.post
    }
}
export default connect(mapStateToProps, { commentPost, getPosts, getSinglePost })(withRouter(PostPage))
//  image,
// comments,
// likedByText,
// likedByNumber,
// hours




