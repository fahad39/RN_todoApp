import {loginFailure, loginRequest, loginSuccess} from './reducer';
import api from '../api/configAxios';
import {userFailure, userRequest, userSuccess} from './userReducer';

export const login = (email, password) => async dispatch => {
  try {
    dispatch(loginRequest());
    const {data} = await api.post('login', {email, password});
    console.log('response data', data);
    dispatch(loginSuccess(data));
  } catch (error) {
    dispatch(loginFailure(error.response.data.message));
  }
};

export const getMyProfile = () => async dispatch => {
  try {
    dispatch(userRequest());
    const {data} = await api.get('me');
    console.log('response data', data);
    dispatch(userSuccess(data));
  } catch (error) {
    dispatch(userFailure(error.response.data.message));
  }
};
