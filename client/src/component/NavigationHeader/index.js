import React from 'react';
import './style.scss';

import SearchBox from '../SearchBox/SearchBox';
import Menu from '../MenuButtons';

import * as Routes from '../routes';
import { useHistory } from 'react-router-dom';

const NavigationHeader = () => {
  const history = useHistory();
  return (
    <div className="navigation">
      <div className="container">
        <h2 className="logo" onClick={() => history.push(Routes.Dashboard)}>
          {' '}
          Photogram
        </h2>
        <div className="search">
          <SearchBox />
        </div>
        <Menu />
      </div>
    </div>
  );
};

export default NavigationHeader;
