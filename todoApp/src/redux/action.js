import {
  loginFailure,
  loginRequest,
  loginSuccess,
  userFailure,
  userRequest,
  userSuccess,
} from './reducer';
import api from '../api/configAxios';

export const login = (email, password) => async dispatch => {
  try {
    dispatch(loginRequest());
    const {data} = await api.post('login', {email, password});
    console.log('respone', data);
    dispatch(loginSuccess(data));
  } catch (error) {
    dispatch(loginFailure(error.response.data.message));
  }
};

export const loadUser = () => async dispatch => {
  try {
    dispatch(userRequest());
    const {data} = await api.get('me');
    console.log('response data', data);
    dispatch(userSuccess(data));
  } catch (error) {
    dispatch(userFailure(error.response.data.message));
  }
};
