import React, { Fragment } from 'react';

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
// import { post } from '../../redux/actions/post/post.actions';



const DisplayPosts = ({ posts, postLoading, user }) => {

    // const [imgLoaded, setImgLoaded] = useState(false);

    const handlePostImgLoading = () => {
        // setImgLoaded(true)

    }

    const handleCommentIconClick = () => {
        console.log('icon clicked')
    };

    // const handleLikeIconClick = () => {
    //     console.log('clicked like')
    // }

    // const { posts, postLoading, user } = props

    // if (postLoading) {
    //     return <h1> Loading</h1>
    // }


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
                                                        src={post.postImg}
                                                        alt="postimg"
                                                        onLoad={handlePostImgLoading}
                                                        width="30px"

                                                        height="30px"
                                                    />



                                                </div>
                                                <div className="iconsWrapper">
                                                    <h5>
                                                        <IconContext.Provider value={{ className: "likesIcon", style: { fill: "red" } }}>

                                                            <BsHeart /> {post.likes.length === 0 ? 0 : post.likes.length}
                                                        </IconContext.Provider>
                                                    </h5>
                                                    <h5>
                                                        <IconContext.Provider value={{ className: "commentIcon" }}>
                                                            <FaRegComment onClick={handleCommentIconClick} /> {post.comments.length === 0 ? null : post.comments.length}
                                                        </IconContext.Provider>
                                                    </h5>

                                                </div>

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
};


const mapStateToProps = ({ post, user }) => {
    return {

        posts: post.posts,
        postLoading: post.loading,
        user: user.currentUser
    }

}
export default connect(mapStateToProps)(withRouter(DisplayPosts));