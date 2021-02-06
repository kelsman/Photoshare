import React, { Fragment, useState, useEffect } from 'react';

// import moment from "moment";
import Avatar from '../../../src/assets/images/Avatar.png'
import './style.scss';
// import Loader from 'react-loader-spinner'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import { IconContext } from "react-icons";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
//icons 


import { BsHeart } from 'react-icons/bs'
import { FaRegComment } from 'react-icons/fa';
import { addComment, getposts } from '../../redux/actions/post/post.actions';
import CommentForm from '../comment/commentForm';
import CommentList from '../comment/commentList';
import Pusher from 'pusher-js';

const DisplayPosts = ({ posts, postLoading, user, comments }) => {



    const [liked, setLiked] = useState(false);
    // // const [comments, setComments] = useState(() => {
    // //     posts.comments.filter((comment) => {

    // //     })
    // // });





    // const handlePostImgLoading = () => {
    //     // setImgLoaded(true)

    // };

    const handleCommentIconClick = () => {
        console.log('icon clicked')
    };
    const handleLiked = () => {
        setLiked(true)

    };
    useEffect(() => {
        const pusher = new Pusher(process.env.REACT_APP_PUSHER_KEY, {
            encoded: true,
            cluster: 'mt1'
        });

        const channel = pusher.subscribe('messages');
        channel.bind('flash-comments', (data) => {
            alert(JSON.stringify(data));
        });

        return () => {
            channel.unbind_all();
            channel.unsubscribe();
        };
    }, []);
    return (

        <Fragment>

            <div className="displayPosts-container">
                {

                    !posts.length && postLoading ? <h1> Loading </h1>
                        : (
                            <div className="postsLoaded-Conatainer">
                                {
                                    posts.map((post) => {
                                        return (
                                            <div key={post._id} className="postWrapper">
                                                <div className="card-header">
                                                    <div className="headerimg-wrapper">
                                                        <img
                                                            src={user.profileImg ? user.profileImg : Avatar}
                                                            alt="profile"
                                                            width="40px"
                                                            height="40px"
                                                        />

                                                    </div>
                                                    <h5 className="header-username">{post.postedBy.username ? post.postedBy.username : "username"}</h5>
                                                </div>
                                                <div className="post-picture">
                                                    <img
                                                        loading="lazy"
                                                        src={post.postImg}
                                                        alt="postimg"

                                                        width="30px"
                                                        height="30px"
                                                    />



                                                </div>
                                                <div className="iconsWrapper">
                                                    <h5>
                                                        <IconContext.Provider value={{ className: "likesIcon", style: { fill: "red" } }}>

                                                            <BsHeart onClick={handleLiked} /> {post.likes.length === 0 ? 0 : post.likes.length}
                                                        </IconContext.Provider>
                                                    </h5>
                                                    <h5>
                                                        <IconContext.Provider value={{ className: "commentIcon" }}>
                                                            <FaRegComment onClick={handleCommentIconClick} />
                                                            {comments.length && comments.filter((comment) => {
                                                                return comment.postId === post._id
                                                            }).length}
                                                        </IconContext.Provider>
                                                    </h5>

                                                </div>
                                                <div className="caption-Wrapper">
                                                    <p>
                                                        <span className="username"> {user.username}</span>
                                                        <span className="caption"> {post.caption ? post.caption : null}</span>

                                                    </p>

                                                </div>
                                                <CommentForm post={post} postId={post._id} />
                                                {comments.filter((comment) => {
                                                    return comment.postId === post._id
                                                }).map((comment) => {
                                                    return (
                                                        <CommentList key={comment._id} author={comment.author} comments={comment} commentId={comment._id} />

                                                    )
                                                })}
                                            </div>
                                        )
                                    })


                                }



                            </div>
                        )


                }
            </div>
        </Fragment>
    )

}


const mapStateToProps = ({ post, user }) => {
    return {

        posts: post.posts,
        comments: post.comments,
        postLoading: post.loading,
        user: user.currentUser
    }

}
export default connect(mapStateToProps, { addComment, getposts })(withRouter(DisplayPosts));