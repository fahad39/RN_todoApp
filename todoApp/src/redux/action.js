import {
  forgetPasswordFailure,
  forgetPasswordRequest,
  forgetPasswordSuccess,
  loginFailure,
  loginRequest,
  loginSuccess,
  logoutFailure,
  logoutRequest,
  logoutSuccess,
  registerFailure,
  registerRequest,
  registerSuccess,
  resetPasswordFailure,
  resetPasswordRequest,
  resetPasswordSuccess,
  userFailure,
  userRequest,
  userSuccess,
  verifyFailure,
  verifyRequest,
  verifySuccess,
} from './reducer';
import api from '../api/configAxios';
import {
  addTaskFailure,
  addTaskRequest,
  addTaskSuccess,
  deleteTaskFailure,
  deleteTaskRequest,
  deleteTaskSuccess,
  updatePasswordFailure,
  updatePasswordRequest,
  updatePasswordSuccess,
  updateTaskFailure,
  updateTaskRequest,
  updateTaskSuccess,
} from './messageReducer';
import axios from 'axios';

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

export const updateProfile = formData => async dispatch => {
  try {
    dispatch(updateTaskRequest());
    const {data} = await axios.put(
      `https://rn-todo-backend.onrender.com/api/v1/updatemyprofile`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );
    dispatch(updateTaskSuccess(data.message));
  } catch (error) {
    dispatch(updateTaskFailure(error.response.data.message));
  }
};

export const logout = formData => async dispatch => {
  try {
    dispatch(logoutRequest());
    const {data} = await api.get(`logout`);
    dispatch(logoutSuccess());
  } catch (error) {
    dispatch(logoutFailure(error.response.data.message));
  }
};

export const registerProfile = formData => async dispatch => {
  try {
    dispatch(registerRequest());
    const {data} = await axios.post(
      `https://rn-todo-backend.onrender.com/api/v1/register`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );
    dispatch(registerSuccess(data.message));
  } catch (error) {
    dispatch(registerFailure(error.response.data.message));
  }
};

export const updatePassword = (oldPassword, newPassword) => async dispatch => {
  try {
    dispatch(updatePasswordRequest());
    const {data} = await api.put('updatepassword', {oldPassword, newPassword});
    dispatch(updatePasswordSuccess(data.message));
  } catch (error) {
    dispatch(updatePasswordFailure(error.response.data.message));
  }
};
export const forgetPassword = email => async dispatch => {
  try {
    dispatch(forgetPasswordRequest());
    const {data} = await api.post('forgetpassword', {email});
    dispatch(forgetPasswordSuccess(data.message));
  } catch (error) {
    dispatch(forgetPasswordFailure(error.response.data.message));
  }
};
export const resetPassword = (otp, newPassword) => async dispatch => {
  try {
    dispatch(resetPasswordRequest());
    const {data} = await api.post('resetpassword', {otp, newPassword});
    dispatch(resetPasswordSuccess(data.message));
  } catch (error) {
    dispatch(resetPasswordFailure(error.response.data.message));
  }
};
export const verifyAccount = otp => async dispatch => {
  try {
    dispatch(verifyRequest());
    const {data} = await api.post('verify', {otp});
    dispatch(verifySuccess(data.message));
  } catch (error) {
    dispatch(verifyFailure(error.response.data.message));
  }
};
