import {
  loginFailure,
  loginRequest,
  loginSuccess,
  userFailure,
  userRequest,
  userSuccess,
} from './reducer';
import api from '../api/configAxios';
import {addTaskFailure, addTaskRequest, addTaskSuccess} from './messageReducer';

export const login = (email, password) => async dispatch => {
  try {
    dispatch(loginRequest());
    const {data} = await api.post('login', {email, password});
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

export const addTask = (title, description) => async dispatch => {
  try {
    dispatch(addTaskRequest());
    const {data} = await api.post('addtask', {
      title,
      description,
    });
    dispatch(addTaskSuccess(data.message));
  } catch (error) {
    dispatch(addTaskFailure(error.response.data.message));
  }
};
