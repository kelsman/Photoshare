import React, { useEffect } from 'react';
import './style.scss';

import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { loaduser } from '../../redux/Actions/userActions';
import { retrieveFeedPosts } from '../../redux/Actions/postActions';
import { retrieveFeedPostsStart } from '../../redux/feed/feedAction';

// import Header from '../../component/Header';

import Menu from '../../component/MenuButtons';
import NavigationHeader from '../../component/NavigationHeader';
import SideBar from '../../component/SideBar';
import Cards from '../../component/Cards';
import Loader from '../../component/Loader';

const token = localStorage.getItem('authToken');

const HomeScreen = ({
  loaduser,
  currentUser,
  retrieveFeedPosts,
  retrieveFeedPostsStart,
  posts,
}) => {
  const [isFetching, setIsFetching] = React.useState(true);

  const history = useHistory();

  useEffect(() => {
    let subscribe = true;
    const retrivefeed = async () => {
      await retrieveFeedPostsStart(history);
      setIsFetching(false);
    };
    if (subscribe) {
      retrivefeed();
    }
    return () => (subscribe = null);
  }, [retrieveFeedPostsStart]);

  if (!posts && isFetching === true) {
    return <Loader />;
  }

  return (
    <div className="homeScreen">
      {/*  the navigation Header */}
      <NavigationHeader />

      {/* main */}
      <main>
        <div className="container">
          <Cards isFetching={isFetching} />
          <SideBar />
        </div>
      </main>
    </div>
  );
};

const mapStateToProps = ({ user, post, feed }) => {
  return {
    currentUser: user.currentUser,
    posts: feed.posts,
  };
};

export default connect(mapStateToProps, { loaduser, retrieveFeedPosts, retrieveFeedPostsStart })(
  HomeScreen,
);
