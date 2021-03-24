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

const token = localStorage.getItem('authToken');

const ProfilePage = () => {
  const [profile, setProfile] = useState(undefined);
  const { username } = useParams();
  const currentUser = useSelector(({ user }) => user.currentUser);
  const history = useHistory();

  useEffect(() => {
    let sub = true;
    if (sub) {
      getProfile();
    }

    return () => (sub = null);
  }, []);
  const getProfile = async () => {
    if (token) {
      setToken(token);
    }
    const config = {
      headers: {
        'Content-Type': 'applocation/json',
      },
    };
    try {
      const response = await axios.get(`/api/route/user/userprofile/${username}`, config);
      if (response) {
        const data = response.data.userProfile[0];
        await setProfile(data);
      }
    } catch (error) {
      if (error) {
        cogoToast.error(`${error.message}`);
      }
      console.log(error);
    }
  };

  if (!profile) {
    return <Loader />;
  }

  return (
    <div className="profilepage__wrapper">
      <header className="header">
        <div className="header__content">
          <div className="profile__image">
            <img src={profile.avatar ? profile.avatar : Avatar} alt="" />
          </div>
          <div className="profile__details">
            <div className="username">
              <h2> {profile.username}</h2>
              {currentUser && profile && profile._id !== currentUser._id ? (
                <FollowButton userId={profile && profile._id} />
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
                {profile.posts && profile.posts.length ? profile.posts.length : 0} posts
              </small>
              <small>
                {profile.followers && profile.followers.length ? profile.followers.length : 0}{' '}
                followers
              </small>
              <small>
                {' '}
                {profile.following && profile.following.length ? profile.following.length : 0}{' '}
                following
              </small>
            </div>

            <div className="name">
              <p> {profile.name}</p>
            </div>
          </div>
        </div>
      </header>

      <section style={{ width: '100%' }}>
        <div className="post__title">
          <Icon.Grid className="grid__icon" />
        </div>
      </section>

      {profile.posts ? (
        <div className="posts__gallery">
          {profile.posts.map((post) => {
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
        <h4> no posts to show </h4>
      )}

      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default ProfilePage;
