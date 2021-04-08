import React, { useEffect } from 'react';
import './style.scss';
import { useDispatch, useSelector } from 'react-redux';
import Profile from '../Profile';
import axios from 'axios';
import { useQuery } from 'react-query';
import FollowButton from '../FollowButton';

const token = localStorage.getItem('authToken');
const baseUrl = process.env.REACT_APP_BASE_URL;

const Suggestions = () => {
  const dispatch = useDispatch();
  const suggestedUsers = useSelector(({ suggestedUsers }) => suggestedUsers.suggestedUsers);
  const currentUser = useSelector(({ user }) => user.currentUser)


  const { data, isLoading, isError, error, isSuccess } = useQuery('fetchsuggestedusers', async () => {
    const res = await axios.get(`${baseUrl}/api/route/user/suggestedUsers`, {
      headers: {
        "Content-Type": "application/json",
        'x-auth-token': token
      }
    })
    return res.data


  })

  if (isLoading) {
    return <p> Loading...</p>;
  }
  if (isError) {
    return <p> {error.message}</p>
  }
  return (
    <div className="suggestions">
      <div className="titleContainer">
        <div className="title">Suggestions For You</div>
      </div>

      {
        data.users.map((user) => {
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
                image={user.avatar}
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
