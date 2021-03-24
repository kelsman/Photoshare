import { suggestedUserTypes } from './ActionTypes';
import { setToken } from '../../utils';
import cogoToast from 'cogo-toast';
import axios from 'axios';
const token = localStorage.getItem('authToken');

export const getSuggestedUser = () => async (dispatch) => {
  if (token) {
    setToken(token);
  }
  try {
    const response = await axios.get('api/route/user/suggestedUsers');
    if (response) {
      dispatch({
        type: suggestedUserTypes.FETCH_SUGGESTED_USERS_SUCCESS,
        payload: response.data.users,
      });
    }
  } catch (error) {
    if (error.response) {
      dispatch({
        type: suggestedUserTypes.FETCH_SUGGESTED_USERS_FAIL,
        payload: error.response.data,
      });
      cogoToast.error(`${error.response.data.msg}`);
    }
  }
};
