import React, { useEffect, Fragment, useRef, useState } from 'react';
import './style.scss';
import Card from './Card';
// import { useHistory } from 'react-router-dom';
import Divider from '../Divider'
import { useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import * as Icon from 'react-feather';
import { useQueryClient, useInfiniteQuery, useQuery } from 'react-query';
import { retrieveFeedPosts } from '../../api/posts.api';
import LoaderSpinner from '../../component/LoaderSpinner'
import useIntersectionObserver from '../../CustomHooks/useIntersectionObserver';
import InfiniteScroll from 'react-infinite-scroll-component';
// import InfiniteScroll from 'react-infinite-scroller';
import Loader from '../Loader';
import Stories from '../Stories/Stories';

const skip_Number = 0;
const Cards = () => {

  const queryClient = useQueryClient();
  const data = queryClient.getQueryData(['fetchfeeds'])
  const [offset, setOffset] = useState(0);

  const { data: feedsData,
    hasNextPage,
    fetchNextPage,
    getNextPageParam,
    isFetchingNextPage,
    isFetching,
    status,
    error,
  } = useInfiniteQuery('feedsData', retrieveFeedPosts, {
    getNextPageParam: (lastPageInfo, allPages) => lastPageInfo.next
  });


  const currentUser = useSelector(({ user }) => user.currentUser);

  if (status === 'loading') {
    return <p> ....</p>
  }
  if (status === 'error') {
    return <p> {error.message}</p>
  }
  return (

    <div className="cards">
      {/* <Stories /> */}
      { feedsData?.pages.map((page, i) => {
        return (
          <Fragment key={i}>
            {page?.posts.map((post, index) => {
              return (
                <Fragment key={index}>
                  <Card
                    feed={post}
                    avatar={post.author.avatar}
                    key={index}
                    accountName={post.author.username}
                    storyBorder={true}
                    image={post.postMedia}
                    comments={post.comments ? post.comments : null}
                    likedByText={post.postLikes ? post.likes.username : null}
                    // likedByNumber={feed.postLikes && feed.postLikes.likes ? feed.postLikes.likes.length : "Be the first to Like this"}
                    hours={post.date}
                  />
                </Fragment>
              )
            })}
          </Fragment>

        )
      })}
      {
        hasNextPage ? (
          <div className="load__more__btn__wrapper">
            <button
              className="load__more__btn"
              onClick={() => fetchNextPage()}
              disabled={!hasNextPage || isFetchingNextPage}
            >
              {isFetchingNextPage
                ? 'Loading more...'
                : hasNextPage
                  ? 'Load More'
                  : 'Nothing more to load'}
            </button>
          </div>
        ) : (
          <>
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

            <div>{isFetching && !isFetchingNextPage ? 'Fetching...' : null}</div>
          </>
        )
      }
    </div>
  )
};

export default Cards;

{/* stories components for later */ }
{/* 
        !currentUser.following.length && (
          <div style={{ marginTop: '10vh', padding: "10px" }}>
            {' '}
            <h3 > Welcome to Photogram</h3>
            <p> When you follow somebody you can see their posts here</p>{' '}
          </div>
        ) */}
{/* <div >
        <InfiniteScroll
          dataLength={current.length}
          next={getMoreData}
          hasMore={hasMore}
          loader={<p> Loading.... </p>}
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
          {current.map((post, index) => {
            return (
              <Card
                feed={post}
                avatar={post.author.avatar}
                key={index}
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

        </InfiniteScroll> */}
