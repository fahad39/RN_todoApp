import {createSlice} from '@reduxjs/toolkit';

export const message = createSlice({
  name: 'message',
  initialState: {
    loading: false,
    error: '',
    message: '',
  },
  reducers: {
    addTaskRequest: state => {
      state.loading = true;
    },
    addTaskSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    addTaskFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearMessageError: state => {
      state.error = null;
    },
    clearMessage: state => {
      state.message = null;
    },
  },
});

export const {
  addTaskRequest,
  addTaskFailure,
  addTaskSuccess,
  clearMessage,
  clearMessageError,
} = message.actions;

export default message.reducer;
