import {
  loginFailure,
  loginRequest,
  loginSuccess,
  userFailure,
  userRequest,
  userSuccess,
} from './reducer';
import api from '../api/configAxios';
import {
  addTaskFailure,
  addTaskRequest,
  addTaskSuccess,
  deleteTaskFailure,
  deleteTaskRequest,
  deleteTaskSuccess,
  updateTaskFailure,
  updateTaskRequest,
  updateTaskSuccess,
} from './messageReducer';

export const login = (email, password) => async dispatch => {
  try {
    dispatch(loginRequest());
    const {data} = await api.post('login', {email, password});
    console.log('user loggedin', data);
    dispatch(loginSuccess(data));
  } catch (error) {
    dispatch(loginFailure(error.response.data.message));
  }
};

export const loadUser = () => async dispatch => {
  try {
    dispatch(userRequest());
    console.log('user creds requested');
    const {data} = await api.get('getmyprofile');
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
export const updateTask = taskId => async dispatch => {
  try {
    dispatch(updateTaskRequest());
    const {data} = await api.get(`task/${taskId}`);
    dispatch(updateTaskSuccess(data.message));
  } catch (error) {
    dispatch(updateTaskFailure(error.response.data.message));
  }
};
export const deleteTask = taskId => async dispatch => {
  try {
    dispatch(deleteTaskRequest());
    const {data} = await api.delete(`task/${taskId}`);
    dispatch(deleteTaskSuccess(data.message));
  } catch (error) {
    dispatch(deleteTaskFailure(error.response.data.message));
  }
};
