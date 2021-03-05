import React, { useState, useEffect, Fragment } from 'react';
import './style.scss'
import Header from '../../component/Header';
import PostCard from '../../component/Explorepostcard/PostCard';
import MobileTabMenu from '../../component/MobileTabMenu';
import SearchBox from '../../component/SearchBox/SearchBox';
import NavigationHeader from '../../component/NavigationHeader';
import { getPosts } from '../../redux/Actions/postActions'
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';


import * as Routes from '../../component/routes';
import { v4 as uuidv4 } from 'uuid';


const ExploreScreen = ({ getPosts, posts, location }) => {

    const history = useHistory();
    useEffect(() => {
        let subscirbe = true;
        if (subscirbe) {
            getPosts(history)
        }
        return () => subscirbe = null
    }, [getPosts]);

    return (

        <div className="container">
            <section className="header-section">
                <NavigationHeader />
            </section>
            <div className="searchBox-wrapper_mobile" >
                <SearchBox />
            </div>

            <div className='posts-container'>
                <div className="image-grid">
                    {posts && posts.length && posts.map((post) => {

                        return (

                            <PostCard
                                post={post}
                                key={uuidv4()}
                            />
                        )
                    })}


                </div>
            </div>
            <div className="menuTab-Wrapper">
                <MobileTabMenu />
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