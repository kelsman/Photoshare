import React, { useState, Fragment, useEffect } from 'react';
import './style.scss';

import { useSelector, useDispatch } from 'react-redux';
import { ReactComponent as LoaderSvg } from '../../assets/loader.svg';
import axios from 'axios';
import CogoToast from 'cogo-toast';
import { setToken } from '../../utils';
import cogoToast from 'cogo-toast';
import Loader from '../Loader';
const token = localStorage.getItem('authToken');

const FollowButton = ({ userId }) => {
  const dispatch = useDispatch();
  const currentUser = useSelector(({ user }) => user.currentUser);

  const [following, setFollowed] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUnfollow = async () => {
    if (token) {
      setToken(token);
    }
    try {
      setLoading(true);
      const response = await axios.post(`/api/route/user/unfollow/${userId}`);
      if (response) {
        cogoToast.success(`${response.data.msg}`);
        setLoading(false);
        setFollowed(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
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
      setLoading(true);
      const response = await axios.post(`/api/route/user/follow/${userId}`);
      if (response) {
        cogoToast.success(`${response.data.msg}`);
        setLoading(false);
        setFollowed(true);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      if (error.response) {
        cogoToast.error(`${error.response.data.msg}`);
      }
    }
  };

  useEffect(() => {
    if (currentUser) {
      const isFollowed = currentUser.following.find((follow) => follow.user === userId);
      if (isFollowed) {
        setFollowed(true);
      } else {
        setFollowed(false);
      }
    }

    return () => null;
  }, []);

  if (currentUser && currentUser._id == userId) {
    return <button disabled>follow</button>;
  }
  if (following) {
    return (
      <button className="follow_btn" onClick={handleUnfollow}>
        UnFollow
        {loading && <LoaderSvg />}
      </button>
    );
  }
  return (
    <Fragment>
      {!following && (
        <button className="follow_btn" onClick={handleFollow}>
          Follow
          {loading && <LoaderSvg />}
        </button>
      )}
    </Fragment>
  );
};

export default FollowButton;
