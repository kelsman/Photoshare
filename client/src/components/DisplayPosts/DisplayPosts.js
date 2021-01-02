import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import moment from "moment";
import Avatar from '../../../src/assets/images/Avatar.png'
import './style.scss';
import Loader from 'react-loader-spinner'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import { IconContext } from "react-icons";

//icons 

import { BsHeart } from 'react-icons/bs'
import { FaRegComment } from 'react-icons/fa';
const DisplayPosts = (props) => {

    const [imgLoaded, setImgLoaded] = useState(false);
    const handlePostImgLoading = () => {
        setImgLoaded(true)

    }

    const handleCommentIconClick = () => {
        console.log('icon clicked')
    };

    const handleLikeIconClick = () => {
        console.log('clicked like')
    }
    return (

        <Fragment>

            <div className="displayPosts-container">
                {
                    props.posts && props.posts.length === 0 ? (

                        <div className="text-container">
                            <h4> You dont follow anyone</h4>
                            <p> checkout the <Link to="/explore"></Link> Page For Users to Follow</p>
                        </div>
                    ) : (
                            <div className="postsLoaded-Conatainer">

                                {
                                    props.posts.map((post) => {
                                        return (
                                            <div key={post._id} className="postWrapper">
                                                <div className="card-header">
                                                    <div className="headerimg-wrapper">
                                                        <img
                                                            src={props.user.profileImg ? props.user.profileImg : Avatar}
                                                            alt=""
                                                            width="40px"
                                                            height="40px"
                                                        />

                                                    </div>
                                                    <h5 className="header-username"> {post.postedBy.username}</h5>


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



export default DisplayPosts;