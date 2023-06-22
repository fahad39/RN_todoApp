import axios from 'axios';

export default axios.create({
  baseURL: 'https://rn-todo-backend.onrender.com/api/v1/',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});
