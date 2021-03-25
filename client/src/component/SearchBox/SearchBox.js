import React, { Fragment, useState, useRef, useEffect } from 'react';
import './style.scss';
import axios from 'axios';
import { setToken } from '../../utils'
import * as Icon from 'react-feather';
import * as Routes from '../routes';
import Divider from '../Divider'


import PopUpCard from '../UsersPopUpCard/PopUpCard';
import Loader from '../Loader';
import Avatar from '../../assets/default-avatar.png';
import { v4 as uuidv4 } from 'uuid';
import { useHistory } from 'react-router-dom'
const token = localStorage.getItem('authToken');

const SearchBox = ({ }) => {
  const [query, setQuery] = useState('');
  const [userDetails, setUserDetails] = useState([])
  const [isSearching, setIsSearching] = useState(undefined);
  const [errorMsg, setErrorMsg] = useState('')
  const inputRef = useRef();
  const history = useHistory();

  const fetchUsers = async (query) => {
    if (token) {
      setToken(token)
    }
    try {
      await setIsSearching(true)
      await setQuery(query);

      const res = await axios.get(`/api/route/user/search-users/${query}`)
      if (res) {
        await setUserDetails(res.data.users);
        await setIsSearching(false);


      }

    } catch (error) {
      console.log(error.message)
      if (error.response) {
        setErrorMsg(error.response.data.msg)
        setIsSearching(false)

      }
    }
  }
  useEffect(() => {
    if (query.length < 1) {
      setUserDetails([])
    }
    return () => null
  }, [query])
  return (
    <Fragment>
      <form className="search-box" onSubmit={(event) => event.preventDefault()}>
        <input
          ref={inputRef}
          onChange={(e) => fetchUsers(e.target.value)}
          onClick={(onClick) => console.log('serach ready')}
          value={query}
          className="search-box__input"
          placeholder="Search"
        />
        <span className="search-box__placeholder">
          <Icon.Search className="searchbox__icon" size={16} />
          {/* fetching && <Loader /> */}
          {isSearching && query.length > 0 && <Loader />}
        </span>
      </form>
      {isSearching === false && query.length > 0 && (
        <PopUpCard hide={() => setQuery('')}>
          { userDetails && userDetails.length > 0 && userDetails.map(({ avatar, name, username }, idx) => {
            return (
              <Fragment key={uuidv4()}>
                <li className="search__list"
                  onClick={() => history.push(Routes.ProfilePage + `/${username}`)}
                >
                  <img src={avatar ? avatar : Avatar} alt="" width={30} height={30} />
                  <div>
                    <h5>{username}</h5>
                    <h6>{name}</h6>
                  </div>
                </li>
                { userDetails.length !== idx + 1 && <Divider />}
              </Fragment>
            )
          })}
          {errorMsg && userDetails.length === 0 && <p> {errorMsg}</p>}
        </PopUpCard>

      )}
    </Fragment>
  );
};

export default SearchBox;
