import {createSlice} from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    loading: false,
    isAuthenticated: false,
    error: '',
    user: {},
    message: '',
  },
  reducers: {
    loginRequest: state => {
      state.loading = true;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.message = action.payload.message;
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.error = action.payload;
    },
    logoutRequest: state => {
      state.loading = true;
    },
    logoutSuccess: state => {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
    },
    logoutFailure: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.error = action.payload;
    },
    clearError: state => {
      state.error = null;
    },
    clearMessage: state => {
      state.message = null;
    },
    userRequest: state => {
      state.loading = true;
    },
    userSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
    },
    userFailure: (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.error = action.payload;
    },
  },
});

export const {
  loginRequest,
  loginFailure,
  loginSuccess,
  clearError,
  clearMessage,
  userRequest,
  userFailure,
  userSuccess,
  logoutRequest,
  logoutSuccess,
  logoutFailure,
} = authSlice.actions;

export default authSlice.reducer;
