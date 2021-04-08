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
import { getProfile } from '../../api/profile.api';
import InfiniteScroll from 'react-infinite-scroll-component';
import LoaderSpinner from '../../component/LoaderSpinner';

// react-query
import { useQuery, useQueryClient } from "react-query"
import Divider from '../../component/Divider';
import EmptyProfile from './EmptyProfile';

const token = localStorage.getItem('authToken');
const baseUrl = process.env.REACT_APP_BASE_URL;

const ProfilePage = () => {
  // const [profile, setProfile] = useState(undefined);
  const { username } = useParams();
  const currentUser = useSelector(({ user }) => user.currentUser);
  const history = useHistory();
  const queryClient = useQueryClient()

  useEffect(() => {
    document.title = `@${username} .PhotoShare Photos`;
    return () => null;
  }, [])

  const { data: userProfile, isLoading, isError, error, isSuccess } = useQuery(["profile", username], () => getProfile(username))

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
                    className="editprofile__btn"
                    onClick={() => history.push(Routes.SettingsPage)}
                  >
                    Edit Profile
                  </button>
                  <button className="settings_btn">
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

      <section className="posts__section">
        <div className="post__title">
          <Icon.Grid className="grid__icon" />
        </div>
      </section>


      {userProfile.posts.length ? (

        <InfiniteScroll
          dataLength={userProfile.posts.length}
          next={(() => queryClient.refetchQueries('profile'))}
          hasMore={true}
          className="posts__gallery"
          loader={
            <h4 style={{ textAlign: "center" }}>
              <LoaderSpinner />
            </h4>

          }
          endMessage={<p>...</p>}
        >
          {userProfile.posts.map((post) => {
            return (
              <PostCard
                //src={post.postMedia}
                key={uuidv4()}
                alt="post image"
                post={post}
              />
            );
          })}
        </InfiniteScroll>


      ) : (
        <EmptyProfile />
      )}



    </div>
  );
};

export default ProfilePage;
