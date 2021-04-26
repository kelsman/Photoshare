import React, { useState, Fragment, useEffect } from 'react';
import './style.scss';

import { useSelector, useDispatch } from 'react-redux';
import { ReactComponent as LoaderSvg } from '../../assets/loader.svg';
import axios from 'axios';
import CogoToast from 'cogo-toast';
import { setToken } from '../../utils';
import cogoToast from 'cogo-toast';
import Loader from '../Loader';
import ModalComponent from '../Modal/'
import UnfollowPrompt from '../UnFollowPrompt';
import { useQueryClient, useMutation } from 'react-query';
const token = localStorage.getItem('authToken');
const baseUrl = process.env.REACT_APP_BASE_URL

const FollowButton = ({ userId, avatar, username, following }) => {
  const dispatch = useDispatch();
  const currentUser = useSelector(({ user }) => user.currentUser);
  const [showModal, setShowModal] = useState(false);
  const [isFollowing, setIsFollowing] = useState(following);

  const queryClient = useQueryClient()

  const handleUnfollow = async () => {
    if (token) {
      setToken(token);
    }
    try {
      const response = await axios.post(`${baseUrl}/api/route/user/unfollow/${userId}`);
      if (response) {
        cogoToast.success(`${response.data.msg}`);

      }
    } catch (error) {
      if (error.response) {
        cogoToast.error(`${error.response.data.msg}`);
      }
    }
  };
  const handleFollow = async () => {
    if (token) {
      setToken(token);
    }
    try {
      const response = await axios.post(`${baseUrl}/api/route/user/follow/${userId}`);
      if (response) {
        cogoToast.success(`${response.data.msg}`);


      }
    } catch (error) {
      console.log(error);
      if (error.response) {
        cogoToast.error(`${error.response.data.msg}`);
      }
    }
  };
  const unFollowMutation = useMutation(handleUnfollow, {
    onSuccess: async () => {
      await setIsFollowing(false)
      queryClient.invalidateQueries(['profile', `${username}`])
    }
  });
  const followMutation = useMutation(handleFollow, {
    onSuccess: async () => {
      await setIsFollowing(true)
      queryClient.invalidateQueries(['profile', `${username}`])
    }
  })
  //  functions

  const unfollow = async () => {
    const { mutateAsync } = unFollowMutation
    await mutateAsync()

  }

  const follow = async () => {
    const { mutateAsync } = followMutation
    await mutateAsync()

  }


  if (currentUser && currentUser._id == userId) {
    return <button disabled>follow</button>;
  }

  const openModal = () => setShowModal(true)
  const closeModal = () => setShowModal(false)

  return (
    <Fragment>
      {
        isFollowing ? (
          <button className="Unfollow_btn" onClick={openModal}>
            Following
            {unFollowMutation.isLoading && <Loader />}
          </button>
        ) :
          (
            <button className="follow_btn" onClick={follow}>
              Follow
              {followMutation.isLoading && <Loader />}
            </button>

          )
      }

      <ModalComponent setModal={setShowModal} open={showModal} hide={closeModal}>
        <UnfollowPrompt unfollow={unfollow} closeModal={closeModal} imagesrc={avatar} username={username} />
      </ModalComponent>
    </Fragment>
  );
};

export default FollowButton;
