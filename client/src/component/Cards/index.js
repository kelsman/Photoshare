import React from 'react';
import './style.scss';
import Card from './Card';
// import { useHistory } from 'react-router-dom';
import Divider from '../Divider'
import { useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import * as Icon from 'react-feather';
import { useQueryClient } from 'react-query';
import InfiniteScroll from 'react-infinite-scroll-component';

const Cards = ({ isFetching }) => {

  const queryClient = useQueryClient();
  const posts = queryClient.getQueryData('fetchfeeds')
  const currentUser = useSelector(({ user }) => user.currentUser)

  return (
    <div className="cards">
      {/* stories components for later */}
      {

        !posts && !currentUser.following || currentUser.following && currentUser.following.length === 0 && (
          <div style={{ marginTop: '10vh', padding: "10px" }}>
            {' '}
            <h3 > Welcome to Photogram</h3>
            <p> When you follow somebody you can see their posts here</p>{' '}
          </div>
        )}

      {posts && posts.length > 0 &&

        <InfiniteScroll
          dataLength={posts.length}
          next={() => queryClient.refetchQueries('fetchfeeds')}
          hasMore={false}
          loader={<p> Loading... </p>}
          endMessage={
            <div className="feed__bottom">
              <Divider>
                <Icon.CheckCircle
                  color="blue"
                  size={40}

                />
              </Divider>
              <h2 style={{ textAlign: "center" }}>You're All Caught Up</h2>
              <h4>
                Follow more people to see more posts.
            </h4>
            </div>

          }
        >
          {posts.map((post) => {
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
                hours={post.date}
              />

            );
          })}


        </InfiniteScroll>

      }


    </div>
  );
};

export default Cards;
