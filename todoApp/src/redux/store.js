import {configureStore} from '@reduxjs/toolkit';
import authReducer from './reducer';
import messageReducer from './messageReducer';

const store = configureStore({
  reducer: {
    auth: authReducer,
    message: messageReducer,
  },
});

export default store;
