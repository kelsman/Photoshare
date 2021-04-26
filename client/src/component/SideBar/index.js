import React from 'react';
import Sticky from 'react-sticky-el';
import ProfileIcon from '../ProfileIcon';
import './style.scss';
import { connect } from 'react-redux';
import Suggestions from '../SuggestionsFollow';
import Footer from '../Footer';
import Avatar from '../../assets/default-avatar.png'

const SideBar = ({ user }) => {
  return (

    <Sticky topOffset={-80}>

      <div className="sideBar">
        {/*  profile */}
        <div className="profile">
          <ProfileIcon
            iconSize="big"
            image={user.avatar ? user.avatar : Avatar}
            authorUsername={user && user.username}
          />
          <div className="text-container">
            <span className="username">{user && user.username}</span>
            <span className="name">{user && user.name}</span>
          </div>
        </div>
        {/*  suggestions */}
        <Suggestions />

        {/* Footer */}
        <section className="footer__section">
          <Footer />
        </section>
      </div>
    </Sticky>

  );
};

const mapStateToProps = ({ user }) => {
  return {
    user: user.currentUser,
  };
};
export default connect(mapStateToProps, null)(SideBar);
