import React, { useEffect } from 'react';
import './style.scss';

import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { loaduser } from '../../redux/Actions/userActions';
import { useQuery, useQueryClient } from 'react-query';
import * as Routes from '../../component/routes'

// import Header from '../../component/Header';

import Menu from '../../component/MenuButtons';
import NavigationHeader from '../../component/NavigationHeader';
import SideBar from '../../component/SideBar';
import Cards from '../../component/Cards';
import Loader from '../../component/Loader';
import { retrieveFeedPosts } from '../../api/posts.api';
import SuggestionCard from '../../component/SuggestionsFollow/suggestionCard';


const token = localStorage.getItem('authToken');

const HomeScreen = () => {

  const history = useHistory();

  const queryClient = useQueryClient();
  const { data, isLoading, isError, isSuccess } = useQuery('fetchfeeds', () => retrieveFeedPosts(history))

  if (!token) {
    history.push(Routes.Login)
  }



  if (isLoading) {
    return <Loader />;
  }


  return (
    <div className="homeScreen">
      {/*  the navigation Header */}
      <NavigationHeader />

      {/* main */}
      <main className="main">
        {
          queryClient.getQueryData('fetchsuggestedusers') && (
            <section className="mobile__suggestionCard">
              <SuggestionCard />
            </section>

          )
        }
        <div className="container">
          <Cards posts={data} />
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

export default connect(mapStateToProps, null)(
  HomeScreen,
);
