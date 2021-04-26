import React, { useEffect, useState, Fragment } from 'react';
import './style.scss';

import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { loaduser } from '../../redux/Actions/userActions';
import { useQuery, useQueryClient, useInfiniteQuery } from 'react-query';
import * as Routes from '../../component/routes'
import * as Icon from 'react-feather';

// import Header from '../../component/Header';
import SideBar from '../../component/SideBar';
import Cards from '../../component/Cards';
import Loader from '../../component/Loader';
import { retrieveFeedPosts } from '../../api/posts.api';
import { getSuggestedUsers } from '../../api/suggestedusers.api';
import SuggestionCard from '../../component/SuggestionsFollow/suggestionCard';
import { loadUser } from '../../api/auth.api';
import MobileHeader from '../../component/NavigationHeader/MobileHeader';
import Stories from '../../component/Stories/Stories';


const token = localStorage.getItem('authToken');

const HomeScreen = ({ currentUser, isAuthenticated }) => {

  const [showSuggestions, setShowSuggestions] = useState('falses');
  const history = useHistory();
  const queryClient = useQueryClient();
  // const [skip, setSkip] = useState(0)
  const { data, isLoading, isError, isSuccess, isFetching } = useQuery(['fetchfeeds'], retrieveFeedPosts);
  const { data: suggestedUsers, isLoading: fetchingSuggestedUsers } = useQuery('fetchsuggestedusers', getSuggestedUsers);

  const fetchStatus = { isLoading, fetchingSuggestedUsers }

  if (!token) {
    history.push(Routes.Login)
  }

  if (isLoading && fetchingSuggestedUsers && !currentUser) {
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
        {/* Stories  */}

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
          <Cards />
          {
            queryClient.getQueryData('fetchsuggestedusers') &&
            <SideBar />
          }


        </div>
      </main>
      {/* <MobileTabMenu /> */}
    </div>
  );
}

const mapStateToProps = ({ user }) => {
  return {
    currentUser: user.currentUser,
    isAuthenticated: user.isAuthenticated
  };
};

export default connect(mapStateToProps, { loaduser })(
  HomeScreen,
);
