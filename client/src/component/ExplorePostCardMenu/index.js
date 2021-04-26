import React, { useEffect, useState } from 'react';
import './style.scss';

import * as Icon from 'react-feather';

import { connect } from 'react-redux';
import styled from "styled-components";

import Heart from 'react-animated-heart'



const ExploreCardMenu = ({ focus, likeFunc, userpost, user, isLiked, setIsLiked, hasUserLiked }) => {
  const [isLiked, setIsLiked] = React.useState(feed.hasLiked);

  useEffect(() => {
    let sub = true;
    if (sub) {
      if (user && userpost && userpost.likes && userpost.likes.length) {
        const doesLiked = userpost.likes.find((like) => {
          return like._user === user._id;
        });
        if (doesLiked) setIsLiked(true);

      }
    }
    return () => null;
  }, []);



  return (
    <div className="cardMenu">
      <div className="interactions">



        <Icon.Heart
          fill={isLiked ? "red" : "whitesmoke"}
          // size={25}
          onClick={likeFunc}
          className="icon__heart"
          id="like__btn"
          style={{ marginRight: "10px" }}
        />

        <Icon.MessageCircle className="icon" onClick={focus} size={30} />
        {/*   <Icon.Share className="icon" size={30} /> */}
      </div>
      {/*  <Icon.Bookmark className="icon" /> */}
    </div>
  );
};

function mapStateToProps({ user }) {
  return {
    user: user.currentUser,
  };
}
export default connect(mapStateToProps, null)(ExploreCardMenu);
