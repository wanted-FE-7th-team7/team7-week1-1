import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL;
const ACCESS_TOKEN = localStorage.getItem('token');

export const instance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

instance.interceptors.request.use(
  function (config) {
    config.headers.Authorization =
      ACCESS_TOKEN != null ? `Bearer ${ACCESS_TOKEN}` : null;
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);
