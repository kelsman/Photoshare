import React, { useState, useEffect, Fragment } from 'react';
import './style.scss';
import * as Routes from '../../component/routes';
import axios from 'axios';
import { setToken } from '../../utils';
import Loader from '../../component/Loader';
import cogoToast from 'cogo-toast';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Avatar from '../../assets/default-avatar.png';
import * as Icon from 'react-feather';
import Footer from '../../component/Footer';
import PostCard from '../../component/Explorepostcard/PostCard';
import { v4 as uuidv4 } from 'uuid';
import FollowButton from '../../component/FollowButton';

// react-query
import { useQuery } from "react-query"

const token = localStorage.getItem('authToken');

const ProfilePage = () => {
  // const [profile, setProfile] = useState(undefined);
  const { username } = useParams();
  const currentUser = useSelector(({ user }) => user.currentUser);
  const history = useHistory();


  const getProfile = async () => {
    if (token) {
      setToken(token);
    }
    const config = {
      headers: {
        'Content-Type': 'applocation/json',
      },
    };
    const response = await axios.get(`/api/route/user/userprofile/${username}`, config);
    // if (response) {
    //   const data = response.data.userProfile[0];

    // }
    return response.data.userProfile[0]

  };

  const { data: userProfile, isLoading, isError, error, isSuccess } = useQuery('getProfileData', getProfile)

  if (isLoading) {
    return <Loader />;
  }
  let isFollowing;

  if (isSuccess) {
    isFollowing = userProfile.followers.find((follow) => {
      return follow.user === String(currentUser._id)
    });
  }



  return (
    <div className="profilepage__wrapper">
      <header className="header">
        <div className="header__content">
          <div className="profile__image">
            <img src={userProfile.avatar ? userProfile.avatar : Avatar} alt="" />
          </div>
          <div className="profile__details">
            <div className="username">
              <h2> {userProfile.username}</h2>
              {currentUser && userProfile && userProfile._id !== currentUser._id ? (
                <FollowButton
                  userId={userProfile && userProfile._id}
                  avatar={userProfile.avatar}
                  username={userProfile.username}
                  following={isFollowing}
                />
              ) : (
                <Fragment>
                  <button
                    className="settings__btn"
                    onClick={() => history.push(Routes.SettingsPage)}
                  >
                    Edit Profile
                  </button>
                  <button className="icon_btn">
                    <Icon.Settings />
                  </button>
                </Fragment>
              )}
            </div>

            <div className="follow__details">
              <small>
                {userProfile.posts && userProfile.posts.length ? userProfile.posts.length : 0} posts
              </small>
              <small>
                {userProfile.followers && userProfile.followers.length ? userProfile.followers.length : 0}{' '}
                followers
              </small>
              <small>
                {' '}
                {userProfile.following && userProfile.following.length ? userProfile.following.length : 0}{' '}
                following
              </small>
            </div>

            <div className="name">
              <p> {userProfile.name}</p>
            </div>
          </div>
        </div>
      </header>

      <section style={{ width: '100%' }}>
        <div className="post__title">
          <Icon.Grid className="grid__icon" />
        </div>
      </section>

      {userProfile.posts ? (
        <div className="posts__gallery">
          {userProfile.posts.map((post) => {
            return (
              <PostCard
                // src={post.postMedia}
                key={uuidv4()}
                alt="post image"
                post={post}
              />
            );
          })}
        </div>
      ) : (
        <div>
          no posts to show
          <Icon.Camera size={30} />
          <h1>Share Photos</h1>
          <p>When you share Photos they will appear on your profile</p>

        </div>
      )}

    </div>
  );
};

export default ProfilePage;
