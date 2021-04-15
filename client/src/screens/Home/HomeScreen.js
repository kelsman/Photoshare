import React, { useEffect, useState, Fragment } from 'react';
import './style.scss';

import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { loaduser } from '../../redux/Actions/userActions';
import { useQuery, useQueryClient, useQueries } from 'react-query';
import * as Routes from '../../component/routes'

// import Header from '../../component/Header';
import Menu from '../../component/MenuButtons';
import NavigationHeader from '../../component/NavigationHeader';
import SideBar from '../../component/SideBar';
import Cards from '../../component/Cards';
import Loader from '../../component/Loader';
import { retrieveFeedPosts } from '../../api/posts.api';
import { getSuggestedUsers } from '../../api/suggestedusers.api';
import SuggestionCard from '../../component/SuggestionsFollow/suggestionCard';
import { loadUser } from '../../api/auth.api';
import MobileHeader from '../../component/NavigationHeader/MobileHeader';
import LogoText from '../../component/NavigationHeader/MobileHeader';
const token = localStorage.getItem('authToken');

const HomeScreen = ({ currentUser, isAuthenticated }) => {

  const history = useHistory();
  const queryClient = useQueryClient()
  const [isLoadingUser, setIsLoadingUser] = useState(false)
  const { data, isLoading, isError, isSuccess, isFetching } = useQuery(['fetchfeeds'], () => retrieveFeedPosts(history), {
    staleTime: 60 * 2000,
  });
  const { data: suggestedUsers, isLoading: fetchingSuggestedUsers } = useQuery('fetchsuggestedusers', getSuggestedUsers);
  const fetchStatus = { isLoading, fetchingSuggestedUsers }
  // const { data: currentUser, isLoading: isgettingUser, isError: getUserError, isSuccess: getUserSuccess } = useQuery(['getUser', token], loadUser);

  if (!token) {
    history.push(Routes.Login)
  }


  if (isLoading && fetchingSuggestedUsers) {
    return <Loader />;
  }

  return (
    <div className="homeScreen">
      <MobileHeader>
        <h3></h3>
        <h2 style={{ textAlign: "center" }} className="logo" onClick={() => history.push(Routes.Dashboard)}> Photogram</h2>
      </MobileHeader>
      {/* main */}
      <main className="main">
        {
          queryClient.getQueryData('fetchsuggestedusers') && (
            <Fragment>
              {/* <p style={{ padding: "0px 20px" }}> People To Follow</p> */}
              <section className="mobile__suggestionCard">
                <SuggestionCard />
              </section>
            </Fragment>
          )
        }
        <div className="container">
          {/* <PulsatingIcon /> */}
          <Cards posts={data} />
          <SideBar />
        </div>
      </main>
    </div>
  );
}

const mapStateToProps = ({ user, post, feed }) => {
  return {
    currentUser: user.currentUser,
    posts: feed.posts,
    isAuthenticated: user.isAuthenticated
  };
};

export default connect(mapStateToProps, { loaduser })(
  HomeScreen,
);
