import React, { useEffect } from 'react';
import './style.scss';

import * as Icon from 'react-feather';

import { connect } from 'react-redux';

const ExploreCardMenu = ({ focus, likeFunc, userpost, user, isLiked, setIsLiked }) => {
  // const [isLiked, setIsLiked] = React.useState(undefined);

  useEffect(() => {
    let sub = true;
    if (sub) {
      if (user && userpost && userpost.likes && userpost.likes.length) {
        const doesLiked = userpost.likes.find((like) => {
          return like._user === user._id;
        });
        if (doesLiked) {
          setIsLiked(true);
        }
      }
    }
    return () => null;
  }, []);

  return (
    <div className="cardMenu">
      <div className="interactions">
        {
          isLiked ?
            <Icon.Heart
              className="icon__heart"
              onClick={likeFunc}
              fill="red"
              size={40}
            /> :
            <Icon.Heart
              fill="whitesmoke"
              size={40}
              onClick={likeFunc}
              className="icon__heart"
            />
        }
        {/* <input type="checkbox" class="like-btn" />
        <i class="fa fa-heart"></i> */}
        {/*   <Icon.ThumbsDown className="icon" onClick={unlikeFunc} /> */}
        <Icon.MessageCircle className="icon" onClick={focus} size={30} />
        <Icon.Share className="icon" size={30} />
      </div>
      <Icon.Bookmark className="icon" />
    </div>
  );
};

function mapStateToProps({ user }) {
  return {
    user: user.currentUser,
  };
}
export default connect(mapStateToProps, null)(ExploreCardMenu);
