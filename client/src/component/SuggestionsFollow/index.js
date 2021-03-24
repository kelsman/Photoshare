import React, { useEffect } from 'react';
import './style.scss';
import { useDispatch, useSelector } from 'react-redux';
import Profile from '../Profile';
import axios from 'axios';

import { getSuggestedUser } from '../../redux/SuggestedUsers/Actions';
import FollowButton from '../FollowButton';

const Suggestions = () => {
  const dispatch = useDispatch();
  const suggestedUsers = useSelector(({ suggestedUsers }) => suggestedUsers.suggestedUsers);

  useEffect(() => {
    dispatch(getSuggestedUser());
  }, []);

  if (!suggestedUsers) {
    return <p> Loading...</p>;
  }
  return (
    <div className="suggestions">
      <div className="titleContainer">
        <div className="title">Suggestions For You</div>
        <a href="/">See All</a>
      </div>

      {suggestedUsers &&
        suggestedUsers.map((user) => {
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

              <FollowButton userId={user._id} />
            </div>
          );
        })}
    </div>
  );
};

export default Suggestions;
