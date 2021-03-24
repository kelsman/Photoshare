import React from 'react';
import './style.scss';
import Card from './Card';
// import { useHistory } from 'react-router-dom';

import { useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

const Cards = ({ isFetching }) => {
  const posts = useSelector(({ feed }) => feed.posts);

  if (isFetching) {
    return <p> Loading</p>;
  }

  return (
    <div className="cards">
      {/* stories components for later */}
      {!posts.length && (
        <div style={{ marginTop: '20px' }}>
          {' '}
          <p> you have no posts yet follow more people to see their posts</p>{' '}
        </div>
      )}
      {posts &&
        posts.map((post) => {
          return (
            <Card
              feed={post}
              avatar={post.author.avatar}
              key={uuidv4()}
              accountName={post.author.username}
              storyBorder={true}
              image={post.postMedia}
              comments={post.comments ? post.comments : null}
              likedByText={post.postLikes ? post.likes.username : null}
              // likedByNumber={feed.postLikes && feed.postLikes.likes ? feed.postLikes.likes.length : "Be the first to Like this"}
              hours={16}
            />
          );
        })}
      {/*    <Card
                accountName="mapvault"
                image="https://picsum.photos/800"
                comments={commentsTwo}
                likedByText="therealadamsavage"
                likedByNumber={47}
                hours={12}
            /> */}
    </div>
  );
};

export default Cards;
