import React from 'react';
import './style.scss';
import * as Icon from 'react-feather';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import * as Routes from '../routes';
import {
  Tooltip,
} from 'react-tippy';
import Avatar from '../../assets/default-avatar.png'
import NewPostButton from '../NewPost/NewPostButton'

const MobileTabMenu = ({ user }) => {
  const history = useHistory();
  // console.log(history);
  const { location } = history;
  return (
    <nav className="mobile__nav">
      <Link to={Routes.Dashboard} >
        <Icon.Home size={30} />
      </Link>
      <Link to={Routes.Explore}>
        <Icon.Search className="icon__search" size={30} />
      </Link>

      <NewPostButton />

      <Tooltip
        position="top"
        title="coming soon"
        trigger="click"
        animation="scale"
        arrow="true"

      >
        <Icon.Bell className="icon__heart" size={30} />
      </Tooltip>

      {user && (
        <Link to={Routes.ProfilePage + `/${user.username}`}>
          <img src={user.avatar ? user.avatar : Avatar} alt="avatar" width="26px" height="26px" />
        </Link>
      )}
    </nav>
  );
};

const mapStateTOProps = ({ user }) => ({
  user: user.currentUser,
});
export default connect(mapStateTOProps)(MobileTabMenu);
