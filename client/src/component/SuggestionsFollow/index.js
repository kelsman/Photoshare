import React, { useEffect } from 'react';
import './style.scss';
import { useDispatch, useSelector } from 'react-redux';
import Profile from '../Profile';
import axios from 'axios';
import { useQuery, useQueryClient } from 'react-query';
import FollowButton from '../FollowButton';
import Avatar from '../../assets/default-avatar.png'

const token = localStorage.getItem('authToken');
const baseUrl = process.env.REACT_APP_BASE_URL;

const Suggestions = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient()





  return (
    <div className="suggestions">
      <div className="titleContainer">
        <div className="title">Suggestions For You</div>
      </div>

      {
        queryClient.getQueryData("fetchsuggestedusers")
        &&
        queryClient.getQueryData("fetchsuggestedusers").users.map((user) => {
          return (
            <div key={user._id} style={{ display: 'flex', width: '100%' }}>
              <Profile
                key={user._id}
                accountName={user.name}
                caption={user.username}
                userId={user._id}
                urlText="Follow"
                iconSize="medium"
                captionSize="small"
                storyBorder={true}
                image={user.avatar ? user.avatar : Avatar}
                authorUsername={user.username}
              />

              <FollowButton
                userId={user._id}
                avatar={user.avatar}
                username={user.username}
                following={false}
              />
            </div>
          );
        })}
    </div>
  );
};

export default Suggestions;
