import React, { useState, useEffect, Fragment } from 'react';
import './style.scss';
// Components
import Avatar from '../../assets/default-avatar.png';
import EmptyProfile from './EmptyProfile/EmptyProfile';
import Divider from '../../component/Divider';
import * as Routes from '../../component/routes';
import FollowButton from '../../component/FollowButton';
import * as Icon from 'react-feather';
import PostCard from '../../component/Explorepostcard/PostCard';
import Loader from '../../component/Loader';
import LoaderSpinner from '../../component/LoaderSpinner';
import ModalComponent from '../../component/Modal';
import Profile from '../../component/Profile';
import MobileHeader from '../../component/NavigationHeader/MobileHeader'

// External Libraries
import { useParams, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { getProfile } from '../../api/profile.api';
import InfiniteScroll from 'react-infinite-scroll-component';
// redux

import { LogOut } from '../../redux/Actions/userActions';
import { useDispatch } from 'react-redux';

// react-query
import { useQuery, useQueryClient } from "react-query"


const token = localStorage.getItem('authToken');
const baseUrl = process.env.REACT_APP_BASE_URL;

const ProfilePage = () => {
  // const [profile, setProfile] = useState(undefined);
  const [showOptionsModal, setShowOptionsModal] = useState(false);
  const [showFollowersModal, setShowFollowersModal] = useState(false);
  const [showFollowingModal, setShowFollowingModal] = useState(false)

  const { username } = useParams();
  const currentUser = useSelector(({ user }) => user.currentUser);
  const history = useHistory();
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  useEffect(() => {
    document.title = `@${username} .PhotoShare Photos`;
    return () => null;
  }, []);

  const { data: userProfile, isLoading, isError, error, isSuccess } = useQuery(["profile", username], () => getProfile(username))

  if (isLoading) {
    return <Loader />;
  }
  // let isFollowing;

  // if (isSuccess) {
  //   if (userProfile.followers) {
  //     isFollowing = userProfile.followers.find((follow) => {
  //       return follow.user === String(currentUser._id)
  //     });

  //   }
  // }



  if (!userProfile) {
    return null;
  }

  return (
    <div className="profilepage__container">

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
                  following={currentUser.following && currentUser.following.find((id) => id.user === userProfile._id ? true : false)}
                />
              ) : (
                <Fragment>
                  <button
                    className="editprofile__btn"
                    onClick={() => history.push(Routes.SettingsPage)}
                  >
                    Edit Profile
                  </button>

                  <Icon.Settings className="settings_btn" onClick={() => setShowOptionsModal(true)} />

                </Fragment>
              )}
            </div>

            <div className="follow__details">
              <small>
                {userProfile.posts && userProfile.posts.length ? userProfile.posts.length : 0} posts
              </small>
              <small onClick={() => setShowFollowersModal(true)}>
                {userProfile.followers && userProfile.followers.length ? userProfile.followers.length : 0}{' '}
                {userProfile.followers && userProfile.followers.length < 2 ? "follower" : "followers"}
              </small>
              <small onClick={() => setShowFollowingModal(true)}>
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
          next={(() => queryClient.refetchQueries(['profile', `${username}`]))}
          // hasMore={true}
          className="posts__gallery"
          loader={
            <h4 style={{ textAlign: "center" }}>
              <LoaderSpinner />
            </h4>

          }
        // endMessage={<p>...</p>}
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
        <EmptyProfile
          currentUserProfile={currentUser.username === username}
          username={username}
        />
      )}


      <ModalComponent open={showOptionsModal} hide={() => setShowOptionsModal(false)}>
        <ul className="settings__options">
          <li onClick={async () => {
            await dispatch(LogOut(history))
            queryClient.clear()

          }
          }>Log Out</li>
          <Divider />
          <li onClick={() => history.push(Routes.SettingsPage + `/password`)}>Change Password</li>
          <Divider />
          <li style={{ color: "tomato" }} onClick={() => setShowOptionsModal(false)}> Cancel</li>
        </ul>

      </ModalComponent>
      {/* followers modal */}
      <ModalComponent open={showFollowersModal} hide={() => setShowFollowersModal(false)}>
        <ul className="followers__modal__list">
          <h5 style={{ textAlign: "center", padding: "5px", fontWeight: "150" }}>Followers</h5>
          <Divider />
          {
            userProfile.followers && userProfile.followers.length > 0 ?
              userProfile.followers.map((follower) => (
                <li key={uuidv4()}>
                  {/*   <img src={follower.avatar} alt="" /> */}
                  <Profile
                    accountName={follower.name}
                    caption={follower.username}
                    userId={follower.user}
                    iconSize="medium"
                    captionSize="small"
                    storyBoarder={false}
                    image={follower.avatar}
                    authorUsername={follower.username}
                  />
                  {
                    currentUser.id === userProfile._id ?
                      <FollowButton
                        userId={follower.user}
                        avatar={follower.avatar}
                        username={follower.username}
                        following={userProfile.following.find((id) => id.user === follower.user) ? true : false}
                      /> :
                      <FollowButton
                        userId={follower.user}
                        avatar={follower.avatar}
                        username={follower.username}
                        following={currentUser.following && currentUser.following.find((id) => id.user === follower.user) ? true : false}
                      />
                  }

                </li>
              )) :
              <h5> zero followers</h5>
          }

        </ul>

      </ModalComponent>
      {/* following modal */}

      <ModalComponent open={showFollowingModal} hide={() => setShowFollowingModal(false)}>
        <ul className="followers__modal__list">
          <h5 style={{ textAlign: "center", padding: "5px", fontWeight: "150" }}>Following</h5>
          <Divider />
          {
            userProfile.following && userProfile.following.length > 0 ?
              userProfile.following.map((following) => (
                <li key={uuidv4()}>
                  {/*   <img src={follower.avatar} alt="" /> */}
                  <Profile
                    accountName={following.name}
                    caption={following.username}
                    userId={following.user}
                    iconSize="medium"
                    captionSize="small"
                    storyBoarder={false}
                    image={following.avatar}
                    authorUsername={following.username}
                  />
                  {
                    currentUser.id === userProfile._id ?
                      <FollowButton
                        userId={following.user}
                        avatar={following.avatar}
                        username={following.username}
                        following={userProfile.following && userProfile.following.find((id) => id.user === following.user) ? true : false}
                      /> :
                      <FollowButton
                        userId={following.user}
                        avatar={following.avatar}
                        username={following.username}
                        following={currentUser.following && currentUser.following.find((id) => id.user === following.user) ? true : false}
                      />
                  }

                </li>
              )) :
              <h5> zero Followings</h5>
          }

        </ul>

      </ModalComponent>
    </div>
  );
};

export default ProfilePage;
