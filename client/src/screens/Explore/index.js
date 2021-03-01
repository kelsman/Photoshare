import React, { useState, useEffect, Fragment } from 'react';
import './style.scss'
import Header from '../../component/Header';
import PostCard from '../../component/postcard/PostCard';

import { getPosts } from '../../redux/Actions/postActions'
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

const ExploreScreen = ({ getPosts, posts }) => {

    const history = useHistory();
    useEffect(() => {
        let subscirbe = true;
        if (subscirbe) {
            getPosts(history)
        }
        return () => subscirbe = null
    }, []);

    console.log(posts)







    return (

        <div className="container">
            <Header />
            <p> Explore </p>
            <div className="posts-wrapper">
                {posts && posts.length && posts.map((post) => {
                    const { _id, date, postedBy, likes, comments, postMedia } = post;
                    return (

                        <div className="post-container" key={_id}>
                            <PostCard
                                id={_id}
                                date={date}
                                postedBy={postedBy}
                                media={postMedia}
                                likes={likes}
                                comments={comments}
                            />
                        </div>


                    )
                })}

            </div>

        </div>
    )
};

const mapStateTOProps = ({ post }) => {
    return {
        posts: post.posts
    }
}
export default connect(mapStateTOProps, { getPosts })(ExploreScreen);