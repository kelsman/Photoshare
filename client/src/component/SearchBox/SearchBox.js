import React, { Fragment, useState } from 'react';
import './style.scss';
import axios from 'axios';
import { setToken } from '../../utils'
import * as Icon from 'react-feather';

const token = localStorage.getItem('authToken');

const SearchBox = ({ }) => {
  const [query, setQuery] = useState('');

  const fetchUsers = async (query) => {
    if (token) {
      setToken(token)
    }
    try {
      await setQuery(query);
      const res = await axios.post(`/api/route/user/search-users/${query}`)
      if (res) {
        console.log(res.data)
      }
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.msg)

      }
    }
  }

  return (
    <Fragment>
      <form className="search-box" onSubmit={(event) => event.preventDefault()}>
        <input
          onChange={(e) => fetchUsers(e.target.value)}
          onClick={(onClick) => console.log('serach ready')}
          value={query}
          className="search-box__input"
          placeholder="Search"
        />
        <span className="search-box__placeholder">
          <Icon.Search className="searchbox__icon" size={16} />
          {/* fetching && <Loader /> */}
        </span>
      </form>
    </Fragment>
  );
};

export default SearchBox;
